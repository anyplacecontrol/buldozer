import { ROUTE_NAMES, QUERY_PARAMS } from "../../consts/routeNames";
import { push, goBack } from "connected-react-router";
import { withoutQueryParams } from "../../utils/serviceFunctions";
import * as uiActions from "./uiRedux";
import { MAIN_MENU_ITEMS } from "../../consts/mainMenuItems";

const PREFIX = "routing/";
const RESET_STATE = PREFIX + "RESET_STATE";
const CHANGE_WAS_GOBACK = PREFIX + "CHANGE_WAS_GOBACK";

export const routingInitialState = {
  wasGoBack: false
};

export default function reducer(state = routingInitialState, action = {}) {
  switch (action.type) {
    case RESET_STATE:
      return { ...routingInitialState };

    case CHANGE_WAS_GOBACK:
      return { ...state, wasGoBack: action.value };
    default:
      return state;
  }
}

//*******************************************************************************
// action Creators

export function resetState() {
  return { type: RESET_STATE };
}

function setWasGoBack() {
  return {
    type: CHANGE_WAS_GOBACK,
    value: true
  };
}

export function resetWasGoBack() {
  return {
    type: CHANGE_WAS_GOBACK,
    value: false
  };
}

//-------------------------------------------------------------------------------------
//GoTo other Pages

export function goto_Page(path) {
  return async function(dispatch) {
    await dispatch(uiActions.HideAlert());
    await dispatch(resetWasGoBack());
    await dispatch(push(path));

    //Scroll to top for some pages
    window.scrollTo(0, 0);
  };
}

export function goto_Back() {
  return async function(dispatch) {
    await dispatch(uiActions.HideAlert());
    await dispatch(setWasGoBack(true));
    dispatch(goBack());
  };
}

//--------------------------------------------------------------------------
// Any table Item
export function goto_AddItem(routePath) {
  return async function(dispatch) {
    dispatch(goto_Page(routePath));
  };
}

export function goto_EditItem(routePath, itemId) {
  return async function(dispatch) {
    dispatch(goto_Page(routePath + "?" + QUERY_PARAMS.itemId + "=" + itemId));
  };
}

//*******************************************************************************
//SELECTORS

export function getHeader(state) {
  let currentPath = state.router.location.pathname;
  for (let i = 0; i < MAIN_MENU_ITEMS.length; i++) {
    let itemName = MAIN_MENU_ITEMS[i].name;
    let comment = MAIN_MENU_ITEMS[i].comment;

    if (MAIN_MENU_ITEMS[i].items) {
      for (let j = 0; j < MAIN_MENU_ITEMS[i].items.length; j++) {
        if (MAIN_MENU_ITEMS[i].items[j].path === currentPath) {
          return {
            name: MAIN_MENU_ITEMS[i].items[j].name,
            comment: MAIN_MENU_ITEMS[i].items[j].comment
          };
        }
      }
    }

    if (MAIN_MENU_ITEMS[i].path === currentPath)
      return { name: itemName, comment };
  }
}
