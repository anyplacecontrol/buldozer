import * as budgetApi from "../../api/budgetApi";
import { BaseTableTypes, showException } from "./baseTableRedux";
import * as uiActions from "./uiRedux";

//*******************************************************************************
const PREFIX = "budgetItemView/";
const REPLACE_ITEM = "REPLACE_ITEM";
const CHANGE_EXPENSE_CATEGORY = "CHANGE_EXPENSE_CATEGORY";
const CHANGE_MANIFESTATION = "CHANGE_MANIFESTATION";
const CHANGE_EXPENSE_ITEM = "CHANGE_EXPENSE_ITEM";
const CHANGE_IS_ACTIVE = "CHANGE_IS_ACTIVE";
const CHANGE_COMMENT = "CHANGE_COMMENT";

//*******************************************************************************

export const budgetItemViewInitialState = {
  id: 0,
  expenseCategory: null,
  manifestation: null,
  expenseItem: null,
  isActive: false,
  paymentStatus: "",
  createdUser: null,
  comment: ""
};

//*******************************************************************************

export default function reducer(
  state = budgetItemViewInitialState,
  action = {}
) {
  switch (action.type) {
    case PREFIX + BaseTableTypes.RESET_STATE:
      return { ...budgetItemViewInitialState };

    case PREFIX + REPLACE_ITEM:
      return {
        ...action.item
      };

    case PREFIX + CHANGE_EXPENSE_CATEGORY:
      return {
        ...state,
        expenseCategory: action.payload
      };

    case PREFIX + CHANGE_EXPENSE_ITEM:
      return {
        ...state,
        expenseItem: action.payload
      };

    case PREFIX + CHANGE_MANIFESTATION:
      return {
        ...state,
        manifestation: action.payload
      };

    case PREFIX + CHANGE_IS_ACTIVE:
      return {
        ...state,
        isActive: action.payload
      };

    case PREFIX + CHANGE_COMMENT:
      return {
        ...state,
        comment: action.payload
      };

    default:
      return state;
  }
}

//*******************************************************************************

class BudgetTableActions {
  // ABSTRACT ACTIONS REALIZATION

  resetState() {
    return async (dispatch, getState) => {
      await dispatch({
        type: this._withPrefix(BaseTableTypes.RESET_STATE)
      });
    };
  }

  fetchItem = id => {
    return async (dispatch, getState) => {
      let fetchedItem = null;
      let keepBackdropOpened = false;

      dispatch(uiActions.showBackdrop(true));

      try {
        dispatch(uiActions.showBackdrop(true));
        if (id) fetchedItem = await budgetApi.getItem(id);
      } catch (e) {
        dispatch(showException(e, keepBackdropOpened));
        if (!keepBackdropOpened) {
          throw e;
        }
        return;
      }

      dispatch(uiActions.showBackdrop(false || keepBackdropOpened));

      if (!fetchedItem) {
        let message =
          "Problem in fetchItem. Empty data received for item: " +
          this._ACTION_TYPE_PREFIX;

        dispatch(
          uiActions.ShowAlert(
            message,
            uiActions.ALERT_ERROR,
            keepBackdropOpened
          )
        );

        if (!keepBackdropOpened) {
          throw message;
        }

        return;
      }

      dispatch({
        type: this._withPrefix(REPLACE_ITEM),
        item: fetchedItem ? fetchedItem : budgetItemViewInitialState
      });
    };
  };

  changeExpenseCategory = payload => {
    return {
      type: this._withPrefix(CHANGE_EXPENSE_CATEGORY),
      payload: payload
    };
  };

  changeManifestation = payload => {
    return {
      type: this._withPrefix(CHANGE_MANIFESTATION),
      payload: payload
    };
  };

  changeExpenseItem = payload => {
    return {
      type: this._withPrefix(CHANGE_EXPENSE_ITEM),
      payload: payload
    };
  };

  triggerIsActive = () => {
    return async (dispatch, getState) => {
      dispatch({
        type: this._withPrefix(CHANGE_IS_ACTIVE),
        payload: !getState().budgetItemView.isActive
      });
    };
  };

  changeComment = payload => {
    return {
      type: this._withPrefix(CHANGE_COMMENT),
      payload: payload
    };
  };

  //------------------------------------------------------------------------------
  // ABSTRACT FUNCS REALIZATION

  get _ACTION_TYPE_PREFIX() {
    return PREFIX;
  }

  _getStateSlice = state => {
    return state.budgetItemView;
  };

  //------------------------------------------------------------------------------
  //SELECTORS

  _withPrefix = actionType => {
    return this._ACTION_TYPE_PREFIX + actionType;
  };
}

export const budgetItemViewActions = new BudgetTableActions();
