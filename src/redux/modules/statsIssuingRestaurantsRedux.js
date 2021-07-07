import * as statsIssuingRestaurantsApi from "../../api/statsIssuingRestaurantsApi";
import * as tableColumns from "../../consts/tableColumns";
import {
  BaseTableActions,
  BaseTableInitialState,
  BaseTableReducer,
  BaseTableTypes
} from "./baseTableRedux";
import * as tableFilters from "../../consts/tableFilters";
import PropTypes from "prop-types";

//*******************************************************************************
const PREFIX = "statsIssuingRestaurants/";

//*******************************************************************************

export const statsIssuingRestaurantsInitialState = {
  ...BaseTableInitialState,
  sortBy: tableColumns.COLUMN_RESTAURANT_NAME,
  columns: tableColumns.STATS_ISSUING_RESTAURANTS_COLUMNS
};

//*******************************************************************************

export default function reducer(state = statsIssuingRestaurantsInitialState, action = {}) {
  let result = BaseTableReducer(
    PREFIX,
    state,
    action,
    statsIssuingRestaurantsInitialState
  );

  if (result) return result;

  switch (action.type) {
    default:
      return state;
  }
}

//*******************************************************************************

class StatsIssuingRestaurantsActions extends BaseTableActions {
  // ABSTRACT ACTIONS REALIZATION

  // *** Filters
  loadFilterItems() {
    return async (dispatch, getState) => {    

      let filterItems = [
        // { ...tableFilters.FILTER_NAME },    
        // { ...tableFilters.FILTER_CREATED_DATE },
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
      let fetchedResponse = await statsIssuingRestaurantsApi.getItems(
        filter,
        topRowNumber,
        itemsPerPage,
        sortBy,
        sortOrder
      );

      return fetchedResponse;
    };
  }

 
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
    return state.statsIssuingRestaurants;
  };
}

export const statsIssuingRestaurantsActions = new StatsIssuingRestaurantsActions();
