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
  for (let i = 0; i < result.items.length; i++) {
    result.items[i].password = "******";
  }

  return result;
}

//--------------------------------------------------------------------------------

export async function deleteItem(Obj) {
  return await baseAPI.deleteItem(Obj.id, usersDelete_endPoint);
}

//--------------------------------------------------------------------------------
export async function addItem(Obj) {
  return await AddOrUpdateItem(Obj, usersAdd_endPoint, "POST");
}

//--------------------------------------------------------------------------------

export async function updateItem(Obj) {
  let endPoint = usersUpdate_endPoint + Obj.id;
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
  cleanObj.roleId  = Obj.role.id;

  let recipientsIds = cleanObj.recipients.map((value) => value.id);

  cleanObj.recipientsIds  = recipientsIds;

  delete cleanObj.id;
  delete cleanObj.isChecked;
  delete cleanObj.isValidated;
  delete cleanObj.rowNumber;
  delete cleanObj.createdUser;
  delete cleanObj.createdDate;
  delete cleanObj.role;
  delete cleanObj.recipients;
  if (Obj.createdUser) {
    delete delete cleanObj.password;
  }

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
