import { FAKE_CARDS_RESPONSE } from "../fakeDb/fakeCards";
import * as baseAPI from "./baseApi";
import { fetchJSON, throwFetchError } from "../utils/fetchUtils.js";
import * as constants from "../consts/constants";
import * as serviceFuncs from "../utils/serviceFunctions";

const cards_endPoint =
  "https://" + constants.apiDomain + "/cards";
const cardAdd_endPoint = cards_endPoint;
const cardDelete_endPoint = cards_endPoint + "/"; //+{Id}
const cardUpdate_endPoint = cards_endPoint + "/"; //+{Id}

const cardsImport_endPoint =  "https://" + constants.apiDomain + "/imports/cards"

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
    cards_endPoint,
    filter,
    topRowNumber,
    itemsPerPage,
    sortBy,
    sortOrder,
    FAKE_CARDS_RESPONSE
  );
 
  return result;
}

//--------------------------------------------------------------------------------

export async function getItem(id) {
  let endpoint = cards_endPoint + "/" + id;
  let Json = await fetchJSON(endpoint);
  if (!Json.data) throwFetchError("Data is empty", null, endpoint);
  let result = Json.data;
  return result;
}

//--------------------------------------------------------------------------------

export async function deleteItem(cardObj) {
  return await baseAPI.deleteItem(cardObj.id, cardDelete_endPoint);
}

//--------------------------------------------------------------------------------
export async function addItem(cardObj) {
  return await AddOrUpdateItem(cardObj, cardAdd_endPoint, "POST");
}

//--------------------------------------------------------------------------------

export async function updateItem(cardObj) {
  let endPoint = cardUpdate_endPoint + cardObj.id;
  return await AddOrUpdateItem(cardObj, endPoint, "PUT");
}

//--------------------------------------------------------------------------------

export async function AddOrUpdateItem(cardObj, endPoint, method) {
  if (!cardObj) throwFetchError("argument cardObj is empty", endPoint);

  if (constants.isFakeData) {
    await serviceFuncs.delayTime(constants.fakeDelay);
    return;
  }

  let cleanCert = { ...cardObj };
  delete cleanCert.recipient;  
  delete cleanCert.isChecked;
  delete cleanCert.isValidated;
  delete cleanCert.createdUser;
  delete cleanCert.createdDate;
  delete cleanCert.cardificates;  

  cleanCert.recipientId = cardObj.recipient ? cardObj.recipient.id : null;  
  
  let response = await fetchJSON(endPoint, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(cleanCert)
  });

  return null;
}

//--------------------------------------------------------------------------------

export async function Import(file) {

  let response = await fetchJSON(cardsImport_endPoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "text/csv"
    },
    body: JSON.stringify({file: file})
  });

  return response;
}