import PropTypes from "prop-types";
import { ROUTE_NAMES } from "../../consts/routeNames";
import { cardsActions } from "./cardsRedux";
import * as viewValidators from "../../utils/viewValidators";
import * as cardsApi from "../../api/cardsApi";
import {
  BaseViewActions,
  BaseViewInitialState,
  BaseViewReducer,
  IBaseView
} from "./baseViewRedux";
import * as dataFuncs from "../../utils/dataFuncs";
import { IUserView } from "../../redux/modules/userViewRedux";
import { IRecipientView } from "./recipientViewRedux";
import { ICertificateView, ITransaction } from "./certificateViewRedux";
import * as uiActions from "./uiRedux";

//*******************************************************************************

export const ICardView = PropTypes.shape({
  ...IBaseView,
  id: PropTypes.string,
  balance: PropTypes.number.isRequired,
  recipientComment: PropTypes.string,
  isActive: PropTypes.bool,
  createdDate: PropTypes.string,
  createdUser: IUserView, //api field: user_id
  recipient: IRecipientView,
  certificates: PropTypes.arrayOf(ICertificateView),
  transactions: PropTypes.arrayOf(ITransaction)
});

//*******************************************************************************
const PREFIX = "cardView/";

const CHANGE_ID = PREFIX + "CHANGE_ID";
const CHANGE_IS_ACTIVE = PREFIX + "CHANGE_IS_ACTIVE";
const CHANGE_RECIPIENT_COMMENT = PREFIX + "CHANGE_RECIPIENT_COMMENT";
const CHANGE_RECIPIENT = PREFIX + "CHANGE_RECIPIENT";
const UPDATE_CARD_DETAILS = PREFIX + "UPDATE_CARD_DETAILS";

//*******************************************************************************

export const cardViewInitialState = {
  ...BaseViewInitialState,
  id: "",
  balance: 0,
  recipientComment: "",
  isActive: false,
  createdDate: "",
  createdUser: null,
  recipient: null,
  certificates: [],
  transactions: []
};

//*******************************************************************************

export default function reducer(state = cardViewInitialState, action = {}) {
  let result = BaseViewReducer(PREFIX, state, action, cardViewInitialState);

  if (result) return result;

  switch (action.type) {
    case CHANGE_ID:
      return {
        ...state,
        id: action.payload
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

    case CHANGE_RECIPIENT:
      return {
        ...state,
        recipient: action.payload ? { ...action.payload } : null
      };

    case UPDATE_CARD_DETAILS:
      return {
        ...state,
        certificates:
          action.card && action.card.certificates
            ? action.card.certificates
            : [],
        transactions:
            action.card && action.card.transactions
              ? action.card.transactions
              : []        
      };
    default:
      return state;
  }
}

//*******************************************************************************

class CardViewActions extends BaseViewActions {
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
        payload: !getState().cardView.isActive
      });
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

  initializeView_end = () => {
    return async (dispatch, getState) => {
      if (this._isNewItem(getState().cardView)) return;

      //fetch card details (to get certificates)

      try {
        dispatch(uiActions.showBackdrop(true));

        let card = await cardsApi.getItem(getState().cardView.id);        

        await dispatch({
          type: UPDATE_CARD_DETAILS,
          card: card
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
    return ROUTE_NAMES.cards;
  }

  get _TABLE_ACTIONS_PROVIDER() {
    return cardsActions;
  }

  get _ACTION_TYPE_PREFIX() {
    return PREFIX;
  }

  //required for update item:

  get _API_PROVIDER() {
    return cardsApi;
  }

  _validateView(itemObj) {
    return viewValidators.validateCardView(itemObj);
  }

  _isNewItem(itemObj) {
    return itemObj.createdDate == "";
  }

  _getStateSlice = state => {
    return state.cardView;
  };
}

export const cardViewActions = new CardViewActions();
