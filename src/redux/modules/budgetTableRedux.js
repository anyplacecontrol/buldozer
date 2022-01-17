import * as budgetApi from "../../api/budgetApi";
import { ROUTE_NAMES } from "../../consts/routeNames";
import { BaseTableTypes, showException } from "./baseTableRedux";
import * as tableFilters from "../../consts/tableFilters";
import * as routing from "./routingRedux";
import * as uiActions from "./uiRedux";
import * as dataFuncs from "../../utils/dataFuncs";
import { restaurantsActions } from "./restaurantsRedux";
import { expenseCategoriesActions } from "./expenseCategoriesRedux";
import { expenseItemsActions } from "./expenseItemsRedux";
import { manifestationsActions } from "./manifestationsRedux";
import { budgetItemViewActions } from "./budgetItemViewRedux";

//*******************************************************************************
const PREFIX = "budgetTable/";
const REPLACE_FILTERS_FROM_ITEM = "REPLACE_FILTERS_FROM_ITEM";

//*******************************************************************************

export const allBudgetTypes = [
  { name: " Все", id: 0 },
  { name: "Месячный бюджет", id: 1 },
  { name: "Инвестиционный бюджет", id: 2 },
  { name: "Event", id: 3 }
];

export const budgetTableInitialState = {
  filterItems: [],
  sortBy: { columnName: "budget", currency: "ГРН" },
  sortOrder: "descending",
  sections: [],
  totalSummary: null,
  selectedItem: {
    id: -1,
    expenseCategory: null
  }
};

//*******************************************************************************

export default function reducer(state = budgetTableInitialState, action = {}) {
  switch (action.type) {
    case PREFIX + BaseTableTypes.RESET_STATE:
      return { ...budgetTableInitialState };

    case PREFIX + BaseTableTypes.FETCH_COMPLETE: {
      let newObj = {
        ...state,
        sections: action.sections
      };
      if (action.totalSummary)
        newObj = { ...newObj, totalSummary: action.totalSummary };
      return newObj;
    }

    case PREFIX + BaseTableTypes.REPLACE_FILTER_ITEMS:
      return { ...state, filterItems: action.filterItems };

    case PREFIX + BaseTableTypes.CHANGE_SORT_MODE:
      return {
        ...state,
        sortBy: action.sortBy,
        sortOrder: action.sortOrder,
        sections: action.sections
      };

    case PREFIX + REPLACE_FILTERS_FROM_ITEM: {
      if (state.filterItems.length < 3) return state;
      let filterItems = [...state.filterItems]; 
      filterItems[0] = { ...filterItems[0], value: {...action.period, key: "selection"} };
      filterItems[1] = { ...filterItems[1], value: action.restaurant };
      filterItems[2] = { ...filterItems[2], value: action.budgetType };      
      return { ...state, 
        filterItems: filterItems 
      };
    }

    default:
      return state;
  }
}

//*******************************************************************************

class BudgetTableActions {
  // ABSTRACT ACTIONS REALIZATION

  resetState() {
    return async (dispatch, getState) => {
      await dispatch({
        type: this._withPrefix(BaseTableTypes.RESET_STATE)
      });
    };
  }

