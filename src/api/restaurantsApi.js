import { FAKE_RESTAURANTS } from "../fakeDb/fakeRestaurants";
import * as baseAPI from "./baseApi";
import { fetchJSON, throwFetchError } from "../utils/fetchUtils.js";
import * as constants from "../consts/constants";
import * as serviceFuncs from "../utils/serviceFunctions";

const restaurants_endPoint = "https://" + constants.apiDomain + "/restaurants";
const restaurantsAdd_endPoint = restaurants_endPoint;
const restaurantsDelete_endPoint = restaurants_endPoint + "/"; //+{kioskId}
const restaurantsUpdate_endPoint = restaurants_endPoint + "/"; //+{kioskId}

//--------------------------------------------------------------------------------

export async function getItems(
  filter,
  topRowNumber,
  itemsPerPage,
  sortBy = null,
  sortOrder = "descending"
) {
  delete filter.notImplemented;
    
  let result = await baseAPI.getFilteredItems(
    restaurants_endPoint,
    filter,
    topRowNumber,
    itemsPerPage,
    sortBy,
    sortOrder,
    FAKE_RESTAURANTS
  );
  return result;
}

//--------------------------------------------------------------------------------

export async function deleteItem(kioskObj) {
 
}

//--------------------------------------------------------------------------------
export async function addItem(kioskObj) {
 
}

//--------------------------------------------------------------------------------

export async function updateItem(kioskObj) {  
 
}

//--------------------------------------------------------------------------------

export async function AddOrUpdateItem(kioskObj, endPoint, method) {  
}
