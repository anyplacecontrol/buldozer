import PropTypes from "prop-types";
import { ROUTE_NAMES } from "../../consts/routeNames";
import { certificatesActions } from "./certificatesRedux";
import * as viewValidators from "../../utils/viewValidators";
import * as certificatesApi from "../../api/certificatesApi";
import {
  BaseViewTypes,
  BaseViewActions,
  BaseViewInitialState,
  BaseViewReducer,
  IBaseView
} from "./baseViewRedux";
import * as dataFuncs from "../../utils/dataFuncs";

//*******************************************************************************

export const IUser = PropTypes.shape({
  email: PropTypes.string
});

export const ICertificateView = PropTypes.shape({
  ...IBaseView,
  id: PropTypes.string.isRequired,
  activeFromDate: PropTypes.string.isRequired, //api field: active_from_date
  validityPeriodInMonths: PropTypes.number.isRequired, //api field validity_period_in_months
  isActive: PropTypes.bool, //api field is_active
  createdUser: IUser, //api field: user_id
  amount: PropTypes.number.isRequired,
  isRedeemed: PropTypes.bool
});

//*******************************************************************************
const PREFIX = "certificateView/";

// const CHANGE_CREATED_BY = PREFIX + "CHANGE_CREATED_BY";
const CHANGE_ID = PREFIX + "CHANGE_ID";
const CHANGE_IS_ACTIVE = PREFIX + "CHANGE_IS_ACTIVE";
const CHANGE_AMOUNT = PREFIX + "CHANGE_AMOUNT";
const CHANGE_VALIDITY_PERIOD = PREFIX + "CHANGE_VALIDITY_PERIOD";

//*******************************************************************************

export const certificateViewInitialState = {
  ...BaseViewInitialState,
  id: "",
  activeFromDate: dataFuncs.dateRangeToISOFormat(Date.now()),
  validityPeriodInMonths: 12,
  isActive: false,
  createdUser: null,
  amount: 0,
  isRedeemed: false
};

//*******************************************************************************

export default function reducer(
  state = certificateViewInitialState,
  action = {}
) {
  let result = BaseViewReducer(
    PREFIX,
    state,
    action,
    certificateViewInitialState
  );

  if (result) return result;

  switch (action.type) {
    // case CHANGE_CREATED_BY:
    //   return {
    //     ...state,
    //     createdUser: action.payload,
    //   };

    case CHANGE_ID:
      return {
        ...state,
        id: action.payload
      };

    case CHANGE_AMOUNT:
      return {
        ...state,
        amount: action.payload
      };

    case CHANGE_IS_ACTIVE:
      return {
        ...state,
        isActive: action.payload
      };

    case CHANGE_VALIDITY_PERIOD:
      return {
        ...state,
        validityPeriodInMonths: action.payload
      };

    default:
      return state;
  }
}

//*******************************************************************************

class CertificateViewActions extends BaseViewActions {
  // Public Action Creators

  changeId = payload => {
    return {
      type: CHANGE_ID,
      payload: payload
    };
  };

  triggerIsActive = () => {
    return async (dispatch, getState) => {
      dispatch({
        type: CHANGE_IS_ACTIVE,
        payload: !getState().certificateView.isActive
      });
    };
  };

  changeAmount = payload => {
    return {
      type: CHANGE_AMOUNT,
      payload: payload
    };
  };

  changeValidityPeriod = payload => {
    return {
      type: CHANGE_VALIDITY_PERIOD,
      payload: payload
    };
  };

  // Protected Action Creators

  initializeView_end = () => {
    return async (dispatch, getState) => {
      //we need to remember some previous values,
      //because there is separate API to change them
      // let certificateObj = this._getStateSlice(getState());
      // if (this._isNewItem(certificateObj)) {
      //   await dispatch({
      //     type: CHANGE_CREATED_BY,
      //     payload: { id: window.myUser.id, email: window.authEmail }
      //   });
      // }
      // let existingItem = dataFuncs.getItemById(
      //   certificateObj.id,
      //   getState().certificates.items
      // );
    };
  };

  // ABSTRACT SERVICE FUNCS

  get _TABLE_ROUTE() {
    return ROUTE_NAMES.certificates;
  }

  get _TABLE_ACTIONS_PROVIDER() {
    return certificatesActions;
  }

  get _ACTION_TYPE_PREFIX() {
    return PREFIX;
  }

  //required for update item:

  get _API_PROVIDER() {
    return certificatesApi;
  }

  _validateView(itemObj) {
    return viewValidators.validateCertificateView(itemObj);
  }

  _isNewItem(itemObj) {
    return itemObj.createdUser == null;
  }

  _getStateSlice = state => {
    return state.certificateView;
  };
}

export const certificateViewActions = new CertificateViewActions();
