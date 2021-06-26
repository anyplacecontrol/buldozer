import * as certificatesApi from "../../api/certificatesApi";
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
import {restaurantsActions} from "./restaurantsRedux";
import {recipientsActions} from "./recipientsRedux";
import * as consts from "../../consts/constants";

//*******************************************************************************
const PREFIX = "certificates/";

//*******************************************************************************

export const certificatesInitialState = {
  ...BaseTableInitialState,  
  sortBy: tableColumns.COLUMN_ID,
  columns: tableColumns.CERTIFICATES_COLUMNS
};

//*******************************************************************************

export default function reducer(state = certificatesInitialState, action = {}) {
  let result = BaseTableReducer(
    PREFIX,
    state,
    action,
    certificatesInitialState
  );

  if (result) return result;

  switch (action.type) {
    default:
      return state;
  }
}

//*******************************************************************************

class CertificatesActions extends BaseTableActions {
  // ABSTRACT ACTIONS REALIZATION

  // *** Delete
  _deleteItem(kioskObj) {
    return async (dispatch, getState) => {
      // await certificatesApi.deleteItem(kioskObj);
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
              restaurantsActions.fetchItems(0, false, false, null, true)
            );
          } catch (e) {
          }
        }
        resolve();
      });

      let p2 = new Promise(async (resolve, reject) => {
        if (
          !getState().recipients.items ||
          getState().recipients.items.length === 0
        ) {
          try {
            await dispatch(
              recipientsActions.fetchItems(0, false, false, null, true)
            );
          } catch (e) {
          }
        }
        resolve();
      });

      dispatch(uiActions.showBackdrop(true));
      await Promise.all([p1, p2]);
      dispatch(uiActions.showBackdrop(false));

      let filterItems = [
        { ...tableFilters.FILTER_ID },
        { ...tableFilters.FILTER_ISACTIVE },
        { ...tableFilters.FILTER_ACTIVATION_DATE },
        { ...tableFilters.FILTER_VALIDITY_DATE },
        {
          ...tableFilters.FILTER_ISSUING_RESTAURANT,
          items: [...getState().restaurants.items]
        },
        {
          ...tableFilters.FILTER_REDEEMER_RESTAURANT,
          items: [...getState().restaurants.items]
        },
        {
          ...tableFilters.FILTER_RECIPIENT,
          items: [ { name: "Все", value: null }, ...getState().recipients.items]
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
      let fetchedResponse = await certificatesApi.getItems(
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
      dispatch(routing.goto_EditItem(ROUTE_NAMES.certificateView, itemId));
    };
  }

  goto_addItem() {
    return async dispatch => {
      dispatch(routing.goto_AddItem(ROUTE_NAMES.certificateView));
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
    return state.certificates;
  };
}

export const certificatesActions = new CertificatesActions();