  // *** Filters
  loadFilterItems() {
    return async (dispatch, getState) => {
      let p1 = new Promise(async (resolve, reject) => {
        if (
          !getState().restaurants.items ||
          getState().restaurants.items.length === 0
        ) {
          try {
            await dispatch(
              restaurantsActions.fetchItems(0, false, false, null, true, true)
            );
          } catch (e) {}
        }
        resolve();
      });

      let p2 = new Promise(async (resolve, reject) => {
        if (
          !getState().expenseCategories.items ||
          getState().expenseCategories.items.length === 0
        ) {
          try {
            await dispatch(
              expenseCategoriesActions.fetchItems(
                0,
                false,
                false,
                null,
                true,
                true
              )
            );
          } catch (e) {}
        }
        resolve();
      });

      let p3 = new Promise(async (resolve, reject) => {
        if (
          !getState().manifestations.items ||
          getState().manifestations.items.length === 0
        ) {
          try {
            await dispatch(
              manifestationsActions.fetchItems(
                0,
                false,
                false,
                null,
                true,
                true
              )
            );
          } catch (e) {}
        }
        resolve();
      });

      let p4 = new Promise(async (resolve, reject) => {
        if (
          !getState().expenseItems.items ||
          getState().expenseItems.items.length === 0
        ) {
          try {
            await dispatch(
              expenseItemsActions.fetchItems(0, false, false, null, true, true)
            );
          } catch (e) {}
        }
        resolve();
      });

      dispatch(uiActions.showBackdrop(true));
      await Promise.all([p1, p2, p3, p4]);
      dispatch(uiActions.showBackdrop(false));

      let filterItems = [
        { ...tableFilters.FILTER_ACTIVATION_DATE_STATS },
        {
          ...tableFilters.FILTER_RESTAURANT,
          items: [{ name: " Все", id: 0 }, ...getState().restaurants.items]
        },
        {
          ...tableFilters.FILTER_BUDGET_TYPE,
          items: allBudgetTypes
        }
      ];

      return dispatch({
        type: this._withPrefix(BaseTableTypes.REPLACE_FILTER_ITEMS),
        filterItems: filterItems
      });
    };
  }

  fetchItems = (filter = null) => {
    return async (dispatch, getState) => {
      let keepBackdropOpened = false;

      dispatch(uiActions.showBackdrop(true));

      if (!filter) {
        let filterItems = this.getFilterItems(getState());
        filter = dataFuncs.createFilterObject(filterItems);
      }

      let fetchedResponse;
      try {
        dispatch(uiActions.showBackdrop(true));
        fetchedResponse = await budgetApi.getItems(filter);
      } catch (e) {
        dispatch(showException(e, keepBackdropOpened));
        if (!keepBackdropOpened) {
          throw e;
        }
        return;
      }

      dispatch(uiActions.showBackdrop(false || keepBackdropOpened));

      if (
        !fetchedResponse ||
        !fetchedResponse.sections ||
        !fetchedResponse.totalSummary
      ) {
        let message =
          "Problem in fetchItems. Empty data received for table: " +
          this._ACTION_TYPE_PREFIX;

        dispatch(
          uiActions.ShowAlert(
            message,
            uiActions.ALERT_ERROR,
            keepBackdropOpened
          )
        );

        if (!keepBackdropOpened) {
          throw message;
        }

        return;
      }

      let currentSortBy = this.getSortBy(getState());
      let sortedSections = this.sortItems(
        fetchedResponse.sections,
        currentSortBy,
        "descending"
      );

      await dispatch({
        type: this._withPrefix(BaseTableTypes.FETCH_COMPLETE),
        sections: sortedSections,
        totalSummary: fetchedResponse.totalSummary
      });

      fetchedResponse.sections = sortedSections;
      return fetchedResponse;
    };
  };

  cleanFetch = () => {
    return async (dispatch, getState) => {
      let sections = this.getSections(getState());
      if (!sections || sections.length === 0) {
        try {
          dispatch(uiActions.showBackdrop(true));
          await dispatch(this.loadFilterItems());
          dispatch(uiActions.showBackdrop(true));
          await dispatch(this.fetchItems());
        } finally {
          dispatch(uiActions.showBackdrop(false));
        }
      }
    };
  };

  sortItems = (oldSections, newSortBy, newSortOrder) => {
    let newSections = [];

    for (let i = 0; i < oldSections.length; i++) {
      let sortedSection = {
        total: oldSections[i].total,
        items: dataFuncs.sortItems(
          oldSections[i].items,
          newSortBy,
          newSortOrder
        )
      };
      newSections.push(sortedSection);
    }
    return newSections;
  };

  sortItemsBy = newSortBy => {
    return async (dispatch, getState) => {
      let currentSortBy = this.getSortBy(getState());
      let newSortOrder = "descending";

      //if clicked to the same column - just change sort order mode
      if (
        newSortBy &&
        currentSortBy.columnName === newSortBy.columnName &&
        currentSortBy.currency === newSortBy.currency
      ) {
        if (this.getSortOrder(getState()) === "descending")
          newSortOrder = "ascending";
        else newSortOrder = "descending";
      }

      if (!newSortBy) newSortBy = currentSortBy;

      let sortedSections = this.sortItems(
        this.getSections(getState()),
        newSortBy,
        newSortOrder
      );

      await dispatch({
        type: this._withPrefix(BaseTableTypes.CHANGE_SORT_MODE),
        sortBy: newSortBy,
        sortOrder: newSortOrder,
        sections: sortedSections
      });
    };
  };

