import * as expenseItemsApi from "../../api/expenseItemsApi";
import * as tableColumns from "../../consts/tableColumns";
import { ROUTE_NAMES } from "../../consts/routeNames";
import {
  BaseTableActions,
  BaseTableInitialState,
  BaseTableReducer,
  BaseTableTypes
} from "./baseTableRedux";
import * as tableFilters from "../../consts/tableFilters";
import * as routing from "./routingRedux";
import * as uiActions from "./uiRedux";
import * as consts from "../../consts/constants";
import PropTypes from "prop-types";
import {expenseCategoriesActions} from "./expenseCategoriesRedux";

//*******************************************************************************
const PREFIX = "expenseItems/";

//*******************************************************************************

export const expenseItemsInitialState = {
  ...BaseTableInitialState,
  sortBy: tableColumns.COLUMN_CREATED_DATE,
  columns: tableColumns.EXPENSE_ITEMS_COLUMNS
};

//*******************************************************************************

export default function reducer(state = expenseItemsInitialState, action = {}) {
  let result = BaseTableReducer(
    PREFIX,
    state,
    action,
    expenseItemsInitialState
  );

  if (result) return result;

  switch (action.type) {
    default:
      return state;
  }
}

//*******************************************************************************

class ExpenseItemsActions extends BaseTableActions {
  // ABSTRACT ACTIONS REALIZATION

  // *** Delete
  _deleteItem(Obj) {
    return async (dispatch, getState) => {
      await expenseItemsApi.deleteItem(Obj);
    };
  }

  // *** Filters
  loadFilterItems() {
    return async (dispatch, getState) => {
      dispatch(uiActions.showBackdrop(true));
      let p1 = new Promise(async (resolve, reject) => {
        if (
          !getState().expenseCategories.items ||
          getState().expenseCategories.items.length === 0
        ) {
          try {
            await dispatch(
              expenseCategoriesActions.fetchItems(0, false, false, null, true, true)
            );
          } catch (e) {}
        }
        resolve();
      });
      await Promise.all([p1]);
      dispatch(uiActions.showBackdrop(false));

      let filterItems = [
        { ...tableFilters.FILTER_NAME },
        { ...tableFilters.FILTER_CREATED_DATE }
      ];

      return dispatch({
        type: this._withPrefix(BaseTableTypes.REPLACE_FILTER_ITEMS),
        filterItems: filterItems
      });
    };
  }

  _fetchItemsFromNetwork(
    filter,
    topRowNumber,
    itemsPerPage,
    sortBy,
    sortOrder
  ) {
    return async (dispatch, getState) => {
      let fetchedResponse = await expenseItemsApi.getItems(
        filter,
        topRowNumber,
        itemsPerPage,
        sortBy,
        sortOrder
      );

      return fetchedResponse;
    };
  }

  goto_editItem(itemId) {
    return async dispatch => {
      dispatch(routing.goto_EditItem(ROUTE_NAMES.expenseItemView, itemId));
    };
  }

  goto_addItem() {
    return async dispatch => {
      dispatch(routing.goto_AddItem(ROUTE_NAMES.expenseItemView));
    };
  }

  //------------------------------------------------------------------------------
  // ABSTRACT FUNCS REALIZATION

  get _ACTION_TYPE_PREFIX() {
    return PREFIX;
  }

  get ALLOW_ADD_ITEM() {
    return true;
  }

  get _USE_PAGINATION() {
    return true;
  }

  _getStateSlice = state => {
    return state.expenseItems;
  };
}

export const expenseItemsActions = new ExpenseItemsActions();
