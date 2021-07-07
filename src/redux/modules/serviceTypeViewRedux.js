import PropTypes from "prop-types";
import {IUserView} from "../../redux/modules/userViewRedux";  
import { ROUTE_NAMES } from "../../consts/routeNames";
import { serviceTypesActions } from "./serviceTypesRedux";
import * as viewValidators from "../../utils/viewValidators";
import * as serviceTypesApi from "../../api/serviceTypesApi";
import {
  BaseViewActions,
  BaseViewInitialState,
  BaseViewReducer,
  IBaseView
} from "./baseViewRedux";

//*******************************************************************************

export const IServiceTypeView = PropTypes.shape({
  ...IBaseView,
  id: PropTypes.number.isRequired,  
  name: PropTypes.string.isRequired,
  createdDate: PropTypes.string,
  createdUser: IUserView,  
});


//*******************************************************************************
const PREFIX = "serviceTypeView/";

const CHANGE_NAME = PREFIX + "CHANGE_NAME";


//*******************************************************************************

export const serviceTypeViewInitialState = {
  ...BaseViewInitialState,
  id: 0,  
  name: "",
  createdDate: null,
  createdUser: null,  
};

//*******************************************************************************

export default function reducer(
  state = serviceTypeViewInitialState,
  action = {}
) {
  let result = BaseViewReducer(
    PREFIX,
    state,
    action,
    serviceTypeViewInitialState
  );

  if (result) return result;

  switch (action.type) {

    case CHANGE_NAME:
      return {
        ...state,
        name: action.payload
      };

    default:
      return state;
  }
}

//*******************************************************************************

class ServiceTypeViewActions extends BaseViewActions {

  // Public Action Creators

  changeName = payload => {
    return {
      type: CHANGE_NAME,
      payload: payload
    };
  };

  // ABSTRACT SERVICE FUNCS

  get _TABLE_ROUTE() {
    return ROUTE_NAMES.serviceTypes;
  }

  get _TABLE_ACTIONS_PROVIDER() {
    return serviceTypesActions;
  }

  get _ACTION_TYPE_PREFIX() {
    return PREFIX;
  }

  //required for update item:

  get _API_PROVIDER() {
    return serviceTypesApi;
  }

  _validateView(itemObj) {
    return viewValidators.validateServiceTypeView(itemObj);
  }

  _isNewItem(itemObj) {
    return itemObj.createdUser == null;
  }

  _getStateSlice = state => {
    return state.serviceTypeView;
  };
}

export const serviceTypeViewActions = new ServiceTypeViewActions();
