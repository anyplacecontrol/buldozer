import * as statsUnusedCertificatesApi from "../../api/statsUnusedCertificatesApi";
import * as tableColumns from "../../consts/tableColumns";
import {
  BaseTableActions,
  BaseTableInitialState,
  BaseTableReducer,
  BaseTableTypes
} from "./baseTableRedux";
import * as tableFilters from "../../consts/tableFilters";
import { restaurantsActions } from "./restaurantsRedux";
import * as uiActions from "./uiRedux";

//*******************************************************************************
const PREFIX = "statsUnusedCertificates/";

//*******************************************************************************

export const statsUnusedCertificatesInitialState = {
  ...BaseTableInitialState,
  sortBy: tableColumns.COLUMN_RESTAURANT_NAME,
  columns: tableColumns.STATS_UNUSED_CERTIFICATES_COLUMNS
};

//*******************************************************************************

export default function reducer(
  state = statsUnusedCertificatesInitialState,
  action = {}
) {
  let result = BaseTableReducer(
    PREFIX,
    state,
    action,
    statsUnusedCertificatesInitialState
  );

  if (result) return result;

  switch (action.type) {
    default:
      return state;
  }
}

//*******************************************************************************

class StatsUnusedCertificatesActions extends BaseTableActions {
  // ABSTRACT ACTIONS REALIZATION

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
              } catch (e) {
              }
            }
            resolve();
          });

      dispatch(uiActions.showBackdrop(true));
      await Promise.all([p1]);
      dispatch(uiActions.showBackdrop(false));

      let filterItems = [
        { ...tableFilters.FILTER_CREATED_DATE_STATS },
        {
          ...tableFilters.FILTER_ISSUING_RESTAURANT,
          items: [...getState().restaurants.items]
        },
        { ...tableFilters.FILTER_ISACTIVE_STATS }
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
      let fetchedResponse = await statsUnusedCertificatesApi.getItems(
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
    return state.statsUnusedCertificates;
  };
}

export const statsUnusedCertificatesActions = new StatsUnusedCertificatesActions();
