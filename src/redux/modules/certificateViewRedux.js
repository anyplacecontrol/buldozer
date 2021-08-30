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
import { IServiceTypeView } from "./serviceTypeViewRedux";
import { IRestaurantView } from "./restaurantViewRedux";
import * as uiActions from "./uiRedux";

//*******************************************************************************
const ITransaction = PropTypes.shape({
  createdDate: PropTypes.string,
  amount: PropTypes.number, //Погашено
  balance: PropTypes.number, //Баланс
  restaurant: IRestaurantView
});

export const ICertificateView = PropTypes.shape({
  ...IBaseView,
  id: PropTypes.string.isRequired,
  activeFromDate: PropTypes.string, //api field: active_from_date
  validityPeriodInMonths: PropTypes.number.isRequired, //api field validity_period_in_months
  isActive: PropTypes.bool, //api field is_active
  createdUser: IUserView, //api field: user_id
  amount: PropTypes.number.isRequired,

  cardId: PropTypes.string.isRequired,
  usedAmount: PropTypes.number.isRequired,
  balance: PropTypes.number.isRequired,
  isPartiallyRedeemable: PropTypes.bool,
  isBarterable: PropTypes.bool,

  isRedeemed: PropTypes.bool,
  recipient: IRecipientView,
  recipientComment: PropTypes.string,
  serviceType: IServiceTypeView,

  issuingRestaurant: IRestaurantView,
  redeemerRestaurants: PropTypes.arrayOf(IRestaurantView),
  allRedeemerRestaurants: PropTypes.bool,

  card: PropTypes.shape({
    id: PropTypes.string.isRequired
  }),

  transactions: PropTypes.arrayOf(ITransaction),  
});

//*******************************************************************************
const PREFIX = "certificateView/";

const CHANGE_ID = PREFIX + "CHANGE_ID";
const CHANGE_CARD_ID = PREFIX + "CHANGE_CARD_ID";
const CHANGE_IS_ACTIVE = PREFIX + "CHANGE_IS_ACTIVE";
const CHANGE_AMOUNT = PREFIX + "CHANGE_AMOUNT";
const CHANGE_VALIDITY_PERIOD = PREFIX + "CHANGE_VALIDITY_PERIOD";
const CHANGE_RECIPIENT_COMMENT = PREFIX + "CHANGE_RECIPIENT_COMMENT";
const CHANGE_RECIPIENT = PREFIX + "CHANGE_RECIPIENT";
const CHANGE_SERVICE_TYPE = PREFIX + "CHANGE_SERVICE_TYPE";
const CHANGE_ISSUING_RESTAURANT = PREFIX + "CHANGE_ISSUING_RESTAURANT";
const CHANGE_ACTIVE_FROM_DATE = PREFIX + "CHANGE_ACTIVE_FROM_DATE";
const CHANGE_REDEEMER_RESTAURANT = PREFIX + "CHANGE_REDEEMER_RESTAURANT";
const TRIGGER_ALL_REDEEMER_RESTAURANTS = PREFIX + "TRIGGER_ALL_REDEEMER_RESTAURANTS";
const CHANGE_TRANSACTIONS = PREFIX + "CHANGE_TRANSACTIONS";
const CHANGE_IS_PARTIALLY_REDEEMABLE = PREFIX + "CHANGE_IS_PARTIALLY_REDEEMABLE";
const CHANGE_IS_BARTERABLE = PREFIX + "CHANGE_IS_BARTERABLE"

//*******************************************************************************

export const certificateViewInitialState = {
  ...BaseViewInitialState,
  id: "",
  activeFromDate: null,
  validityPeriodInMonths: 12,
  isActive: false,
  createdUser: null,
  amount: 0,
  usedAmount: 0,
  balance: 0,
  isPartiallyRedeemable: false,
  isBarterable: false,
  cardId: "",

  isRedeemed: false,

  recipient: null,
  recipientComment: null,
  serviceType: null,

  issuingRestaurant: null,
  redeemerRestaurants: [],
  allRedeemerRestaurants: false,

  card: null,
  createdDate: null
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

    case CHANGE_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload
      };

    case CHANGE_REDEEMER_RESTAURANT: {
      let restaurants = [];
      if (!action.isPresent) {
        restaurants = [action.restaurant, ...state.redeemerRestaurants];
      } else {
        for (let i = 0; i < state.redeemerRestaurants.length; i++) {
          if (state.redeemerRestaurants[i].id != action.restaurant.id)
            restaurants.push(state.redeemerRestaurants[i]);
        }
      }
      return {
        ...state,
        redeemerRestaurants: restaurants
      };
    }

    case TRIGGER_ALL_REDEEMER_RESTAURANTS: {
      return {
      ...state,
      allRedeemerRestaurants: !state.allRedeemerRestaurants
      }
    }

    case CHANGE_CARD_ID:
      return {
        ...state,
        cardId: action.payload
      };

    case CHANGE_AMOUNT:
      return {
        ...state,
        amount: action.payload
      };

    case CHANGE_IS_PARTIALLY_REDEEMABLE:
        return {
          ...state,          
          isPartiallyRedeemable: action.value
        };

    case CHANGE_IS_BARTERABLE:
        return {
          ...state,                    
          isBarterable: action.value
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

  changeCardId = payload => {
    return {
      type: CHANGE_CARD_ID,
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

  changeRedeemerRestaurant = (restaurant, isPresent) => {
    return {
      type: CHANGE_REDEEMER_RESTAURANT,
      restaurant,
      isPresent
    };
  };

  triggerAllRedeemerRestaurant = () => {
    return {
      type: TRIGGER_ALL_REDEEMER_RESTAURANTS
    }
  }

  changeIsBarterable = newValue => {
    return {
      type: CHANGE_IS_BARTERABLE,
      value: newValue,      
    };
  }

  changeIsPartiallyRedeemable = newValue => {
    return {
      type: CHANGE_IS_PARTIALLY_REDEEMABLE, 
      value: newValue,      
    };
  }

  initializeView_end = () => {
    return async (dispatch, getState) => {
      if (this._isNewItem(getState().certificateView)) return;

      //get certificates for restaurant

      try {
        dispatch(uiActions.showBackdrop(true));
        let transactions = await certificatesApi.getItem(
          getState().certificateView.id
        );
        await dispatch({
          type: CHANGE_TRANSACTIONS,
          payload: transactions
        });
      } catch (e) {
        console.log(e);
        alert(e.message);
      } finally {
        dispatch(uiActions.showBackdrop(false));
      }
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
    return itemObj.createdDate ? false: true;
  }

  _getStateSlice = state => {
    return state.certificateView;
  };
}

export const certificateViewActions = new CertificateViewActions();
