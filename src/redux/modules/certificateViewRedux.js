import PropTypes from "prop-types";
import { ROUTE_NAMES } from "../../consts/routeNames";
import { certificatesActions } from "./certificatesRedux";
import * as viewValidators from "../../utils/viewValidators";
import * as certificatesApi from "../../api/certificatesApi";
import {  
  BaseViewActions,
  BaseViewInitialState,
  BaseViewReducer,
  IBaseView
} from "./baseViewRedux";
import * as dataFuncs from "../../utils/dataFuncs";
import { IUserView } from "../../redux/modules/userViewRedux";
import { IRecipientView } from "./recipientViewRedux";
import { IServiceType } from "./serviceTypesRedux";
import { IRestaurantView } from "./restaurantViewRedux";

//*******************************************************************************

export const ICertificateView = PropTypes.shape({
  ...IBaseView,
  id: PropTypes.string.isRequired,
  activeFromDate: PropTypes.string, //api field: active_from_date
  validityPeriodInMonths: PropTypes.number.isRequired, //api field validity_period_in_months
  isActive: PropTypes.bool, //api field is_active
  createdUser: IUserView, //api field: user_id
  amount: PropTypes.number.isRequired,
  isRedeemed: PropTypes.bool,

  recipient: IRecipientView,
  recipientComment: PropTypes.string,
  serviceType: IServiceType,

  issuingRestaurant: IRestaurantView,
  redeemerRestaurant: IRestaurantView
});

//*******************************************************************************
const PREFIX = "certificateView/";

const CHANGE_ID = PREFIX + "CHANGE_ID";
const CHANGE_IS_ACTIVE = PREFIX + "CHANGE_IS_ACTIVE";
const CHANGE_AMOUNT = PREFIX + "CHANGE_AMOUNT";
const CHANGE_VALIDITY_PERIOD = PREFIX + "CHANGE_VALIDITY_PERIOD";
const CHANGE_RECIPIENT_COMMENT = PREFIX + "CHANGE_RECIPIENT_COMMENT";
const CHANGE_RECIPIENT = PREFIX + "CHANGE_RECIPIENT";
const CHANGE_SERVICE_TYPE = PREFIX + "CHANGE_SERVICE_TYPE";
const CHANGE_ISSUING_RESTAURANT = PREFIX + "CHANGE_ISSUING_RESTAURANT";
const CHANGE_ACTIVE_FROM_DATE = PREFIX + "CHANGE_ACTIVE_FROM_DATE";

//*******************************************************************************

export const certificateViewInitialState = {
  ...BaseViewInitialState,
  id: "",
  activeFromDate: null,
  validityPeriodInMonths: 12,
  isActive: false,
  createdUser: null,
  amount: 0,
  isRedeemed: false,

  recipient: null,
  recipientComment: null,
  serviceType: null,

  issuingRestaurant: null,
  redeemerRestaurant: null
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

    case CHANGE_RECIPIENT_COMMENT:
      return {
        ...state,
        recipientComment: action.payload
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

    case CHANGE_RECIPIENT:
      return {
        ...state,
        recipient: action.payload ? { ...action.payload } : null
      };

    case CHANGE_SERVICE_TYPE:
      return {
        ...state,
        serviceType: action.payload ? { ...action.payload } : null
      };

    case CHANGE_ISSUING_RESTAURANT:
      return {
        ...state,
        issuingRestaurant: action.payload ? { ...action.payload } : null
      };

    case CHANGE_ACTIVE_FROM_DATE: {
      let activeFromDate = action.payload
        ? dataFuncs.dateRangeToISOFormat(action.payload)
        : null;
      return {
        ...state,
        activeFromDate
      };
    }
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

  changeRecipientComment = payload => {
    return {
      type: CHANGE_RECIPIENT_COMMENT,
      payload: payload
    };
  };

  changeRecipient = payload => {
    return {
      type: CHANGE_RECIPIENT,
      payload: payload
    };
  };

  changeServiceType = payload => {
    return {
      type: CHANGE_SERVICE_TYPE,
      payload: payload
    };
  };

  changeIssuingRestaurant = payload => {
    return {
      type: CHANGE_ISSUING_RESTAURANT,
      payload: payload
    };
  };

  changeActiveFromDate = payload => {
    return {
      type: CHANGE_ACTIVE_FROM_DATE,
      payload: payload
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
