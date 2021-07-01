  import PropTypes from "prop-types";
  import { ROUTE_NAMES } from "../../consts/routeNames";
  import { usersActions } from "./usersRedux";
  import * as viewValidators from "../../utils/viewValidators";
  import * as usersApi from "../../api/usersApi";
  import {
    BaseViewActions,
    BaseViewInitialState,
    BaseViewReducer,
    IBaseView
  } from "./baseViewRedux";
  import * as dataFuncs from "../../utils/dataFuncs";
  import * as uiActions from "./uiRedux";
  import { certificatesActions } from "./certificatesRedux";

//*******************************************************************************

export const IUserView = PropTypes.shape({
  ...IBaseView,
  id: PropTypes.number.isRequired,  
  name: PropTypes.string.isRequired,
  phone: PropTypes.string,  
  isActive: PropTypes.bool,
  position: PropTypes.string,
  email: PropTypes.string.isRequired,   
  password: PropTypes.string,    
  createdDate: PropTypes.string,
  createdUser: PropTypes.object,
});


//*******************************************************************************
const PREFIX = "userView/";

const CHANGE_NAME = PREFIX + "CHANGE_NAME";
const CHANGE_PHONE = PREFIX + "CHANGE_PHONE";
const CHANGE_IS_ACTIVE = PREFIX + "CHANGE_IS_ACTIVE";
const CHANGE_POSITION = PREFIX + "CHANGE_POSITION";
const CHANGE_PASSWORD = PREFIX + "CHANGE_PASSWORD";
const CHANGE_EMAIL = PREFIX + "CHANGE_EMAIL";

//*******************************************************************************

export const userViewInitialState = {
  ...BaseViewInitialState,
  id: 0,  
  name: "",
  email: "",    
  phone: "",  
  position: "",
  password: "",
  isActive: false,
  createdDate: null,
  createdUser: null,  
};

//*******************************************************************************

export default function reducer(
  state = userViewInitialState,
  action = {}
) {
  let result = BaseViewReducer(
    PREFIX,
    state,
    action,
    userViewInitialState
  );

  if (result) return result;

  switch (action.type) {
    case CHANGE_IS_ACTIVE:
      return {
        ...state,
        isActive: action.payload
      };
      
    case CHANGE_POSITION:
      return {
        ...state,
        position: action.payload
      };

    case CHANGE_NAME:
      return {
        ...state,
        name: action.payload
      };
      
    case CHANGE_PASSWORD:
      return {
        ...state,
        password: action.payload
      };
    
    case CHANGE_PHONE:
      return {
        ...state,
        phone: action.payload
      };

    case CHANGE_EMAIL:
      return {
        ...state,
        email: action.payload
      };

    default:
      return state;
  }
}

//*******************************************************************************

class UserViewActions extends BaseViewActions {
  // Public Action Creators

  triggerIsActive = () => {
    return async (dispatch, getState) => {
      dispatch({
        type: CHANGE_IS_ACTIVE,
        payload: !getState().userView.isActive
      });
    };
  };

  changePosition = payload => {
    return {
      type: CHANGE_POSITION,
      payload: payload
    };
  };

  changeName = payload => {
    return {
      type: CHANGE_NAME,
      payload: payload
    };
  };

  
  changePassword = payload => {
    return {
      type: CHANGE_PASSWORD,
      payload: payload
    };
  };

  changePhone = payload => {
    return {
      type: CHANGE_PHONE,
      payload: payload
    };
  };

  changeEmail = payload => {
    return {
      type: CHANGE_EMAIL,
      payload: payload
    };
  };

  // ABSTRACT SERVICE FUNCS

  get _TABLE_ROUTE() {
    return ROUTE_NAMES.users;
  }

  get _TABLE_ACTIONS_PROVIDER() {
    return usersActions;
  }

  get _ACTION_TYPE_PREFIX() {
    return PREFIX;
  }

  //required for update item:

  get _API_PROVIDER() {
    return usersApi;
  }

  _validateView(itemObj) {
    return viewValidators.validateUserView(itemObj);
  }

  _isNewItem(itemObj) {
    return itemObj.createdUser == null;
  }

  _getStateSlice = state => {
    return state.userView;
  };
}

export const userViewActions = new UserViewActions();
