import * as uiActions from "./uiRedux";
import * as dataFuncs from "../../utils/dataFuncs";
import * as serviceFuncs from "../../utils/serviceFunctions";
import * as routing from "../modules/routingRedux";
import {QUERY_PARAMS} from "../../consts/routeNames";
import PropTypes from "prop-types";
import {showException} from "./baseTableRedux";

const errorAbstractMethod = "Can not call abstract method of BaseTables class";

//*******************************************************************************
//ACTION TYPES

export class BaseViewTypes {
  static RESET_STATE = "RESET_STATE";
  static SET_STATE = "SET_STATE";
  static SET_VALIDATED = "SET_VALIDATED";

}

//*******************************************************************************
//INITIAL STATE

export const IBaseView = {
  isChecked: PropTypes.bool,
  isValidated: PropTypes.bool,  
};

export const BaseViewInitialState = {
  isChecked: false,
  isValidated: false,  
};

//*******************************************************************************
//REDUCER

export function BaseViewReducer(
  _ACTION_TYPE_PREFIX,
  state,
  action = {},
  initialState
) {
  switch (action.type) {
    case _ACTION_TYPE_PREFIX + BaseViewTypes.RESET_STATE:
      return {...initialState};

    case _ACTION_TYPE_PREFIX + BaseViewTypes.SET_STATE:
      return {...state, ...action.state};

    case _ACTION_TYPE_PREFIX + BaseViewTypes.SET_VALIDATED:
      return {...state, isValidated: true};

    default:
      return null;
  }
}


//*******************************************************************************
//ACTION CREATORS

export class BaseViewActions {
  //******* public actions

  resetState = () => {
    return {type: this._withPrefix(BaseViewTypes.RESET_STATE)};
  };

  setValidated = () => {
    return {type: this._withPrefix(BaseViewTypes.SET_VALIDATED)};
  };

  changeLanguage = language => {
    return {type: this._withPrefix(BaseViewTypes.CHANGE_LANGUAGE), language};
  };

  initializeView = () => {
    return async (dispatch, getState) => {
      await dispatch(this._initializeView_begin());

      //if query param is specified - we are going to edit existing item.
      //otherwise - add new item
      let query = getState().router.location.search;
      let params = serviceFuncs.parseQueryParams(query);
      let itemId = params[QUERY_PARAMS.itemId];
      if (itemId) {
        try {
          await dispatch(this.resetState());
          await dispatch(this._setState(itemId));
        } catch (e) {
          //if item not found
          dispatch(routing.goto_Page(this._TABLE_ROUTE));
        }
      } else {
        if (this._TABLE_ACTIONS_PROVIDER.ALLOW_ADD_ITEM)
          await dispatch(this.resetState());
        else dispatch(routing.goto_Page(this._TABLE_ROUTE));
      }
    };
  };

  // *** Edit fields

  changeName(value) {
    return {
      type: this._withPrefix(BaseViewTypes.CHANGE_NAME),
      value
    };
  }

  changeFirstName(value) {
    return {
      type: this._withPrefix(BaseViewTypes.CHANGE_FIRST_NAME),
      value
    };
  }

  changeLastName(value) {
    return {
      type: this._withPrefix(BaseViewTypes.CHANGE_LAST_NAME),
      value
    };
  }

  changeTitle(value) {
    return {
      type: this._withPrefix(BaseViewTypes.CHANGE_TITLE),
      value
    };
  }

  changeEmail(value) {
    return {
      type: this._withPrefix(BaseViewTypes.CHANGE_EMAIL),
      value
    };
  }

  changePassword(value) {
    return {
      type: this._withPrefix(BaseViewTypes.CHANGE_PASSWORD),
      value
    };
  }

  changePhone(value) {
    return {
      type: this._withPrefix(BaseViewTypes.CHANGE_PHONE),
      value
    };
  }

  changeSlug(value) {
    return {
      type: this._withPrefix(BaseViewTypes.CHANGE_SLUG),
      value
    };
  }

  changePriority(valueStr) {
    let value = 0;
    try {
      value = parseInt(valueStr);
      if (value < 0) value = 0;
    } catch (error) {
      value = 0;
    }

    return {
      type: this._withPrefix(BaseViewTypes.CHANGE_PRIORITY),
      value
    };
  }

  changeDetails(value) {
    return {
      type: this._withPrefix(BaseViewTypes.CHANGE_DETAILS),
      value
    };
  }

