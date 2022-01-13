import * as baseAPI from "./baseApi";
import * as constants from "../consts/constants";
import { fetchJSON, throwFetchError } from "../utils/fetchUtils.js";
import * as serviceFuncs from "../utils/serviceFunctions";

const budget_endPoint = "https://" + constants.apiDomain + "/budget/items";
const budgetFile_endPoint = "https://" + constants.apiDomain + "/budget/items-files";

//--------------------------------------------------------------------------------

export async function getItems(filter) {
  if (filter) {
    delete filter.notImplemented;
  }

  let result = await baseAPI.getFilteredItems(
    budget_endPoint,
    filter,
    0,
    1000,
    null,
    "",
    null
  );
  result.sections = result.json.data;
  result.totalSummary = result.json.totalSummary;

  return result;
}

//--------------------------------------------------------------------------------

export async function getItem(id) {
  
  let result = await baseAPI.getFilteredItems(
    budget_endPoint + "/" + id,
    null,
    0,
    1000,
    null,
    "",
    null
  );
  
  return result.json.data;
}

//--------------------------------------------------------------------------------
export async function addItem(Obj) {
  return await AddOrUpdateItem(Obj, budget_endPoint, "POST");
}

//--------------------------------------------------------------------------------

export async function updateItem(Obj) {
   let endPoint = budget_endPoint + "/" + Obj.id;
   return await AddOrUpdateItem(Obj, endPoint, "PUT");
}

//--------------------------------------------------------------------------------

export async function AddOrUpdateItem(Obj, endPoint, method) {
    if (!Obj) throwFetchError("argument Obj is empty", endPoint);
    if (constants.isFakeData) {
      await serviceFuncs.delayTime(constants.fakeDelay);
      return;
    }
   
    let response = await fetchJSON(endPoint, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(Obj)
    });
    return response;
}



export async function addFile(id, file) {

  var formData = new FormData();  
  formData.append("file", file);
  formData.append("budgetItemId", id);

  let response = await fetchJSON(budgetFile_endPoint, {
    method: "POST",
    headers: {
      Accept: "application/json",      
    },
    body: formData
  });

  return response;
}

export async function deleteFile(fileId) {
    
  let response = await fetchJSON(budgetFile_endPoint + "/" + fileId, {
    method: "DELETE",
    headers: {
      Accept: "application/json",      
    },  
  });

  return response;
}
//--------------------------------------------------------------------------------
