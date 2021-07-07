import { FAKE_STATS_ISSUING_RESTAURANTS } from "../fakeDb/fakeStatsIssuingRestaurants";
import * as baseAPI from "./baseApi";
import * as constants from "../consts/constants";

const statsIssuingRestaurants_endPoint =
  "https://" + constants.apiDomain + "/stats/issuing-restaurants";

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
    statsIssuingRestaurants_endPoint,
    filter,
    topRowNumber,
    itemsPerPage,
    sortBy,
    sortOrder,
    FAKE_STATS_ISSUING_RESTAURANTS
  );
  return result;
}


//--------------------------------------------------------------------------------
