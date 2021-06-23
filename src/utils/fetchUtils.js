import * as authApi from "../api/authApi";

export function throwFetchError(errorBody, response, url) {
  let errorObj = {
    errorMessage:
      errorBody && errorBody.errorMessage ? errorBody.errorMessage : errorBody,
    errorType: errorBody && errorBody.errorType ? errorBody.errorType : null,
    stackTrace: errorBody && errorBody.stackTrace ? errorBody.stackTrace : null,
    status: response && response.status ? response.status : null,
    statusText: response && response.statusText ? response.statusText : null,
    url
  };

  let errorAsString = JSON.stringify(errorObj);

  throw Error(errorAsString);
}

export async function handleFetchError(response) {
  if (!response.ok) {
    if (response.status === 403) {
      throw response;
    }

    let errorText = null;
    try {
      errorText = await response.text();
    } catch (e) {}
    if (errorText) throw errorText;

    if (response.statusText) throw response.statusText;
    else throw response;
  }
}

export async function fetchJSON(url, init) {
  let json;
  let response;
  let token;
  let method="";
  try {
    token = await authApi.getToken();

    let headers = {};
    if (init && init.headers) headers = init.headers;

    let newHeaders = {
      ...headers,
      Authorization: token
    };
    init = { ...init, headers: newHeaders };
    method = init.method || "GET";

    response = await fetch(url, init);
    await handleFetchError(response);

    let reader = response.clone().body.getReader();
    let result = null;

    while (!result || !result.done) {
      result = await reader.read();
    }

    //we only get here if there is no error
    json = await response.json();

    return json;
  } catch (err) {
    if (!token) {
      //Not Authorized
      window.location.replace("/");
      throw err;
    }

    let errorBody = null;
    try {
      errorBody = JSON.parse(err);
    } catch (e) {}

    if (!errorBody || !errorBody.errorMessage) {
      try {
        errorBody = await response.json();
      } catch (e) {
        if (err.message) {
          errorBody = { errorMessage: err.message };
          if (err.stack) errorBody.stackTrace = err.stack;

          if (!response) {
            //Probably token is invalid
            errorBody.errorMessage = "Authorization failed: " + err.message;
            //TODO: may be token has expired and we need to refresh it. Ot navigate to login page
          }
        }
      }
    }

    throwFetchError(errorBody, response, method + ":" + url);
  }
}

function ReplaceAll(Source, stringToFind, stringToReplace) {
  var temp = Source;
  var index = temp.indexOf(stringToFind);

  while (index != -1) {
    temp = temp.replace(stringToFind, stringToReplace);
    index = temp.indexOf(stringToFind);
  }

  return temp;
}

export function urlfy(obj) {
  let Json = JSON.stringify(obj);

  Json = ReplaceAll(Json, "{", "%7B");
  Json = ReplaceAll(Json, "}", "%7D");
  Json = ReplaceAll(Json, '"', "%22");
  Json = ReplaceAll(Json, "[", "%5B");
  Json = ReplaceAll(Json, "]", "%5D");
  Json = ReplaceAll(Json, "+", "%2B");

  return Json;
}
