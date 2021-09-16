import * as statsMutualSettlementReduxApi from "../../api/statsMutualSettlementApi";
import * as tableColumns from "../../consts/tableColumns";
import {
  BaseTableActions,
  BaseTableInitialState,
  BaseTableReducer,
  BaseTableTypes
} from "./baseTableRedux";
import * as tableFilters from "../../consts/tableFilters";
import PropTypes from "prop-types";
import { restaurantsActions } from "./restaurantsRedux";
import { recipientsActions } from "./recipientsRedux";
import { serviceTypesActions } from "./serviceTypesRedux";
import * as uiActions from "./uiRedux";

//*******************************************************************************
const PREFIX = "statsMutualSettlementRedux/";

//*******************************************************************************

export const statsMutualSettlementReduxInitialState = {
  ...BaseTableInitialState,
  sortBy: tableColumns.COLUMN_RECIPIENT,
  columns: tableColumns.STATS_MUTUAL_SETTLEMENT_COLUMNS
};

//*******************************************************************************

export default function reducer(
  state = statsMutualSettlementReduxInitialState,
  action = {}
) {
  let result = BaseTableReducer(
    PREFIX,
    state,
    action,
    statsMutualSettlementReduxInitialState
  );

  if (result) return result;

  switch (action.type) {
    default:
      return state;
  }
}

//*******************************************************************************

class StatsMutualSettlementActions extends BaseTableActions {
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
          } catch (e) {}
        }
        resolve();
      });

      let p2 = new Promise(async resolve => {
        if (
          !getState().recipients.items ||
          getState().recipients.items.length === 0
        ) {
          try {
            await dispatch(
              recipientsActions.fetchItems(0, false, false, null, true, true)
            );
          } catch (e) {}
        }
        resolve();
      });

      let p3 = new Promise(async resolve => {
        if (
          !getState().serviceTypes.items ||
          getState().serviceTypes.items.length === 0
        ) {
          try {
            await dispatch(
              serviceTypesActions.fetchItems(0, false, false, null, true, true)
            );
          } catch (e) {}
        }
        resolve();
      });

      dispatch(uiActions.showBackdrop(true));
      await Promise.all([p1, p2, p3]);
      dispatch(uiActions.showBackdrop(false));

      let filterItems = [
        { ...tableFilters.FILTER_ACTIVATION_DATE_STATS },
        { ...tableFilters.FILTER_CERT_ID },
        { ...tableFilters.FILTER_CERT_KIND },
        { ...tableFilters.FILTER_CERT_STATUS },
        { ...tableFilters.FILTER_PRICE },
        {
          ...tableFilters.FILTER_REDEEMER_RESTAURANT,
          items: [...getState().restaurants.items]
        },
        {
          ...tableFilters.FILTER_ISSUING_RESTAURANT,
          items: [...getState().restaurants.items]
        },
        {
          ...tableFilters.FILTER_SINGLE_RECIPIENT_STATS,
          items: [
            { company: "Все", value: null },
            ...getState().recipients.items
          ]
        },
        {
          ...tableFilters.FILTER_SERVICE_TYPE_STATS,
          items: [{ name: "Все", value: null }, ...getState().serviceTypes.items]
        }
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
      let fetchedResponse = await statsMutualSettlementReduxApi.getItems(
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
    return state.statsMutualSettlement;
  };
}

export const statsMutualSettlementActions = new StatsMutualSettlementActions();
