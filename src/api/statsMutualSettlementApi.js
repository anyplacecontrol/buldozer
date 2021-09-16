import { FAKE_CERTIFICATES_RESPONSE } from "../fakeDb/fakeCertificates";
import * as baseAPI from "./baseApi";
import * as constants from "../consts/constants";

const statsMutualSettlement_endPoint =
  "https://" + constants.apiDomain + "/certificates";

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

    if (filter.isPartiallyRedeemable === "true") filter.isPartiallyRedeemable = true;
    if (filter.isPartiallyRedeemable === "false") filter.isPartiallyRedeemable = false;

    if (filter.amount) {
      filter.amount = {
        fromPrice: filter.amount.startValue,
        toPrice: filter.amount.endValue
      }
    }
    if (filter.isActive === "true") filter.isActive = true;
    if (filter.isActive === "false") filter.isActive = false;
  }

  let result = await baseAPI.getFilteredItems(
    statsMutualSettlement_endPoint,
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
