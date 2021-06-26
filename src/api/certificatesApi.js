import { FAKE_CERTIFICATES_RESPONSE } from "../fakeDb/fakeCertificates";
import * as baseAPI from "./baseApi";
import { fetchJSON, throwFetchError } from "../utils/fetchUtils.js";
import * as constants from "../consts/constants";
import * as serviceFuncs from "../utils/serviceFunctions";

const certificates_endPoint = "https://" + constants.apiDomain + "/certification-cards";
const certificatesAdd_endPoint = certificates_endPoint;
const certificatesDelete_endPoint = certificates_endPoint + "/"; //+{kioskId}
const certificatesUpdate_endPoint = certificates_endPoint + "/"; //+{kioskId}

//--------------------------------------------------------------------------------

export async function getItems(
  filter,
  topRowNumber,
  itemsPerPage,
  sortBy = null,
  sortOrder = "descending"
) {
  delete filter.notImplemented;

  if (filter.isActive === "true")
    filter.isActive = true;
  if (filter.isActive === "false")
    filter.isActive = false;  

  let result = await baseAPI.getFilteredItems(
    certificates_endPoint,
    filter,
    topRowNumber,
    itemsPerPage,
    sortBy,
    sortOrder,
    FAKE_CERTIFICATES_RESPONSE
  );
  return result;
}

//--------------------------------------------------------------------------------

export async function deleteItem(kioskObj) {
  // return await baseAPI.deleteItem(kioskObj.id, kioskDelete_endPoint);  
}

//--------------------------------------------------------------------------------
export async function addItem(kioskObj) {
  // return await AddOrUpdateItem(kioskObj, kioskAdd_endPoint, "POST");
}

//--------------------------------------------------------------------------------

export async function updateItem(kioskObj) {  
  // let endPoint = kioskUpdate_endPoint + kioskObj.id;
  // return await AddOrUpdateItem(kioskObj,endPoint,"PUT");
}

//--------------------------------------------------------------------------------

export async function AddOrUpdateItem(kioskObj, endPoint, method) {  
  // if (!kioskObj)
  //   throwFetchError("argument kioskObj is empty", endPoint);

  // if (constants.isFakeData) {
  //   await serviceFuncs.delayTime(constants.fakeDelay);
  //   return;
  // }  

  // let cleanKiosk = {...kioskObj};
  // delete cleanKiosk.prevAddress;
  // delete cleanKiosk.prevManufacturer;
  // delete cleanKiosk.prevModel;
  // delete cleanKiosk.address;
  // delete cleanKiosk.manufacturer;
  // delete cleanKiosk.model;

  // // Modify Kiosk
  // let response = await fetchJSON(endPoint, {
  //   method: method,
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify(cleanKiosk)
  // });

  
  // //TODO: model, manufacturer
  // let isManufacturerChangeSuccess = true;
  // let isModelChangeSuccess = true;

  // let what = "";  
  //   if (!isManufacturerChangeSuccess) what = what + "manufacturer, ";
  // if (!isModelChangeSuccess) what = what + "model, ";

  // let action = (method === 'POST' ? "created": "updated");
  // if (what != "") return "Kiosk was " + action + ", but unable to modify " + what;
  // else return null;

}
