import { fetchJSON, throwFetchError, urlfy } from "../utils/fetchUtils.js";
import * as constants from "../consts/constants";
import * as serviceFuncs from "../utils/serviceFunctions";
import { isEmpty } from "../utils/serviceFunctions";

export async function getFilteredItems(
  endpoint,
  filter = null,
  topRowNumber = 0,
  itemsPerPage = 0, // <=0: no limit
  sortBy = null,
  sortOrder = "descending",
  FAKE_DATA
) {
  if (constants.isFakeData) {
    await serviceFuncs.delayTime(constants.fakeDelay);
    if (FAKE_DATA) return JSON.parse(JSON.stringify(FAKE_DATA));
    else
      return {
        items: [],
        topRowNumber: 0,
        count: 0
      };
  }

  let req = endpoint + "?" + "offset=" + topRowNumber;

  if (itemsPerPage > 0) req = req + "&limit=" + itemsPerPage;

  if (filter && !isEmpty(filter)) req = req + "&filter=" + urlfy(filter);

  if (sortBy) {
    if (!sortBy.accessorSort || sortBy.accessorSort === "")
      throwFetchError("sortBy.accessorSort is not specified", null, endpoint);

    if (serviceFuncs.isFunction(sortBy.accessorSort))
      throwFetchError(
        "sortBy.accessorSort is function, but must be string",
        null,
        endpoint
      );

    req = req + "&sort_by=" + sortBy.accessorSort + "&sort_order=" + sortOrder;    
  }

  let Json = await fetchJSON(req);

  if (Json.errorMessage) throwFetchError(Json.errorMessage, null, endpoint);

  if (!Json.data) throwFetchError("Body is empty", null, endpoint);

  return {
    items: Json.data || Json,
    topRowNumber: topRowNumber,
    count: Json.count
  };
}

export async function getItems(endpoint, FAKE_DATA) {
  let result;

  if (constants.isFakeData) {
    await serviceFuncs.delayTime(constants.fakeDelay);
    if (FAKE_DATA) {
      result = JSON.parse(JSON.stringify(FAKE_DATA));
    } else
      result = {
        items: [],
        topRowNumber: 0,
        count: 0
      };
  }
  
  if (!result) {
    let Json = await fetchJSON(endpoint);
    if (!Json.body) throwFetchError("Body is empty", null, endpoint);
    result = {
      items: Json.body,
      topRowNumber: 0,
      count: Json.body.length
    };
  }

  return result;
}

//-------------------------------------------------------------------
export async function deleteItem(itemId, partialEndpoint) {
  if (!itemId)
    throwFetchError("argument itemId is empty in deleteItem", partialEndpoint);

  let endPoint = partialEndpoint + itemId;

  if (constants.isFakeData) {
    await serviceFuncs.delayTime(constants.fakeDelay);
    return;
  }

  let response = await fetchJSON(endPoint, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });

  return response;
}
