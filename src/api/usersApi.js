import { FAKE_USERS, FAKE_USERS_RESPONSE } from "../fakeDb/fakeUsers";
import * as baseAPI from "./baseApi";
import { fetchJSON, throwFetchError } from "../utils/fetchUtils.js";
import * as constants from "../consts/constants";
import * as serviceFuncs from "../utils/serviceFunctions";

const users_endPoint = "https://" + constants.apiDomain + "/users";
const usersAdd_endPoint = users_endPoint;
const usersDelete_endPoint = users_endPoint + "/"; //+{id}
const usersUpdate_endPoint = users_endPoint + "/"; //+{id}

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
    users_endPoint,
    filter,
    topRowNumber,
    itemsPerPage,
    sortBy,
    sortOrder,
    FAKE_USERS_RESPONSE
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