  changeDescription(value) {
    return {
      type: this._withPrefix(BaseViewTypes.CHANGE_DESCRIPTION),
      value
    };
  }

  changeText(value) {
    return {
      type: this._withPrefix(BaseViewTypes.CHANGE_TEXT),
      value
    };
  }

  changeInventoryNumber(value) {
    return {
      type: this._withPrefix(BaseViewTypes.CHANGE_INVENTORY_NUMBER),
      value
    };
  }

  changeModelName(value) {
    return {
      type: this._withPrefix(BaseViewTypes.CHANGE_MODEL_NAME),
      value
    };
  }

  changeManufacturerName(value) {
    return {
      type: this._withPrefix(BaseViewTypes.CHANGE_MANUFACTURER_NAME),
      value
    };
  }

  changeProductName(value) {
    return {
      type: this._withPrefix(BaseViewTypes.CHANGE_PRODUCT),
      value
    };
  }

  changeStatus(value) {
    return {
      type: this._withPrefix(BaseViewTypes.CHANGE_STATUS),
      value
    };
  }

  changeRole(value) {
    return {
      type: this._withPrefix(BaseViewTypes.CHANGE_ROLE),
      value
    };
  }

  changeRoleId(value) {
    return {
      type: this._withPrefix(BaseViewTypes.CHANGE_ROLE_ID),
      value
    };
  }

  changeImage(base64file) {
    let value = null;

    if (base64file)
      value = {
        src: base64file
      };

    return {
      type: this._withPrefix(BaseViewTypes.CHANGE_IMAGE),
      value
    };
  }

  changeMachineId(value) {
    return {
      type: this._withPrefix(BaseViewTypes.CHANGE_MACHINE_ID),
      value
    };
  }

  //address

  changeAddress_ContactPerson(value, addressFieldName = "address") {
    return {
      type: this._withPrefix(BaseViewTypes.CHANGE_ADDRESS_CONTACTPERSON),
      payload: {addressFieldName, value}
    };
  }

  changeAddress_Phone(value, addressFieldName = "address") {
    return {
      type: this._withPrefix(BaseViewTypes.CHANGE_ADDRESS_PHONE),
      payload: {addressFieldName, value}
    };
  }

  changeAddress_Coordinates(value, addressFieldName = "address") { // todo: delete?
    return {
      type: this._withPrefix(BaseViewTypes.CHANGE_ADDRESS_COORDINATES),
      payload: {addressFieldName, value}
    };
  }

  changeAddress_Latitude(value, addressFieldName = "address") {
    return {
      type: this._withPrefix(BaseViewTypes.CHANGE_ADDRESS_LATITUDE),
      payload: {addressFieldName, value}
    };
  }

  changeAddress_Longitude(value, addressFieldName = "address") {
    return {
      type: this._withPrefix(BaseViewTypes.CHANGE_ADDRESS_LONGITUDE),
      payload: {addressFieldName, value}
    };
  }

  changeAddress_Country(value, addressFieldName = "address") {
    return {
      type: this._withPrefix(BaseViewTypes.CHANGE_ADDRESS_COUNTRY),
      payload: {addressFieldName, value}
    };
  }

  changeAddress_State(value, addressFieldName = "address") {
    return {
      type: this._withPrefix(BaseViewTypes.CHANGE_ADDRESS_STATE),
      payload: {addressFieldName, value}
    };
  }

  changeAddress_City(value, addressFieldName = "address") {
    return {
      type: this._withPrefix(BaseViewTypes.CHANGE_ADDRESS_CITY),
      payload: {addressFieldName, value}
    };
  }

  changeAddress_Zip(value, addressFieldName = "address") {
    return {
      type: this._withPrefix(BaseViewTypes.CHANGE_ADDRESS_ZIP),
      payload: {addressFieldName, value}
    };
  }

  changeAddress_Street(value, addressFieldName = "address") {
    return {
      type: this._withPrefix(BaseViewTypes.CHANGE_ADDRESS_STREET),
      payload: {addressFieldName, value}
    };
  }

  changeAddress_Street2(value, addressFieldName = "address") {
    return {
      type: this._withPrefix(BaseViewTypes.CHANGE_ADDRESS_STREET2),
      payload: {addressFieldName, value}
    };
  }

  changeAddress_FirstName(value, addressFieldName = "address") {
    return {
      type: this._withPrefix(BaseViewTypes.CHANGE_ADDRESS_FIRSTNAME),
      payload: {addressFieldName, value}
    };
  }

