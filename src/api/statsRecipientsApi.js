import { FAKE_STATS_RECIPIENTS_RESPONSE } from "../fakeDb/fakeStatsRecipients";
import * as baseAPI from "./baseApi";
import * as constants from "../consts/constants";

const statsRecipients_endPoint =
  "https://" + constants.apiDomain + "/stats/recipients";

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
    statsRecipients_endPoint,
    filter,
    topRowNumber,
    itemsPerPage,
    sortBy,
    sortOrder,
    FAKE_STATS_RECIPIENTS_RESPONSE
  );
  return result;
}


//--------------------------------------------------------------------------------
