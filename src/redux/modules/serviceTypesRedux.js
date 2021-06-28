import * as serviceTypesApi from "../../api/serviceTypesApi";
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
const PREFIX = "serviceTypes/";

//*******************************************************************************

export const serviceTypesInitialState = {
  ...BaseTableInitialState,  
};

export const IServiceType = PropTypes.shape({  
  id: PropTypes.number.isRequired,  
  name: PropTypes.string.isRequired,  
});

//*******************************************************************************

export default function reducer(state = serviceTypesInitialState, action = {}) {
  let result = BaseTableReducer(
    PREFIX,
    state,
    action,
    serviceTypesInitialState
  );

  if (result) return result;

  switch (action.type) {
    default:
      return state;
  }
}

//*******************************************************************************

class ServiceTypesActions extends BaseTableActions {
  // ABSTRACT ACTIONS REALIZATION

  _fetchItemsFromNetwork(
    filter,
    topRowNumber,
    itemsPerPage,
    sortBy,
    sortOrder
  ) {
    return async (dispatch, getState) => {
      let fetchedResponse = await serviceTypesApi.getItems(
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
    return false;
  }

  _getStateSlice = state => {
    return state.serviceTypes;
  };
}

export const serviceTypesActions = new ServiceTypesActions();
