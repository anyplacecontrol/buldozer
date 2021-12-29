import { FAKE_SERVICE_TYPES_RESPONSE } from "../fakeDb/fakeServiceTypes";
import * as baseAPI from "./baseApi";
import * as constants from "../consts/constants";
import { fetchJSON, throwFetchError } from "../utils/fetchUtils.js";
import * as serviceFuncs from "../utils/serviceFunctions";

const expenseCategories_endPoint =
  "https://" + constants.apiDomain + "/budget/expense-categories";
const expenseCategoriesAdd_endPoint =expenseCategories_endPoint;
const expenseCategoriesDelete_endPoint =expenseCategories_endPoint + "/"; //+{Id}
const expenseCategoriesUpdate_endPoint =expenseCategories_endPoint + "/"; //+{Id}  

//--------------------------------------------------------------------------------

export async function getItems(
  filter,
  topRowNumber,
  itemsPerPage,
  sortBy = null,
  sortOrder = "descending"
) {
  if (filter) {
    delete filter.notImplemented;
  }

  let result = await baseAPI.getFilteredItems(
    expenseCategories_endPoint,
    filter,
    topRowNumber,
    itemsPerPage,
    sortBy,
    sortOrder,
    FAKE_SERVICE_TYPES_RESPONSE
  );
  return result;
}


//--------------------------------------------------------------------------------

export async function deleteItem(Obj) {
  return await baseAPI.deleteItem(Obj.id, expenseCategoriesDelete_endPoint);
}

//--------------------------------------------------------------------------------
export async function addItem(Obj) {
  return await AddOrUpdateItem(Obj, expenseCategoriesAdd_endPoint, "POST");
}

//--------------------------------------------------------------------------------

export async function updateItem(Obj) {  
  let endPoint = expenseCategoriesUpdate_endPoint + Obj.id;
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
  delete cleanObj.id;
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
