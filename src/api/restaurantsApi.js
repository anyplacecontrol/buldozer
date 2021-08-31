import { FAKE_RESTAURANTS_RESPONSE } from "../fakeDb/fakeRestaurants";
import * as baseAPI from "./baseApi";
import { fetchJSON, throwFetchError } from "../utils/fetchUtils.js";
import * as constants from "../consts/constants";
import * as serviceFuncs from "../utils/serviceFunctions";

const restaurants_endPoint = "https://" + constants.apiDomain + "/restaurants";
const restaurantsAdd_endPoint = restaurants_endPoint;
const restaurantsDelete_endPoint = restaurants_endPoint + "/"; //+{Id}
const restaurantsUpdate_endPoint = restaurants_endPoint + "/"; //+{Id}
const restaurantsImport_endPoint = "https://" + constants.apiDomain + "/imports/restaurants"

//--------------------------------------------------------------------------------

export async function getItems(
  filter,
  topRowNumber,
  itemsPerPage,
  sortBy = null,
  sortOrder = "descending"
) {
  if (filter)
    delete filter.notImplemented;
    
  let result = await baseAPI.getFilteredItems(
    restaurants_endPoint,
    filter,
    topRowNumber,
    itemsPerPage,
    sortBy,
    sortOrder,
    FAKE_RESTAURANTS_RESPONSE
  );
  return result;
}

//--------------------------------------------------------------------------------

export async function getItem(id) {
  let endpoint = restaurants_endPoint + "/" + id;
  let Json = await fetchJSON(endpoint);
  if (!Json.data) throwFetchError("Data is empty", null, endpoint);
  let result = Json.data;
  return result;
}

//--------------------------------------------------------------------------------

export async function deleteItem(Obj) {
  return await baseAPI.deleteItem(Obj.id, restaurantsDelete_endPoint);
}

//--------------------------------------------------------------------------------
export async function addItem(Obj) {
  return await AddOrUpdateItem(Obj, restaurantsAdd_endPoint, "POST");
}

//--------------------------------------------------------------------------------

export async function updateItem(Obj) {  
  let endPoint = restaurantsUpdate_endPoint + Obj.id;
  return await AddOrUpdateItem(Obj, endPoint, "PUT");
}

//--------------------------------------------------------------------------------

export async function AddOrUpdateItem(Obj, endPoint, method) {
  if (!Obj) throwFetchError("argument Obj is empty", endPoint);

  if (constants.isFakeData) {
    await serviceFuncs.delayTime(constants.fakeDelay);
    return;
  }

  let cleanObj = { ...Obj };
  //delete cleanObj.id;
  delete cleanObj.isChecked;
  delete cleanObj.isValidated;    
  delete cleanObj.rowNumber;
  delete cleanObj.createdUser;  
  delete cleanObj.createdDate;

  let response = await fetchJSON(endPoint, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(cleanObj)
  });

  return null;
}

//--------------------------------------------------------------------------------

export async function Import(file) {

  var formData = new FormData();  
  formData.append("file", file);

  let response = await fetchJSON(restaurantsImport_endPoint, {
    method: "POST",
    headers: {
      Accept: "application/json",      
    },
    body: formData
  });

  return response.success;
}