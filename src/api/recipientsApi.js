import {  
  FAKE_RECIPIENTS_RESPONSE
} from "../fakeDb/fakeRecipients";
import * as baseAPI from "./baseApi";
import { fetchJSON, throwFetchError } from "../utils/fetchUtils.js";
import * as constants from "../consts/constants";
import * as serviceFuncs from "../utils/serviceFunctions";

const recipients_endPoint = "https://" + constants.apiDomain + "/recipients";
const recipientsAdd_endPoint = recipients_endPoint;
const recipientsDelete_endPoint = recipients_endPoint + "/"; //+{Id}
const recipientsUpdate_endPoint = recipients_endPoint + "/"; //+{Id}
const recipientsImport_endPoint = "https://" + constants.apiDomain + "/imports/recipients"

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

    if (filter.isActive === "true") filter.isActive = true;
    if (filter.isActive === "false") filter.isActive = false;
  }

  let result = await baseAPI.getFilteredItems(
    recipients_endPoint,
    filter,
    topRowNumber,
    itemsPerPage,
    sortBy,
    sortOrder,
    FAKE_RECIPIENTS_RESPONSE
  );
  return result;
}

//--------------------------------------------------------------------------------

export async function deleteItem(Obj) {
  return await baseAPI.deleteItem(Obj.id, recipientsDelete_endPoint);
}

//--------------------------------------------------------------------------------
export async function addItem(Obj) {
  return await AddOrUpdateItem(Obj, recipientsAdd_endPoint, "POST");
}

//--------------------------------------------------------------------------------

export async function updateItem(Obj) {
  let endPoint = recipientsUpdate_endPoint + Obj.id;
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
  delete cleanObj.isChecked;
  delete cleanObj.isValidated;    
  delete cleanObj.rowNumber;
  delete cleanObj.createdUser;  
  delete cleanObj.createdDate;

  await fetchJSON(endPoint, {
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

  let response = await fetchJSON(recipientsImport_endPoint, {
    method: "POST",
    headers: {
      Accept: "application/json",      
    },
    body: formData
  });

  return response.success;
}