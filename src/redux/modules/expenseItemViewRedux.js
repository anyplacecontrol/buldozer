import PropTypes from "prop-types";
import { IUserView } from "../../redux/modules/userViewRedux";
import { IExpenseCategoryView } from "../../redux/modules/expenseCategoryViewRedux";
import { ROUTE_NAMES } from "../../consts/routeNames";
import { expenseItemsActions } from "./expenseItemsRedux";
import * as viewValidators from "../../utils/viewValidators";
import * as expenseItemsApi from "../../api/expenseItemsApi";

import {
  BaseViewActions,
  BaseViewInitialState,
  BaseViewReducer,
  IBaseView
} from "./baseViewRedux";

//*******************************************************************************

export const IExpenseItemView = PropTypes.shape({
  ...IBaseView,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  createdDate: PropTypes.string,
  createdUser: IUserView,
  expenseCategory: IExpenseCategoryView
});

//*******************************************************************************
const PREFIX = "expenseItemView/";

const CHANGE_NAME = PREFIX + "CHANGE_NAME";
const CHANGE_EXPENSE_CATEGORY = PREFIX + "CHANGE_EXPENSE_CATEGORY";

//*******************************************************************************

export const expenseItemViewInitialState = {
  ...BaseViewInitialState,
  id: 0,
  name: "",
  createdDate: null,
  createdUser: null,
  expenseCategory: null
};

//*******************************************************************************

export default function reducer(
  state = expenseItemViewInitialState,
  action = {}
) {
  let result = BaseViewReducer(
    PREFIX,
    state,
    action,
    expenseItemViewInitialState
  );

  if (result) return result;

  switch (action.type) {
    case CHANGE_NAME:
      return {
        ...state,
        name: action.payload
      };

    case CHANGE_EXPENSE_CATEGORY:
      return {
        ...state,
        expenseCategory: action.payload ? { ...action.payload } : null
      };

    default:
      return state;
  }
}

//*******************************************************************************

class ExpenseItemViewActions extends BaseViewActions {
  // Public Action Creators

  changeName = payload => {
    return {
      type: CHANGE_NAME,
      payload: payload
    };
  };

  changeExpenseCategory = payload => {
    return {
      type: CHANGE_EXPENSE_CATEGORY,
      payload: payload
    };
  };

  // ABSTRACT SERVICE FUNCS

  get _TABLE_ROUTE() {
    return ROUTE_NAMES.expenseItems;
  }

  get _TABLE_ACTIONS_PROVIDER() {
    return expenseItemsActions;
  }

  get _ACTION_TYPE_PREFIX() {
    return PREFIX;
  }

  //required for update item:

  get _API_PROVIDER() {
    return expenseItemsApi;
  }

  _validateView(itemObj) {
    return viewValidators.validateExpenseItemView(itemObj);
  }

  _isNewItem(itemObj) {
    return itemObj.createdUser == null;
  }

  _getStateSlice = state => {
    return state.expenseItemView;
  };
}

export const expenseItemViewActions = new ExpenseItemViewActions();
