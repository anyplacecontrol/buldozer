import {fetchJSON, throwFetchError, handleFetchError} from "../utils/fetchUtils.js";
import * as constants from "../consts/constants";
import * as serviceFuncs from "../utils/serviceFunctions";

const signin_endPoint =
  "https://" + constants.apiDomain + "/auth/login";
const myUser_endPoint =
  "https://" + constants.apiDomain + "/auth/me";

  window.authData = null;  
  
//--------------------------------------------------------------------------
function saveToken(authData) {
  window.authData = authData;

  //duration of token in seconds - 30 seconds
  let tokenDuration = 7 * 24 *60 *60 * 1000; //неделя в миллисекундах
    //window.authData.idToken.payload.exp -
    //window.authData.idToken.payload.auth_time -
    //30;
  let timeObject = new Date();

  //calculate expiration DateTime
  window.authData.expirationMoment = new Date(
    timeObject.getTime() + tokenDuration
  );

  if (typeof Storage !== "undefined") {
    localStorage.setItem("authData", JSON.stringify(window.authData));
  }
}

//--------------------------------------------------------------------------

export async function login(email, password) {
  window.authData = null;
  let response;

  try {
    response = await fetch(signin_endPoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email, //"admin@test.com"
        password: password //"12345678"
      })
    });

    await handleFetchError(response);
  } catch (err) {
    let errorBody = null;
    try {
      errorBody = JSON.parse(err);
    } catch (e) {
      //
    }

    if (!errorBody || !errorBody.errorMessage) {
      try {
        errorBody = await response.json();
      } catch (e) {
        if (err.message) {
          errorBody = {errorMessage: err.message};
          if (err.stack) {
            errorBody.stackTrace = err.stack;
          }
        }
      }
    }
    throwFetchError(errorBody, response, signin_endPoint);
  }

  let json = await response.json();

  saveToken(json);

  return window.authData.accessToken;
}


//-------------------------------------------------------------------------------
export async function getToken() {
  if (typeof Storage !== "undefined") {
    let json = localStorage.getItem("authData");
    try {
      window.authData = JSON.parse(json);
      window.authEmail = localStorage.getItem("authEmail");
    } catch (e) {
      //
    }
  }

  //check if token expired
  if (window.authData) {
    let expireDate = new Date(window.authData.expirationMoment);
    let currentDate = new Date();

    if (expireDate > currentDate) {
      return window.authData.accessToken;
    } 
  }

  if (window.location.pathname !== "/") {
    window.location.replace("/");
    throw "Not Authorized";
  }
}

//--------------------------------------------------------------------
export async function getMyUser() {
  window.myUser = null;  

  let Json = await fetchJSON(myUser_endPoint);
  if (!Json) {
    throwFetchError("Body is empty", null, myUser_endPoint);
  }

  window.myUser = Json.user;
}
