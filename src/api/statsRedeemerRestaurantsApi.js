import { FAKE_STATS_REDEEMER_RESTAURANTS_RESPONSE } from "../fakeDb/fakeStatsRedeemerRestaurants";
import * as baseAPI from "./baseApi";
import * as constants from "../consts/constants";

const statsRedeemerRestaurants_endPoint =
  "https://" + constants.apiDomain + "/stats/redeemer-restaurants";

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
    statsRedeemerRestaurants_endPoint,
    filter,
    topRowNumber,
    itemsPerPage,
    sortBy,
    sortOrder,
    FAKE_STATS_REDEEMER_RESTAURANTS_RESPONSE
  );
  return result;
}


//--------------------------------------------------------------------------------
