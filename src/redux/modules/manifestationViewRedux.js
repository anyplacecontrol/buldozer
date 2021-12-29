import PropTypes from "prop-types";
import {IUserView} from "../../redux/modules/userViewRedux";  
import { ROUTE_NAMES } from "../../consts/routeNames";
import { manifestationsActions } from "./manifestationsRedux";
import * as viewValidators from "../../utils/viewValidators";
import * as manifestationsApi from "../../api/manifestationsApi";
import {
  BaseViewActions,
  BaseViewInitialState,
  BaseViewReducer,
  IBaseView
} from "./baseViewRedux";

//*******************************************************************************

export const IManifestationView = PropTypes.shape({
  ...IBaseView,
  id: PropTypes.number.isRequired,  
  name: PropTypes.string.isRequired,
  createdDate: PropTypes.string,
  createdUser: IUserView,  
});


//*******************************************************************************
const PREFIX = "manifestationView/";

const CHANGE_NAME = PREFIX + "CHANGE_NAME";


//*******************************************************************************

export const manifestationViewInitialState = {
  ...BaseViewInitialState,
  id: 0,  
  name: "",
  createdDate: null,
  createdUser: null,  
};

//*******************************************************************************

export default function reducer(
  state = manifestationViewInitialState,
  action = {}
) {
  let result = BaseViewReducer(
    PREFIX,
    state,
    action,
    manifestationViewInitialState
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

class ManifestationViewActions extends BaseViewActions {

  // Public Action Creators

  changeName = payload => {
    return {
      type: CHANGE_NAME,
      payload: payload
    };
  };

  // ABSTRACT SERVICE FUNCS

  get _TABLE_ROUTE() {
    return ROUTE_NAMES.manifestations;
  }

  get _TABLE_ACTIONS_PROVIDER() {
    return manifestationsActions;
  }

  get _ACTION_TYPE_PREFIX() {
    return PREFIX;
  }

  //required for update item:

  get _API_PROVIDER() {
    return manifestationsApi;
  }

  _validateView(itemObj) {
    return viewValidators.validateManifestationView(itemObj);
  }

  _isNewItem(itemObj) {
    return itemObj.createdUser == null;
  }

  _getStateSlice = state => {
    return state.manifestationView;
  };
}

export const manifestationViewActions = new ManifestationViewActions();
