import { FAKE_SERVICE_TYPES_RESPONSE } from "../fakeDb/fakeServiceTypes";
import * as baseAPI from "./baseApi";
import * as constants from "../consts/constants";

const serviceTypes_endPoint =
  "https://" + constants.apiDomain + "/service-types";

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
    serviceTypes_endPoint,
    filter,
    topRowNumber,
    itemsPerPage,
    sortBy,
    sortOrder,
    FAKE_SERVICE_TYPES_RESPONSE
  );
  return result;
}
