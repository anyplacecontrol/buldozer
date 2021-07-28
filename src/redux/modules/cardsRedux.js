import * as cardsApi from "../../api/cardsApi";
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
import {serviceTypesActions} from "./serviceTypesRedux";
import * as consts from "../../consts/constants";

//*******************************************************************************
const PREFIX = "cards/";

//*******************************************************************************

export const cardsInitialState = {
  ...BaseTableInitialState,  
  sortBy: tableColumns.COLUMN_CREATED_DATE,
  columns: tableColumns.CARDS_COLUMNS
};

//*******************************************************************************

export default function reducer(state = cardsInitialState, action = {}) {
  let result = BaseTableReducer(
    PREFIX,
    state,
    action,
    cardsInitialState
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
      await cardsApi.deleteItem(kioskObj);
    };
  }

  // *** Filters
  loadFilterItems() {
    return async (dispatch, getState) => {      

      let p1 = new Promise(async (resolve, reject) => {
        if (
          !getState().recipients.items ||
          getState().recipients.items.length === 0
        ) {
          try {
            await dispatch(
              recipientsActions.fetchItems(0, false, false, null, true, true)
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
        { ...tableFilters.FILTER_ID },
        { ...tableFilters.FILTER_ISACTIVE },        
        {
          ...tableFilters.FILTER_RECIPIENT,
          items: [ { company: "Все", value: null }, ...getState().recipients.items]
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
      let fetchedResponse = await cardsApi.getItems(
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
      dispatch(routing.goto_EditItem(ROUTE_NAMES.cardView, itemId));
    };
  }

  goto_addItem() {
    return async dispatch => {
      dispatch(routing.goto_AddItem(ROUTE_NAMES.cardView));
    };
  }

  importCSV() {
    return async dispatch => {
     
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
    return state.cards;
  };
}

export const cardsActions = new CertificatesActions();
