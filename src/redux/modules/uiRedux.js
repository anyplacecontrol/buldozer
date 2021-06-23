import PropTypes from "prop-types";

const PREFIX = "ui/";
const RESET_STATE = PREFIX + "RESET_STATE";
const CHANGE_IS_LOADING = PREFIX + "CHANGE_IS_LOADING";
const TOGGLE_HAMBURGER_BUTTON = PREFIX + "TOGGLE_HAMBURGER_BUTTON";
const TOGGLE_SIDEBAR = PREFIX + "TOGGLE_SIDEBAR";
const CHANGE_ALERT = PREFIX + "CHANGE_ALERT";
const TOGGLE_FILTER_VISIBILITY = PREFIX + "TOGGLE_FILTER_VISIBILITY";
const CHANGE_ITEMS_PER_PAGE = PREFIX + "CHANGE_ITEMS_PER_PAGE";

//-----------------------------------
export const IAlert = PropTypes.shape({
  text: PropTypes.string.isRequired,
  kind: PropTypes.string.isRequired
});

export const ALERT_INFO = "ALERT_INFO";
export const ALERT_ERROR = "ALERT_ERROR";
export const ALERT_SUCCESS = "ALERT_SUCCESS";
export const ALERT_WARNING = "ALERT_WARNING";

//-----------------------------------
export const uiInitialState = {
  itemsPerPage: 30, //quantity of items per page to display lists
  alert: { text: "", kind: "" }, //message displayed in the panel on the top of table
  isLoading: false,
  isHamburgerButtonPressed: false,
  isSidebarMinimized: false,
  isFilterVisible: false
};

//----------------------------------------
export default function reducer(state = uiInitialState, action = {}) {
  switch (action.type) {
    case RESET_STATE: {
      return {
        ...uiInitialState
      };
    }

    case CHANGE_ITEMS_PER_PAGE: {
      return {
        ...state, itemsPerPage: action.value
      }
    }

    case CHANGE_ALERT: {
      return { ...state, alert: action.alert };
    }

    case TOGGLE_HAMBURGER_BUTTON: {
      return {
        ...state,
        isHamburgerButtonPressed: !state.isHamburgerButtonPressed
      };
    }

    case TOGGLE_FILTER_VISIBILITY: {
      return { ...state, isFilterVisible: !state.isFilterVisible };
    }

    case CHANGE_IS_LOADING: {
      return { ...state, isLoading: action.value };
    }

    case TOGGLE_SIDEBAR: {
      return { ...state, isSidebarMinimized: !state.isSidebarMinimized };
    }

    default:
      return state;
  }
}

//**********************************************************************************
//ACTIONS

export function resetState() {
  return { type: RESET_STATE };
}

export function changeItemsPerPage(value) {
  return { type: CHANGE_ITEMS_PER_PAGE, value };
}

export function ShowAlert(text, kind, isStandardAlert = false) {
  return async dispatch => {
    if (text.message)
      text = text.message;    
    if (isStandardAlert) alert(text);
    else {
      window.scrollTo(0, 0);
      return dispatch({
        type: CHANGE_ALERT,
        alert: {
          text,
          kind
        }
      });
    }
  };
}

export function HideAlert() {
  return async (dispatch, getState) => {

    dispatch({
      type: CHANGE_ALERT,
      alert: {
        text: "",
        kind: ""
      }
    });
  };
}

export function toggleHamburgerButton() {
  return { type: TOGGLE_HAMBURGER_BUTTON };
}

export function toggleSidebar() {
  return { type: TOGGLE_SIDEBAR };
}

export function toggleFilterVisibility() {
  return { type: TOGGLE_FILTER_VISIBILITY };
}

export function showBackdrop(isVisible) {
  return {
    type: CHANGE_IS_LOADING,
    value: isVisible
  };
}
 