  changeAddress_LastName(value, addressFieldName = "address") {
    return {
      type: this._withPrefix(BaseViewTypes.CHANGE_ADDRESS_LASTNAME),
      payload: {addressFieldName, value}
    };
  }

  changeAddress_Company(value, addressFieldName = "address") {
    return {
      type: this._withPrefix(BaseViewTypes.CHANGE_ADDRESS_COMPANY),
      payload: {addressFieldName, value}
    };
  }

  changeAddress_Email(value, addressFieldName = "address") {
    return {
      type: this._withPrefix(BaseViewTypes.CHANGE_ADDRESS_EMAIL),
      payload: {addressFieldName, value}
    };
  }

  // *** Update/Add
  updateItem = () => {
    return async (dispatch, getState) => {
      let stateSlice = this._getStateSlice(getState());

      let isCreateNew = this._isNewItem(stateSlice);
      let itemObj;

      try {
        //new object returned
        itemObj = this._validateView(stateSlice);
      } catch (e) {
        dispatch(this.setValidated());
        setTimeout(() => {
          dispatch(uiActions.ShowAlert(e, uiActions.ALERT_ERROR));
        }, 500);
        return;
      }
      dispatch(uiActions.showBackdrop(true));

      let warningMessage;
      try {
        if (isCreateNew)
          warningMessage = await this._API_PROVIDER.addItem(itemObj);
        else {
          warningMessage = await this._API_PROVIDER.updateItem(itemObj);
        }

        dispatch(uiActions.showBackdrop(false));

        if (warningMessage)
          setTimeout(() => {
            dispatch(
              uiActions.ShowAlert(warningMessage, uiActions.ALERT_WARNING)
            );
          }, 500);
      } catch (e) {
        dispatch(uiActions.showBackdrop(false));
        setTimeout(() => {
          dispatch(showException(e, false));
        }, 500);
        return;
      }

      await dispatch(this._TABLE_ACTIONS_PROVIDER.changeNeedCleanFetch(true));
      await dispatch(routing.goto_Page(this._TABLE_ROUTE));

      let message = "Item successfully updated";
      if (isCreateNew) message = "Item successfully created";

      //we need delay, because fetch after goto_Page clears alerts
      if (!warningMessage)
        setTimeout(() => {
          dispatch(uiActions.ShowAlert(message, uiActions.ALERT_SUCCESS));
        }, 500);
    };
  };

  initializeView_end = () => {
    return async function (dispatch, getState) {
      //implementation can be defined in the child
    };
  };

  //******* private actions

  _initializeView_begin = () => {
    return async function (dispatch, getState) {
      //implementation can be defined in the child
    };
  };

  _returnStateSlice = () => {
    return async (dispatch, getState) => {
      return this._getStateSlice(getState());
    };
  };

  _setState = itemId => {
    return async (dispatch, getState) => {
      dispatch(uiActions.showBackdrop(true));

      let newState = null;

      try {
        newState = JSON.parse(
          JSON.stringify(
            dataFuncs.getItemById(
              itemId,
              this._TABLE_ACTIONS_PROVIDER.getItems(getState())
            )
          )
        );

        dispatch(uiActions.showBackdrop(false));
      } catch (e) {
        dispatch(uiActions.showBackdrop(false));
        throw e;
      }

      dispatch({
        type: this._withPrefix(BaseViewTypes.SET_STATE),
        state: newState
      });
    };
  };

  ///------------------------------------------------------------------------------
  // ABSTRACT SERVICE FUNCS

  get _TABLE_ROUTE() {
    throw errorAbstractMethod;
  }

  get _TABLE_ACTIONS_PROVIDER() {
    throw errorAbstractMethod;
  }

  get _API_PROVIDER() {
    throw errorAbstractMethod;
  }

  get _ACTION_TYPE_PREFIX() {
    throw errorAbstractMethod;
  }

  _validateView(itemObj) {
    throw errorAbstractMethod;
  }

  _isNewItem(itemObj) {
    throw errorAbstractMethod;
  }

  _getStateSlice = state => {
    throw errorAbstractMethod;
  };

  ///------------------------------------------------------------------------------
  //PRIVATE SERVICE FUNCS

  _withPrefix = actionType => {
    return this._ACTION_TYPE_PREFIX + actionType;
  };
}
