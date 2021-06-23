import * as restaurantsApi from "../../api/restaurantsApi";
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
const PREFIX = "restaurants/";

//*******************************************************************************

export const restaurantsInitialState = {
  ...BaseTableInitialState,
  sortBy: tableColumns.COLUMN_ID,
  columns: tableColumns.RESTAURANTS_COLUMNS
};

//*******************************************************************************

export default function reducer(state = restaurantsInitialState, action = {}) {
  let result = BaseTableReducer(
    PREFIX,
    state,
    action,
    restaurantsInitialState
  );

  if (result) return result;

  switch (action.type) {
    default:
      return state;
  }
}

//*******************************************************************************

class RestaurantsActions extends BaseTableActions {
  // ABSTRACT ACTIONS REALIZATION

  // *** Delete
  _deleteItem(kioskObj) {
    return async (dispatch, getState) => {
    //   await restaurantsApi.deleteItem(kioskObj);
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
      let fetchedResponse = await restaurantsApi.getItems(
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
    return state.restaurants;
  };
}

export const restaurantsActions = new RestaurantsActions();
