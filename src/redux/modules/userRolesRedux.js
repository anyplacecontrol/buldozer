import * as userRolesApi from "../../api/userRolesApi";
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
const PREFIX = "userRoles/";

//*******************************************************************************

export const userRolesInitialState = {
  ...BaseTableInitialState,
  sortBy: tableColumns.COLUMN_CREATED_DATE,
  columns: tableColumns.USER_ROLES_COLUMNS
};

//*******************************************************************************

export default function reducer(state = userRolesInitialState, action = {}) {
  let result = BaseTableReducer(
    PREFIX,
    state,
    action,
    userRolesInitialState
  );

  if (result) return result;

  switch (action.type) {
    default:
      return state;
  }
}

//*******************************************************************************

class UserRolesActions extends BaseTableActions {
  // ABSTRACT ACTIONS REALIZATION


  // *** Filters
  loadFilterItems() {
    return async (dispatch, getState) => {    

      let filterItems = [       
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
      let fetchedResponse = await userRolesApi.getItems(
        filter,
        topRowNumber,
        itemsPerPage,
        sortBy,
        sortOrder
      );

      return fetchedResponse;
    };
  }

//   goto_editItem(itemId) {
//     return async dispatch => {
//       dispatch(routing.goto_EditItem(ROUTE_NAMES.userRoleView, itemId));
//     };
//   }

//   goto_addItem() {
//     return async dispatch => {
//       dispatch(routing.goto_AddItem(ROUTE_NAMES.userRoleView));
//     };
//   }


  //------------------------------------------------------------------------------
  // ABSTRACT FUNCS REALIZATION

  get _ACTION_TYPE_PREFIX() {
    return PREFIX;
  }

  get ALLOW_ADD_ITEM() {
    return false;
  }

  get _USE_PAGINATION() {
    return true;
  }

  _getStateSlice = state => {
    return state.userRoles;
  };
}

export const userRolesActions = new UserRolesActions();
