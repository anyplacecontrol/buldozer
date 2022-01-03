import * as baseAPI from "./baseApi";
import * as constants from "../consts/constants";
import { fetchJSON, throwFetchError } from "../utils/fetchUtils.js";
import * as serviceFuncs from "../utils/serviceFunctions";

const budget_endPoint = "https://" + constants.apiDomain + "/budget/items";
// const budgetAdd_endPoint =budget_endPoint;
// const budgetDelete_endPoint =budget_endPoint + "/"; //+{Id}
// const budgetUpdate_endPoint =budget_endPoint + "/"; //+{Id}
// const budgetImport_endPoint = "https://" + constants.apiDomain + "/imports/service-types"

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

  //DELETE this code
  let ind = 1;
  for (let i = 0; i < result.sections.length; i++) {
    for (let j = 0; j < result.sections[i].items.length; j++) {
      result.sections[i].items[j].id = ind;
      ind = ind + 1;
    }
  }
  return result;
}

//--------------------------------------------------------------------------------

export async function deleteItem(Obj) {
  //return await baseAPI.deleteItem(Obj.id, budgetDelete_endPoint);
}

//--------------------------------------------------------------------------------
export async function addItem(Obj) {
  // return await AddOrUpdateItem(Obj, budgetAdd_endPoint, "POST");
}

//--------------------------------------------------------------------------------

export async function updateItem(Obj) {
  // let endPoint = budgetUpdate_endPoint + Obj.id;
  // return await AddOrUpdateItem(Obj, endPoint, "PUT");
}

//--------------------------------------------------------------------------------

export async function AddOrUpdateItem(Obj, endPoint, method) {
  //   if (!Obj) throwFetchError("argument Obj is empty", endPoint);
  //   if (constants.isFakeData) {
  //     await serviceFuncs.delayTime(constants.fakeDelay);
  //     return;
  //   }
  //   let cleanObj = { ...Obj };
  //   delete cleanObj.id;
  //   delete cleanObj.isChecked;
  //   delete cleanObj.isValidated;
  //   delete cleanObj.rowNumber;
  //   delete cleanObj.createdUser;
  //   delete cleanObj.createdDate;
  //   let response = await fetchJSON(endPoint, {
  //     method: method,
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(cleanObj)
  //   });
  //   return null;
}

//--------------------------------------------------------------------------------
