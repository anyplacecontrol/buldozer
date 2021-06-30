import * as usersApi from "../../api/usersApi";
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

//*******************************************************************************
const PREFIX = "users/";

//*******************************************************************************

export const usersInitialState = {
  ...BaseTableInitialState,
  sortBy: tableColumns.COLUMN_CREATED_DATE,
  columns: tableColumns.USERS_COLUMNS
};

//*******************************************************************************

export default function reducer(state = usersInitialState, action = {}) {
  let result = BaseTableReducer(
    PREFIX,
    state,
    action,
    usersInitialState
  );

  if (result) return result;

  switch (action.type) {
    default:
      return state;
  }
}

//*******************************************************************************

class UsersActions extends BaseTableActions {
  // ABSTRACT ACTIONS REALIZATION

  // *** Delete
  _deleteItem(kioskObj) {
    return async (dispatch, getState) => {
    //   await usersApi.deleteItem(kioskObj);
    };
  }

  // *** Filters
  loadFilterItems() {
    return async (dispatch, getState) => {     

      let filterItems = [
        { ...tableFilters.FILTER_EMAIL },    
        { ...tableFilters.FILTER_CREATED_DATE },                
        { ...tableFilters.FILTER_CREATED_BY },    
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
      let fetchedResponse = await usersApi.getItems(
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
      //dispatch(routing.goto_EditItem(ROUTE_NAMES.kioskView, itemId));
    };
  }

  goto_addItem() {
    return async dispatch => {
      //dispatch(routing.goto_AddItem(ROUTE_NAMES.kioskView));
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
    return state.users;
  };
}

export const usersActions = new UsersActions();
