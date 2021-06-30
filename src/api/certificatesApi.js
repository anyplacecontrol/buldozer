import { FAKE_CERTIFICATES_RESPONSE } from "../fakeDb/fakeCertificates";
import * as baseAPI from "./baseApi";
import { fetchJSON, throwFetchError } from "../utils/fetchUtils.js";
import * as constants from "../consts/constants";
import * as serviceFuncs from "../utils/serviceFunctions";

const certificates_endPoint =
  "https://" + constants.apiDomain + "/certification-cards";
const certificateAdd_endPoint = certificates_endPoint;
const certificateDelete_endPoint = certificates_endPoint + "/"; //+{Id}
const certificateUpdate_endPoint = certificates_endPoint + "/"; //+{Id}

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

export async function deleteItem(certObj) {
  return await baseAPI.deleteItem(certObj.id, certificateDelete_endPoint);
}

//--------------------------------------------------------------------------------
export async function addItem(certObj) {
  return await AddOrUpdateItem(certObj, certificateAdd_endPoint, "POST");
}

//--------------------------------------------------------------------------------

export async function updateItem(certObj) {
  let endPoint = certificateUpdate_endPoint + certObj.id;
  return await AddOrUpdateItem(certObj, endPoint, "PUT");
}

//--------------------------------------------------------------------------------

export async function AddOrUpdateItem(certObj, endPoint, method) {
  if (!certObj) throwFetchError("argument certObj is empty", endPoint);

  if (constants.isFakeData) {
    await serviceFuncs.delayTime(constants.fakeDelay);
    return;
  }

  let cleanCert = { ...certObj };
  delete cleanCert.recipient;
  delete cleanCert.serviceType;
  delete cleanCert.issuingRestaurant;
  delete cleanCert.redeemerRestaurant;
  delete cleanCert.isChecked;
  delete cleanCert.isValidated;
  delete cleanCert.createdUser;
  delete cleanCert.createdDate;
  delete cleanCert.activeToDate;

  cleanCert.recipientId = certObj.recipient ? certObj.recipient.id : null;
  cleanCert.serviceTypeId = certObj.serviceType ? certObj.serviceType.id : null;
  cleanCert.issuingRestaurantId = certObj.issuingRestaurant
    ? certObj.issuingRestaurant.id
    : null;
  cleanCert.redeemerRestaurantId = certObj.redeemerRestaurant
    ? certObj.redeemerRestaurant.id
    : null;

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
