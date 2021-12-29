import PropTypes from "prop-types";
import {IUserView} from "../../redux/modules/userViewRedux";  
import { ROUTE_NAMES } from "../../consts/routeNames";
import { expenseCategoriesActions } from "./expenseCategoriesRedux";
import * as viewValidators from "../../utils/viewValidators";
import * as expenseCategoriesApi from "../../api/expenseCategoriesApi";
import {
  BaseViewActions,
  BaseViewInitialState,
  BaseViewReducer,
  IBaseView
} from "./baseViewRedux";

//*******************************************************************************

export const IExpenseCategoryView = PropTypes.shape({
  ...IBaseView,
  id: PropTypes.number.isRequired,  
  name: PropTypes.string.isRequired,
  createdDate: PropTypes.string,
  createdUser: IUserView,  
});


//*******************************************************************************
const PREFIX = "expenseCategoryView/";

const CHANGE_NAME = PREFIX + "CHANGE_NAME";


//*******************************************************************************

export const expenseCategoryViewInitialState = {
  ...BaseViewInitialState,
  id: 0,  
  name: "",
  createdDate: null,
  createdUser: null,  
};

//*******************************************************************************

export default function reducer(
  state = expenseCategoryViewInitialState,
  action = {}
) {
  let result = BaseViewReducer(
    PREFIX,
    state,
    action,
    expenseCategoryViewInitialState
  );

  if (result) return result;

  switch (action.type) {

    case CHANGE_NAME:
      return {
        ...state,
        name: action.payload
      };

    default:
      return state;
  }
}

//*******************************************************************************

class ExpenseCategoryViewActions extends BaseViewActions {

  // Public Action Creators

  changeName = payload => {
    return {
      type: CHANGE_NAME,
      payload: payload
    };
  };

  // ABSTRACT SERVICE FUNCS

  get _TABLE_ROUTE() {
    return ROUTE_NAMES.expenseCategories;
  }

  get _TABLE_ACTIONS_PROVIDER() {
    return expenseCategoriesActions;
  }

  get _ACTION_TYPE_PREFIX() {
    return PREFIX;
  }

  //required for update item:

  get _API_PROVIDER() {
    return expenseCategoriesApi;
  }

  _validateView(itemObj) {
    return viewValidators.validateManifestationView(itemObj);
  }

  _isNewItem(itemObj) {
    return itemObj.createdUser == null;
  }

  _getStateSlice = state => {
    return state.expenseCategoryView;
  };
}

export const expenseCategoryViewActions = new ExpenseCategoryViewActions();
