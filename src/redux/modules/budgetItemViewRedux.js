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
const CHANGE_EXPENSE_VALUE = "CHANGE_EXPENSE_VALUE";
const CHANGE_INCOME_VALUE = "CHANGE_INCOME_VALUE";
const ADD_INCOME = "ADD_INCOME";

export const allCurrencies = [
  { name: "ГРН", id: 1 },
  { name: "USD", id: 2 },
  { name: "EUR", id: 3 },
  { name: "ГРН (бартер)", id: 4 }
];
export const allPaymentTypes = [
  { name: "Наличными", id: 1 },
  { name: "Безналичный", id: 2 },
  { name: "Бартер", id: 3 }
];

//*******************************************************************************

export const budgetItemViewInitialState = {
  id: 0,
  expenseCategory: null,
  manifestation: null,
  expenseItem: null,
  isActive: false,
  paymentStatus: "",
  createdUser: null,
  comment: "",
  expenses: [
    {
      updatedAmount: 0,
      currency: allCurrencies[0]
    },
    {
      updatedAmount: 0,
      currency: allCurrencies[1]
    },
    {
      updatedAmount: 0,
      currency: allCurrencies[2]
    },
    {
      updatedAmount: 0,
      currency: allCurrencies[3]
    }
  ],
  incomes: []
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

    case PREFIX + CHANGE_EXPENSE_VALUE: {
      let expenses = JSON.parse(JSON.stringify(state.expenses));
      expenses[action.index][action.fieldName] = action.value;
      return {
        ...state,
        expenses: expenses
      };
    }
    case PREFIX + CHANGE_INCOME_VALUE: {
      let incomes = JSON.parse(JSON.stringify(state.incomes));
      incomes[action.index][action.fieldName] = action.value;
      return {
        ...state,
        incomes: incomes
      };
    }

    case PREFIX + ADD_INCOME: {
      return {
        ...state,
        incomes: [
          ...state.incomes,
          {
            amount: 0,
            currency: allCurrencies[0],
            paymentType: allPaymentTypes[0]
          }
        ]
      };
    }

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

  addIncome = () => {
    return {
      type: this._withPrefix(ADD_INCOME)
    };
  };

  changeArrayValue = (arrayName, fieldName, index, value) => {
    let type = CHANGE_EXPENSE_VALUE;
    if (arrayName == "incomes") type = CHANGE_INCOME_VALUE;
    return {
      type: this._withPrefix(type),
      fieldName: fieldName,
      index: index,
      value: value
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
