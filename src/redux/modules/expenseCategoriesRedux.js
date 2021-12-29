import * as expenseCategoriesApi from "../../api/expenseCategoriesApi";
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

//*******************************************************************************
const PREFIX = "expenseCategories/";

//*******************************************************************************

export const expenseCategoriesInitialState = {
  ...BaseTableInitialState,
  sortBy: tableColumns.COLUMN_CREATED_DATE,
  columns: tableColumns.MANIFESTATIONS_COLUMNS
};

//*******************************************************************************

export default function reducer(state = expenseCategoriesInitialState, action = {}) {
  let result = BaseTableReducer(
    PREFIX,
    state,
    action,
    expenseCategoriesInitialState
  );

  if (result) return result;

  switch (action.type) {
    default:
      return state;
  }
}

//*******************************************************************************

class ExpenseCategoriesActions extends BaseTableActions {
  // ABSTRACT ACTIONS REALIZATION

  // *** Delete
  _deleteItem(Obj) {
    return async (dispatch, getState) => {
      await expenseCategoriesApi.deleteItem(Obj);
    };
  }

  // *** Filters
  loadFilterItems() {
    return async (dispatch, getState) => {    

      let filterItems = [
        { ...tableFilters.FILTER_NAME },    
        { ...tableFilters.FILTER_CREATED_DATE },
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
      let fetchedResponse = await expenseCategoriesApi.getItems(
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
      dispatch(routing.goto_EditItem(ROUTE_NAMES.expenseCategoryView, itemId));
    };
  }

  goto_addItem() {
    return async dispatch => {
      dispatch(routing.goto_AddItem(ROUTE_NAMES.expenseCategoryView));
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
    return state.expenseCategories;
  };
}

export const expenseCategoriesActions = new ExpenseCategoriesActions();
