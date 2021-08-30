import * as recipientsApi from "../../api/recipientsApi";
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
const PREFIX = "recipients/";

//*******************************************************************************

export const recipientsInitialState = {
  ...BaseTableInitialState,
  sortBy: tableColumns.COLUMN_CREATED_DATE,
  columns: tableColumns.RECIPIENTS_COLUMNS
};

//*******************************************************************************

export default function reducer(state = recipientsInitialState, action = {}) {
  let result = BaseTableReducer(
    PREFIX,
    state,
    action,
    recipientsInitialState
  );

  if (result) return result;

  switch (action.type) {
    default:
      return state;
  }
}

//*******************************************************************************

class RecipientsActions extends BaseTableActions {
  // ABSTRACT ACTIONS REALIZATION

  // *** Delete
  _deleteItem(Obj) {
    return async (dispatch, getState) => {
       await recipientsApi.deleteItem(Obj);
    };
  }

  // *** Filters
  loadFilterItems() {
    return async (dispatch, getState) => {     

      let filterItems = [
        { ...tableFilters.FILTER_COMPANY },    
        { ...tableFilters.FILTER_CREATED_DATE },
        { ...tableFilters.FILTER_ISACTIVE },
        
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
      let fetchedResponse = await recipientsApi.getItems(
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
      dispatch(routing.goto_EditItem(ROUTE_NAMES.recipientView, itemId));
    };
  }

  goto_addItem() {
    return async dispatch => {
      dispatch(routing.goto_AddItem(ROUTE_NAMES.recipientView));
    };
  }

  importCSV(event) {
    return this._importCSV(event, recipientsApi, "/recipients");  
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
    return state.recipients;
  };
}

export const recipientsActions = new RecipientsActions();
