import { FAKE_RECIPIENTS, FAKE_RECIPIENTS_RESPONSE } from "../fakeDb/fakeRecipients";
import * as baseAPI from "./baseApi";
import { fetchJSON, throwFetchError } from "../utils/fetchUtils.js";
import * as constants from "../consts/constants";
import * as serviceFuncs from "../utils/serviceFunctions";

const recipients_endPoint = "https://" + constants.apiDomain + "/recipients";
const recipientsAdd_endPoint = recipients_endPoint;
const recipientsDelete_endPoint = recipients_endPoint + "/"; //+{Id}
const recipientsUpdate_endPoint = recipients_endPoint + "/"; //+{Id}

//--------------------------------------------------------------------------------

export async function getItems(
  filter,
  topRowNumber,
  itemsPerPage,
  sortBy = null,
  sortOrder = "descending"
) {
  delete filter.notImplemented;

  if (filter.isActive === "true") filter.isActive = true;
  if (filter.isActive === "false") filter.isActive = false;

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

export async function deleteItem(kioskObj) {}

//--------------------------------------------------------------------------------
export async function addItem(kioskObj) {}

//--------------------------------------------------------------------------------

export async function updateItem(kioskObj) {}

//--------------------------------------------------------------------------------

export async function AddOrUpdateItem(kioskObj, endPoint, method) {}
