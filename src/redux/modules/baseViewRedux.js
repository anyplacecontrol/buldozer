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

  //---For Address Panel
  static CHANGE_ADDRESS_COORDINATES = "CHANGE_ADDRESS_COORDINATES";
  static CHANGE_ADDRESS_LATITUDE = "CHANGE_ADDRESS_LATITUDE";
  static CHANGE_ADDRESS_LONGITUDE = "CHANGE_ADDRESS_LONGITUDE";
  static CHANGE_ADDRESS_COUNTRY = "CHANGE_ADDRESS_COUNTRY";
  static CHANGE_ADDRESS_STATE = "CHANGE_ADDRESS_STATE";
  static CHANGE_ADDRESS_CITY = "CHANGE_ADDRESS_CITY";
  static CHANGE_ADDRESS_ZIP = "CHANGE_ADDRESS_ZIP";
  static CHANGE_ADDRESS_STREET = "CHANGE_ADDRESS_STREET";
  static CHANGE_ADDRESS_CONTACTPERSON = "CHANGE_ADDRESS_CONTACTPERSON";
  static CHANGE_ADDRESS_PHONE = "CHANGE_ADDRESS_PHONE";
  static CHANGE_ADDRESS_STREET2 = "CHANGE_ADDRESS_STREET2"; //
  static CHANGE_ADDRESS_FIRSTNAME = "CHANGE_ADDRESS_FIRSTNAME"; //
  static CHANGE_ADDRESS_LASTNAME = "CHANGE_ADDRESS_LASTNAME"; //
  static CHANGE_ADDRESS_COMPANY = "CHANGE_ADDRESS_COMPANY"; //
  static CHANGE_ADDRESS_EMAIL = "CHANGE_ADDRESS_EMAIL"; //

  //--Fir Language buttons
  static CHANGE_LANGUAGE = "CHANGE_LANGUAGE";

  //--Different
  static CHANGE_NAME = "CHANGE_NAME";
  static CHANGE_FIRST_NAME = "CHANGE_FIRST_NAME";
  static CHANGE_LAST_NAME = "CHANGE_LAST_NAME";
  static CHANGE_TITLE = "CHANGE_TITLE";
  static CHANGE_EMAIL = "CHANGE_EMAIL";
  static CHANGE_PASSWORD = "CHANGE_PASSWORD";
  static CHANGE_PHONE = "CHANGE_PHONE";
  static CHANGE_DETAILS = "CHANGE_DETAILS";
  static CHANGE_INVENTORY_NUMBER = "CHANGE_INVENTORY_NUMBER";
  static CHANGE_MODEL_NAME = "CHANGE_MODEL_NAME";
  static CHANGE_SLUG = "CHANGE_SLUG";
  static CHANGE_DESCRIPTION = "CHANGE_DESCRIPTION";
  static CHANGE_TEXT = "CHANGE_TEXT";
  static CHANGE_PRIORITY = "CHANGE_PRIORITY";
  static CHANGE_IMAGE = "CHANGE_IMAGE";
  static CHANGE_MACHINE_ID = "CHANGE_MACHINE_ID";
  static CHANGE_PRODUCT = "CHANGE_PRODUCT";
  static CHANGE_STATUS = "CHANGE_STATUS";
  static CHANGE_ROLE = "CHANGE_ROLE";
  static CHANGE_ROLE_ID = "CHANGE_ROLE_ID";
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

    case _ACTION_TYPE_PREFIX + BaseViewTypes.CHANGE_LANGUAGE:
      return {...state, language: action.language};

    //---For Address Panel---
    case _ACTION_TYPE_PREFIX + BaseViewTypes.CHANGE_ADDRESS_CONTACTPERSON: {
      let oldAddressObj = {};
      if (state[action.payload.addressFieldName])
        oldAddressObj = state[action.payload.addressFieldName];

      return {
        ...state,
        [action.payload.addressFieldName]: {
          ...oldAddressObj,
          contactPerson: action.payload.value
        }
      };
    }

    case _ACTION_TYPE_PREFIX + BaseViewTypes.CHANGE_ADDRESS_COORDINATES: { // todo: delete?
      let oldAddressObj = {};
      if (state[action.payload.addressFieldName])
        oldAddressObj = state[action.payload.addressFieldName];

      return {
        ...state,
        [action.payload.addressFieldName]: {
          ...oldAddressObj,
          coordinates: action.payload.value
        }
      };
    }

    case _ACTION_TYPE_PREFIX + BaseViewTypes.CHANGE_ADDRESS_LATITUDE: { // todo: fix
      let oldAddressObj = {};
      if (state[action.payload.addressFieldName]) {
        oldAddressObj = state[action.payload.addressFieldName];
      }

      return {
        ...state,
        [action.payload.addressFieldName]: {
          ...oldAddressObj,
          coordinates: {
            latitude: action.payload.value,
            longitude: oldAddressObj.coordinates ? oldAddressObj.coordinates.longitude : null
          }
        }
      };
    }

    case _ACTION_TYPE_PREFIX + BaseViewTypes.CHANGE_ADDRESS_LONGITUDE: { // todo: fix
      let oldAddressObj = {};
      if (state[action.payload.addressFieldName]) {
        oldAddressObj = state[action.payload.addressFieldName];
      }

      return {
        ...state,
        [action.payload.addressFieldName]: {
          ...oldAddressObj,
          coordinates: {
            latitude: oldAddressObj.coordinates ? oldAddressObj.coordinates.latitude : null,
            longitude: action.payload.value
          }
        }
      };
    }

    case _ACTION_TYPE_PREFIX + BaseViewTypes.CHANGE_ADDRESS_COUNTRY: {
      let oldAddressObj = {};
      if (state[action.payload.addressFieldName])
        oldAddressObj = state[action.payload.addressFieldName];

      return {
        ...state,
        [action.payload.addressFieldName]: {
          ...oldAddressObj,
          country: action.payload.value
        }
      };
    }

    case _ACTION_TYPE_PREFIX + BaseViewTypes.CHANGE_ADDRESS_STATE: {
      let oldAddressObj = {};
      if (state[action.payload.addressFieldName])
        oldAddressObj = state[action.payload.addressFieldName];

      return {
        ...state,
        [action.payload.addressFieldName]: {
          ...oldAddressObj,
          state: action.payload.value
        }
      };
    }

    case _ACTION_TYPE_PREFIX + BaseViewTypes.CHANGE_ADDRESS_CITY: {
      let oldAddressObj = {};
      if (state[action.payload.addressFieldName])
        oldAddressObj = state[action.payload.addressFieldName];

      return {
        ...state,
        [action.payload.addressFieldName]: {
          ...oldAddressObj,
          city: action.payload.value
        }
      };
    }

    case _ACTION_TYPE_PREFIX + BaseViewTypes.CHANGE_ADDRESS_ZIP: {
      let oldAddressObj = {};
      if (state[action.payload.addressFieldName])
        oldAddressObj = state[action.payload.addressFieldName];

      return {
        ...state,
        [action.payload.addressFieldName]: {
          ...oldAddressObj,
          zip: action.payload.value
        }
      };
    }

    case _ACTION_TYPE_PREFIX + BaseViewTypes.CHANGE_ADDRESS_STREET: {
      let oldAddressObj = {};
      if (state[action.payload.addressFieldName])
        oldAddressObj = state[action.payload.addressFieldName];

      return {
        ...state,
        [action.payload.addressFieldName]: {
          ...oldAddressObj,
          address: action.payload.value
        }
      };
    }

    case _ACTION_TYPE_PREFIX + BaseViewTypes.CHANGE_ADDRESS_STREET2: {
      let oldAddressObj = {};
      if (state[action.payload.addressFieldName])
        oldAddressObj = state[action.payload.addressFieldName];

      return {
        ...state,
        [action.payload.addressFieldName]: {
          ...oldAddressObj,
          address_2: action.payload.value
        }
      };
    }

    case _ACTION_TYPE_PREFIX + BaseViewTypes.CHANGE_ADDRESS_PHONE: {
      let oldAddressObj = {};
      if (state[action.payload.addressFieldName])
        oldAddressObj = state[action.payload.addressFieldName];

      return {
        ...state,
        [action.payload.addressFieldName]: {
          ...oldAddressObj,
          phone: action.payload.value
        }
      };
    }

    case _ACTION_TYPE_PREFIX + BaseViewTypes.CHANGE_ADDRESS_FIRSTNAME: {
      let oldAddressObj = {};
      if (state[action.payload.addressFieldName])
        oldAddressObj = state[action.payload.addressFieldName];

      return {
        ...state,
        [action.payload.addressFieldName]: {
          ...oldAddressObj,
          firstName: action.payload.value
        }
      };
    }

    case _ACTION_TYPE_PREFIX + BaseViewTypes.CHANGE_ADDRESS_LASTNAME: {
      let oldAddressObj = {};
      if (state[action.payload.addressFieldName])
        oldAddressObj = state[action.payload.addressFieldName];

      return {
        ...state,
        [action.payload.addressFieldName]: {
          ...oldAddressObj,
          lastName: action.payload.value
        }
      };
    }

    case _ACTION_TYPE_PREFIX + BaseViewTypes.CHANGE_ADDRESS_COMPANY: {
      let oldAddressObj = {};
      if (state[action.payload.addressFieldName])
        oldAddressObj = state[action.payload.addressFieldName];

      return {
        ...state,
        [action.payload.addressFieldName]: {
          ...oldAddressObj,
          company: action.payload.value
        }
      };
    }

    case _ACTION_TYPE_PREFIX + BaseViewTypes.CHANGE_ADDRESS_EMAIL: {
      let oldAddressObj = {};
      if (state[action.payload.addressFieldName])
        oldAddressObj = state[action.payload.addressFieldName];

      return {
        ...state,
        [action.payload.addressFieldName]: {
          ...oldAddressObj,
          email: action.payload.value
        }
      };
    }

    //----different
    case _ACTION_TYPE_PREFIX + BaseViewTypes.CHANGE_NAME:
      return {...state, name: action.value};

    case _ACTION_TYPE_PREFIX + BaseViewTypes.CHANGE_FIRST_NAME:
      return {...state, firstName: action.value};

    case _ACTION_TYPE_PREFIX + BaseViewTypes.CHANGE_LAST_NAME:
      return {...state, lastName: action.value};

    case _ACTION_TYPE_PREFIX + BaseViewTypes.CHANGE_TITLE:
      return {...state, title: action.value};

    case _ACTION_TYPE_PREFIX + BaseViewTypes.CHANGE_EMAIL:
      return {...state, email: action.value};

    case _ACTION_TYPE_PREFIX + BaseViewTypes.CHANGE_PASSWORD:
      return {...state, password: action.value};

    case _ACTION_TYPE_PREFIX + BaseViewTypes.CHANGE_PHONE:
      return {...state, phone: action.value};

    case _ACTION_TYPE_PREFIX + BaseViewTypes.CHANGE_SLUG:
      return {...state, slug: action.value};

    case _ACTION_TYPE_PREFIX + BaseViewTypes.CHANGE_DETAILS:
      return {...state, details: action.value};

    case _ACTION_TYPE_PREFIX + BaseViewTypes.CHANGE_DESCRIPTION:
      return {...state, description: action.value};

    case _ACTION_TYPE_PREFIX + BaseViewTypes.CHANGE_TEXT:
      return {...state, text: action.value};

    case _ACTION_TYPE_PREFIX + BaseViewTypes.CHANGE_PRIORITY:
      return {...state, priority: action.value};

    case _ACTION_TYPE_PREFIX + BaseViewTypes.CHANGE_INVENTORY_NUMBER:
      return {...state, inventoryNumber: action.value};

    case _ACTION_TYPE_PREFIX + BaseViewTypes.CHANGE_MANUFACTURER_NAME: {
      let manufacturer = {};
      if (state.manufacturer) manufacturer = state.manufacturer;
      return {
        ...state,
        manufacturer: {...manufacturer, name: action.value}
      };
    }

    case _ACTION_TYPE_PREFIX + BaseViewTypes.CHANGE_PRODUCT: {
      let product = {};
      if (state.product) {
        product = state.product;
      }

      return {
        ...state,
        product: action.value
      };
    }

    case _ACTION_TYPE_PREFIX + BaseViewTypes.CHANGE_STATUS: {
      let status = {};
      if (state.status) {
        status = state.role;
      }

      return {
        ...state,
        status: action.value
      };
    }

    case _ACTION_TYPE_PREFIX + BaseViewTypes.CHANGE_ROLE: {
      let role = {};
      if (state.role) {
        role = state.role;
      }

      return {
        ...state,
        role: action.value
      };
    }

    case _ACTION_TYPE_PREFIX + BaseViewTypes.CHANGE_ROLE_ID: {
      return {
        ...state,
        roleId: action.value
      };
    }

    case _ACTION_TYPE_PREFIX + BaseViewTypes.CHANGE_MODEL_NAME: {
      let model = {};
      if (state.model) model = state.model;
      return {
        ...state,
        model: {...model, name: action.value}
      };
    }

    case _ACTION_TYPE_PREFIX + BaseViewTypes.CHANGE_IMAGE:
      return {...state, image: action.value};

    case _ACTION_TYPE_PREFIX + BaseViewTypes.CHANGE_MACHINE_ID:
      return {...state, machineId: action.value};

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
