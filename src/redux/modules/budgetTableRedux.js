//import * as budgetTableApi from "../../api/budgetTableApi";
import { ROUTE_NAMES } from "../../consts/routeNames";
import { BaseTableTypes, showException } from "./baseTableRedux";
import * as tableFilters from "../../consts/tableFilters";
import * as routing from "./routingRedux";
import * as uiActions from "./uiRedux";
import * as dataFuncs from "../../utils/dataFuncs";
import { restaurantsActions } from "./restaurantsRedux";

//*******************************************************************************
const PREFIX = "budgetTable/";

//*******************************************************************************

export const budgetTableInitialState = {
  filterItems: [],
  sortBy: "",
  sortOrder: "descending",
  items: []
};

//*******************************************************************************

export default function reducer(state = budgetTableInitialState, action = {}) {
  switch (action.type) {
    case PREFIX + BaseTableTypes.RESET_STATE:
      return { ...budgetTableInitialState };

    case PREFIX + BaseTableTypes.FETCH_ITEMS_COMPLETE: {
      return {
        ...state,
        items: action.items
      };
    }

    case PREFIX + BaseTableTypes.REPLACE_ITEMS: {
      return { ...state, items: action.items };
    }

    case PREFIX + BaseTableTypes.REPLACE_FILTER_ITEMS:
      return { ...state, filterItems: action.filterItems };

    case PREFIX + BaseTableTypes.CHANGE_SORT_MODE:
      return { ...state, sortBy: action.sortBy, sortOrder: action.sortOrder };

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

      dispatch(uiActions.showBackdrop(true));
      await Promise.all([p1]);
      dispatch(uiActions.showBackdrop(false));

      let filterItems = [
        { ...tableFilters.FILTER_ACTIVATION_DATE_STATS },
        {
          ...tableFilters.FILTER_RESTAURANT,
          items: [...getState().restaurants.items]
        },
        {
          ...tableFilters.FILTER_BUDGET_TYPE,
          items: [
            { name: " Все", id: 0 },
            { name: "Месячный бюджет", id: 1 },
            { name: "Инвестиционный бюджет", id: 1 },
            { name: "event", id: 3 }
          ]
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

      let sortBy = this.getSortBy(getState());
      let sortOrder = this.getSortOrder(getState());

      let fetchedResponse;
      try {
        dispatch(uiActions.showBackdrop(true));
        // let fetchedResponse = await budgetTableApi.getItems(
        //   filter,
        //   sortBy,
        //   sortOrder
        // );
        fetchedResponse = { items: [] };
      } catch (e) {
        dispatch(showException(e, keepBackdropOpened));
        if (!keepBackdropOpened) {
          throw e;
        }
        return;
      }

      dispatch(uiActions.showBackdrop(false || keepBackdropOpened));

      if (!fetchedResponse || !fetchedResponse.items) {
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

      await dispatch({
        type: this._withPrefix(BaseTableTypes.FETCH_ITEMS_COMPLETE),
        items: fetchedResponse.items
      });

      return fetchedResponse;
    };
  };

  cleanFetch = () => {
    return async (dispatch, getState) => {
      let items = this.getItems(getState());
      if (!items || items.length === 0) {
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

  sortItemsBy = newSortColumn => {
    return async (dispatch, getState) => {
      let currentSortColumn = this.getSortBy(getState());
      let newSortOrder = "descending";

      //if clicked to the same column - just change sort order mode
      if (currentSortColumn === newSortColumn) {
        if (this.getSortOrder(getState()) === "descending")
          newSortOrder = "ascending";
        else newSortOrder = "descending";
      }

      await dispatch({
        type: this._withPrefix(BaseTableTypes.CHANGE_SORT_MODE),
        sortBy: newSortColumn,
        sortOrder: newSortOrder
      });

      dispatch(this.fetchItems());
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

  goto_editItem(itemId) {
    return async dispatch => {
      //dispatch(routing.goto_EditItem(ROUTE_NAMES.serviceTypeView, itemId));
    };
  }

  goto_addItem() {
    return async dispatch => {
      //dispatch(routing.goto_AddItem(ROUTE_NAMES.serviceTypeView));
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

  getItems = globalState => {
    return this._getStateSlice(globalState).items;
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
