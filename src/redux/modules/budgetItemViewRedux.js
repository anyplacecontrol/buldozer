import * as budgetApi from "../../api/budgetApi";
import { BaseTableTypes, showException } from "./baseTableRedux";
import * as uiActions from "./uiRedux";
import { validateBudgetItemView } from "../../utils/viewValidators";
import { budgetTableActions } from "./budgetTableRedux";
import { formatDateObj } from "../../utils/dataFuncs";

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
const RESET_STATE_TO_FILTERS = "RESET_STATE_TO_FILTERS";
const CHANGE_PERIOD = "CHANGE_PERIOD";
const CHANGE_RESTAURANT = "CHANGE_RESTAURANT";
const CHANGE_BUDGET_TYPE = "CHANGE_BUDGET_TYPE";
const RESET_STATE_TO_NULL = "RESET_STATE_TO_NULL";
const DELETE_INCOME = "DELETE_INCOME";

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

    case PREFIX + RESET_STATE_TO_NULL:
      return null;

    case PREFIX + RESET_STATE_TO_FILTERS: {
      return {
        ...budgetItemViewInitialState,
        periodFromDate: action.periodFromDate,
        periodToDate: action.periodToDate,
        restaurant: action.restaurant,
        budgetType: action.budgetType
      };
    }

    case PREFIX + CHANGE_PERIOD:
      return {
        ...state,
        periodFromDate: action.periodFromDate,
        periodToDate: action.periodToDate
      };

    case PREFIX + CHANGE_RESTAURANT:
      return {
        ...state,
        restaurant: action.restaurant
      };

    case PREFIX + CHANGE_BUDGET_TYPE:
      return {
        ...state,
        budgetType: action.budgetType
      };

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
            id: 0,
            amount: 0,
            currency: allCurrencies[0],
            paymentType: allPaymentTypes[0]
          }
        ]
      };
    }

    case PREFIX + DELETE_INCOME: {
      let newIncomes = [];
      for (let i = 0; i < state.incomes.length; i++) {
        if (i != action.index) newIncomes.push(state.incomes[i]);
      }
      return {
        ...state,
        incomes: newIncomes
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
    return {
      type: this._withPrefix(BaseTableTypes.RESET_STATE)
    };
  }

  resetStateToNull() {
    return {
      type: this._withPrefix(RESET_STATE_TO_NULL)
    };
  }

  resetStateToFilters() {
    return (dispatch, getState) => {
      let filterItems = getState().budgetTable.filterItems;
      let periodFromDate = null;
      let periodToDate = null;
      if (
        filterItems[0] &&
        filterItems[0].value &&
        filterItems[0].value.startDate &&
        filterItems[0].value.endDate
      ) {
        periodFromDate =
          formatDateObj(filterItems[0].value.startDate) + "T00:00:00.000Z";
        periodToDate =
          formatDateObj(filterItems[0].value.endDate) + "T00:00:00.000Z";
      }
      let restaurant = null;
      if (filterItems[1] && filterItems[1].value && filterItems[1].value.id > 0)
        restaurant = filterItems[1].value;
      let budgetType = null;
      if (filterItems[2] && filterItems[2].value && filterItems[2].value.id > 0)
        budgetType = filterItems[2].value;

      dispatch({
        type: this._withPrefix(RESET_STATE_TO_FILTERS),
        periodFromDate,
        periodToDate,
        restaurant,
        budgetType
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

  changePeriod(data) {
    let periodFromDate = null;
    let periodToDate = null;
    if (data && data.startDate)
      periodFromDate = formatDateObj(data.startDate) + "T00:00:00.000Z";
    if (data && data.endDate)
      periodToDate = formatDateObj(data.endDate) + "T00:00:00.000Z";

    return {
      type: this._withPrefix(CHANGE_PERIOD),
      periodFromDate,
      periodToDate
    };
  }

  changeBudgetType(data) {
    let budgetType = null;
    if (data && data.id > 0) budgetType = data;

    return {
      type: this._withPrefix(CHANGE_BUDGET_TYPE),
      budgetType
    };
  }

  changeRestaurant(data) {
    let restaurant = null;
    if (data && data.id > 0) restaurant = data;

    return {
      type: this._withPrefix(CHANGE_RESTAURANT),
      restaurant
    };
  }

  // *** Update/Add
  updateItem = () => {
    return async (dispatch, getState) => {
      let item = this._getStateSlice(getState());

      let isCreateNew = item.id == 0;
      let itemObj;

      try {
        //new object returned
        itemObj = validateBudgetItemView(item);
      } catch (e) {
        // dispatch(this.setValidated());
        setTimeout(() => {
          dispatch(uiActions.ShowAlert(e, uiActions.ALERT_ERROR));
        }, 500);
        return;
      }

      dispatch(uiActions.showBackdrop(true));

      let fetchedData;
      try {
        if (isCreateNew) fetchedData = await budgetApi.addItem(itemObj);
        else {
          fetchedData = await budgetApi.updateItem(itemObj);
        }

        dispatch(uiActions.showBackdrop(false));
      } catch (e) {
        dispatch(uiActions.showBackdrop(false));
        setTimeout(() => {
          dispatch(showException(e, false));
        }, 500);
        return;
      }

      await dispatch(budgetTableActions.replaceFiltersFromItem(item));
      await dispatch(this.resetStateToNull());
      await dispatch(budgetTableActions.fetchItems());

      let message = "Запись успешно обновлена";
      if (isCreateNew) message = "Запись успешно создана";

      //we need delay, because fetch after goto_Page clears alerts

      setTimeout(() => {
        dispatch(uiActions.ShowAlert(message, uiActions.ALERT_SUCCESS));
      }, 500);
    };
  };

  addFile = event => {
    return async (dispatch, getState) => {
      if (!event.target) return;
      if (!event.target.files) return;

      let selectedFile = event.target.files[0];
      if (!selectedFile) return;

      if (selectedFile.size > 10 * 1024 * 1024) {
        alert("Файл превышает размер 10 Mb");
        return;
      }

      try {
        let id = getState().budgetItemView.id;
        dispatch(uiActions.showBackdrop(true));
        let response = await budgetApi.addFile(id, selectedFile);
        if (response) {
          alert("Файл успешно Загружен!");
          dispatch(this.fetchItem(id));
        }
      } catch (e) {
        console.log(e);
        alert(e.message);
      } finally {
        dispatch(uiActions.showBackdrop(false));
      }
    };
  };

  deleteFile = fileId => {
    return async (dispatch, getState) => {
      if (!confirm("Вы уверены, что хотите удалить файл?")) return;

      try {
        let id = getState().budgetItemView.id;
        dispatch(uiActions.showBackdrop(true));
        let response = await budgetApi.deleteFile(fileId);
        if (response) {
          alert("Файл успешно Удален!");
          dispatch(this.fetchItem(id));
        }
      } catch (e) {
        console.log(e);
        alert(e.message);
      } finally {
        dispatch(uiActions.showBackdrop(false));
      }
    };
  };

  deleteIncome = incomeIndex => {
    return async (dispatch, getState) => {
      let incomes = getState().budgetItemView.incomes;
      if (!incomes) return;
      let income = incomes[incomeIndex];
      if (!income) return;

      if (income.id && income.id > 0) {
        //Delete via API
        return;
      }

      dispatch({
        type: this._withPrefix(DELETE_INCOME),
        index: incomeIndex
      });
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