  changeFilterValue = (filterItem, changedValue) => {
    return (dispatch, getState) => {
      let newValue = changedValue;
      let filterItems = [...this._getStateSlice(getState()).filterItems];
      for (let i = 0; i < filterItems.length; i++) {
        if (filterItems[i] === filterItem) {
          //For multiSelectBox
          if (filterItem.type === "multiSelectBox") {
            let oldValue = filterItems[i].value;
            //remove item from array if it already exists
            if (oldValue.indexOf(newValue) >= 0) {
              newValue = oldValue.filter(function(value, index, arr) {
                return value != newValue;
              });
            } else {
              newValue = [...oldValue, changedValue];
            }
          }

          filterItems[i] = { ...filterItems[i], value: newValue };
          break;
        }
      }
      dispatch({
        type: this._withPrefix(BaseTableTypes.REPLACE_FILTER_ITEMS),
        filterItems: filterItems
      });
    };
  };

  replaceFiltersFromItem = item => {
    return (dispatch, getState) => {
      let period = { startDate: null, endDate: null };
      if (item.periodFromDate) period.startDate = new Date(item.periodFromDate);
      if (item.periodToDate) period.endDate = new Date(item.periodToDate);
      let restaurant = item.restaurant;
      let budgetType = item.budgetType;
      dispatch({
        type: this._withPrefix(REPLACE_FILTERS_FROM_ITEM),
        period,
        restaurant,
        budgetType
      });
    };
  };

  goto_addItem() {
    return async dispatch => {
      dispatch(budgetItemViewActions.resetStateToFilters());
      dispatch(routing.goto_AddItem(ROUTE_NAMES.budgetView));
    };
  }

  exportExpenseItems() {
    return async (dispatch, getState) => {
      let keepBackdropOpened = false;

      dispatch(uiActions.showBackdrop(true));     

      let fetchedBlob;
      try {
        dispatch(uiActions.showBackdrop(true));
        fetchedBlob = await budgetApi.exportExpenseItems();
      } catch (e) {
        dispatch(showException(e, keepBackdropOpened));
        if (!keepBackdropOpened) {
          throw e;
        }
        return;
      }

      dispatch(uiActions.showBackdrop(false || keepBackdropOpened));

      if (
        !fetchedBlob 
      ) {
        let message =
          "Problem in fetchItems. Empty data received for table export";

        dispatch(
          uiActions.ShowAlert(
            message,
            uiActions.ALERT_ERROR,
            keepBackdropOpened
          )
        );

        if (!keepBackdropOpened) {
          throw message;
        }

        return;
      }
      
      
      var file = window.URL.createObjectURL(fetchedBlob);
      window.location.assign(file);      

    };
  }
  //------------------------------------------------------------------------------
  // ABSTRACT FUNCS REALIZATION

  get _ACTION_TYPE_PREFIX() {
    return PREFIX;
  }

  _getStateSlice = state => {
    return state.budgetTable;
  };

  //------------------------------------------------------------------------------
  //SELECTORS

  getSortBy = globalState => {
    return this._getStateSlice(globalState).sortBy;
  };

  getSortOrder = globalState => {
    let result = this._getStateSlice(globalState).sortOrder;
    return result;
  };

  getFilterItems = globalState => {
    return this._getStateSlice(globalState).filterItems;
  };

  getSections = globalState => {
    return this._getStateSlice(globalState).sections;
  };

  getWasFilterChanged = globalState => {
    let filteredItems = this.getFilterItems(globalState);
    for (let i = 0; i < filteredItems.length; i++) {
      let filteredItem = filteredItems[i];
      if (filteredItem.value != filteredItem.defaultValue) {
        return true;
      }
    }
    return false;
  };

  _withPrefix = actionType => {
    return this._ACTION_TYPE_PREFIX + actionType;
  };
}

export const budgetTableActions = new BudgetTableActions();
