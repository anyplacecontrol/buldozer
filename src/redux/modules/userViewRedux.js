import PropTypes from "prop-types";
import { ROUTE_NAMES } from "../../consts/routeNames";
import { usersActions } from "./usersRedux";
import * as viewValidators from "../../utils/viewValidators";
import * as usersApi from "../../api/usersApi";
import { userRolesActions } from "./userRolesRedux";
import { recipientsActions } from "./recipientsRedux";
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

const IRole = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
});

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
  recipients: PropTypes.arrayOf(PropTypes.object),
  role: IRole
});

//*******************************************************************************
const PREFIX = "userView/";

const CHANGE_NAME = PREFIX + "CHANGE_NAME";
const CHANGE_PHONE = PREFIX + "CHANGE_PHONE";
const CHANGE_IS_ACTIVE = PREFIX + "CHANGE_IS_ACTIVE";
const CHANGE_POSITION = PREFIX + "CHANGE_POSITION";
const CHANGE_PASSWORD = PREFIX + "CHANGE_PASSWORD";
const CHANGE_EMAIL = PREFIX + "CHANGE_EMAIL";
const CHANGE_ROLE = PREFIX + "CHANGE_ROLE";
const CHANGE_RECIPIENT = PREFIX + "CHANGE_RECIPIENT";

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
  role: null,
  recipients: []
};

//*******************************************************************************

export default function reducer(state = userViewInitialState, action = {}) {
  let result = BaseViewReducer(PREFIX, state, action, userViewInitialState);

  if (result) return result;

  switch (action.type) {
    case CHANGE_IS_ACTIVE:
      return {
        ...state,
        isActive: action.payload
      };

    case CHANGE_ROLE:
      return {
        ...state,
        role: action.payload
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

    case CHANGE_RECIPIENT: {
      let recipients = [];
      if (!action.isPresent) {
        recipients = [action.recipient, ...state.recipients];
      } else {
        for (let i = 0; i < state.recipients.length; i++) {
          if (state.recipients[i].id != action.recipient.id)
          recipients.push(state.recipients[i]);
        }
      }
      return {
        ...state,
        recipients: recipients
      };
    }

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

  changeRole = payload => {
    return {
      type: CHANGE_ROLE,
      payload: payload
    };
  };

  changeRecipient = (recipient, isPresent) => {
    return {
      type: CHANGE_RECIPIENT,
      recipient,
      isPresent
    };
  };

  initializeView_end = () => {
    return async (dispatch, getState) => {
      //get userRoles

      let p1 = new Promise(async (resolve, reject) => {
        if (
          !getState().userRoles.items ||
          getState().userRoles.items.length === 0
        ) {
          try {
            await dispatch(
              userRolesActions.fetchItems(0, false, false, null, true, true)
            );
          } catch (e) {}
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
              recipientsActions.fetchItems(0, false, false, null, true, true)
            );
          } catch (e) {}
        }
        resolve();
      });

      dispatch(uiActions.showBackdrop(true));
      await Promise.all([p1, p2]);
      dispatch(uiActions.showBackdrop(false));
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
    return itemObj.id == 0;
  }

  _getStateSlice = state => {
    return state.userView;
  };
}

export const userViewActions = new UserViewActions();
