import { FAKE_STATS_UNUSED_CERTIFICATES_RESPONSE } from "../fakeDb/fakeStatsUnusedCertificates";
import * as baseAPI from "./baseApi";
import * as constants from "../consts/constants";

const statsUnusedCertificates_endPoint =
  "https://" + constants.apiDomain + "/stats/unused-certificates";

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
    statsUnusedCertificates_endPoint,
    filter,
    topRowNumber,
    itemsPerPage,
    sortBy,
    sortOrder,
    FAKE_STATS_UNUSED_CERTIFICATES_RESPONSE
  );
  return result;
}


//--------------------------------------------------------------------------------
