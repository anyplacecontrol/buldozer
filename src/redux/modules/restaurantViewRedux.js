import PropTypes from "prop-types";
import {IUserView} from "../../redux/modules/userViewRedux";  
import { ROUTE_NAMES } from "../../consts/routeNames";
import { restaurantsActions } from "./restaurantsRedux";
import * as viewValidators from "../../utils/viewValidators";
import * as restaurantsApi from "../../api/restaurantsApi";
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

export const IRestaurantView = PropTypes.shape({
  ...IBaseView,
  id: PropTypes.number.isRequired,  
  name: PropTypes.string.isRequired,
  email: PropTypes.string,  
  address: PropTypes.string,
  phone: PropTypes.string,
  comment: PropTypes.string,
  isActive: PropTypes.bool,
  createdDate: PropTypes.string,
  createdUser: IUserView,  
});


//*******************************************************************************
const PREFIX = "restaurantView/";

const CHANGE_IS_ACTIVE = PREFIX + "CHANGE_IS_ACTIVE";
const CHANGE_COMMENT = PREFIX + "CHANGE_COMMENT";
const CHANGE_NAME = PREFIX + "CHANGE_NAME";
const CHANGE_COMPANY = PREFIX + "CHANGE_COMPANY";
const CHANGE_ADDRESS = PREFIX + "CHANGE_ADDRESS";
const CHANGE_PHONE = PREFIX + "CHANGE_PHONE";
const CHANGE_EMAIL = PREFIX + "CHANGE_EMAIL";

//*******************************************************************************

export const restaurantViewInitialState = {
  ...BaseViewInitialState,
  id: 0,  
  name: "",
  email: "",  
  address: "",
  phone: "",
  comment: "",
  isActive: false,
  createdDate: null,
  createdUser: null,  
};

//*******************************************************************************

export default function reducer(
  state = restaurantViewInitialState,
  action = {}
) {
  let result = BaseViewReducer(
    PREFIX,
    state,
    action,
    restaurantViewInitialState
  );

  if (result) return result;

  switch (action.type) {
    case CHANGE_IS_ACTIVE:
      return {
        ...state,
        isActive: action.payload
      };

    case CHANGE_COMMENT:
      return {
        ...state,
        comment: action.payload
      };

    case CHANGE_NAME:
      return {
        ...state,
        name: action.payload
      };

    case CHANGE_COMPANY:
      return {
        ...state,
        company: action.payload
      };

    case CHANGE_ADDRESS:
      return {
        ...state,
        address: action.payload
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

class RestaurantViewActions extends BaseViewActions {
  // Public Action Creators

  triggerIsActive = () => {
    return async (dispatch, getState) => {
      dispatch({
        type: CHANGE_IS_ACTIVE,
        payload: !getState().restaurantView.isActive
      });
    };
  };

  changeComment = payload => {
    return {
      type: CHANGE_COMMENT,
      payload: payload
    };
  };

  changeName = payload => {
    return {
      type: CHANGE_NAME,
      payload: payload
    };
  };

  
  changeAddress = payload => {
    return {
      type: CHANGE_ADDRESS,
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

  initializeView_end = () => {
    return async (dispatch, getState) => {
      if (this._isNewItem(getState().restaurantView)) return;

      //get certificates for restaurant

      try {
        dispatch(uiActions.showBackdrop(true));
        await dispatch(
          certificatesActions.fetchItems(
            0,
            false,
            false,
            { issuingRestaurants : [getState().restaurantView.id] },
            true,
            true
          )
        );
      } catch (e) {
      } finally {
        dispatch(uiActions.showBackdrop(false));
      }
    };
  };

  // ABSTRACT SERVICE FUNCS

  get _TABLE_ROUTE() {
    return ROUTE_NAMES.restaurants;
  }

  get _TABLE_ACTIONS_PROVIDER() {
    return restaurantsActions;
  }

  get _ACTION_TYPE_PREFIX() {
    return PREFIX;
  }

  //required for update item:

  get _API_PROVIDER() {
    return restaurantsApi;
  }

  _validateView(itemObj) {
    return viewValidators.validateRestaurantView(itemObj);
  }

  _isNewItem(itemObj) {
    return itemObj.id == 0;
  }

  _getStateSlice = state => {
    return state.restaurantView;
  };
}

export const restaurantViewActions = new RestaurantViewActions();
