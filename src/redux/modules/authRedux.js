import * as uiRedux from "./uiRedux";
import * as routingRedux from "./routingRedux";
import { ROUTE_NAMES } from "../../consts/routeNames";
import * as authApi from "../../api/authApi";
import { AUTH_INACTIVITY_TIME } from "../../consts/constants";

//*******************************************************************************
//ACTION CREATORS

export function login(email, password) {
  return async (dispatch, getState) => {
    dispatch(uiRedux.showBackdrop(true));

    try {
      await authApi.login(email, password);

      // remember email
      window.authEmail = email;
      if (typeof Storage !== "undefined") {
        localStorage.setItem("authEmail", window.authEmail);
      }          

      // redirect to dashboard
      dispatch(routingRedux.goto_Page(ROUTE_NAMES.certificates));
    } catch (err) {
      console.error(err);

      let message = err.message;
      try {
        message = JSON.parse(err.message);
        if (!message.errorMessage) {
          message = err.message;
        }
      } catch (e) {
        //
      }

      if (message.status === 401) {        
        alert(message.errorMessage.message || message);
      }
    } finally {
      dispatch(uiRedux.showBackdrop(false));
    }
  };
}

//------------------------------------------------------------------------

export function logOut() {
  return async (dispatch, getState) => {
    try {
      window.authEmail = "";
      window.authData = "";
      if (typeof Storage !== "undefined") {
        localStorage.setItem("authEmail", "");
        localStorage.setItem("authData", "");
      }
    } catch (err) {
      //
    }

    window.location.replace("/");
  };
}

export function start_monitorClicks_Timer() {
  return async function(dispatch, getState) {
    setInterval(() => {
      if (!window.lastClick) return;

      const currentTime = new Date().getTime();
      if (currentTime - window.lastClick > AUTH_INACTIVITY_TIME) {
        window.lastClick = currentTime;
        dispatch(logOut());
      }
    }, 3000);
  };
}
