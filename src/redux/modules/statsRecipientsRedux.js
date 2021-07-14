import * as statsRecipientsApi from "../../api/statsRecipientsApi";
import * as tableColumns from "../../consts/tableColumns";
import {
  BaseTableActions,
  BaseTableInitialState,
  BaseTableReducer,
  BaseTableTypes
} from "./baseTableRedux";
import * as tableFilters from "../../consts/tableFilters";
import { recipientsActions } from "./recipientsRedux";
import * as uiActions from "./uiRedux";

//*******************************************************************************
const PREFIX = "statsRecipients/";

//*******************************************************************************

export const statsRecipientsInitialState = {
  ...BaseTableInitialState,
  sortBy: tableColumns.COLUMN_RECIPIENT_NAME,
  columns: tableColumns.STATS_RECIPIENTS_COLUMNS
};

//*******************************************************************************

export default function reducer(
  state = statsRecipientsInitialState,
  action = {}
) {
  let result = BaseTableReducer(
    PREFIX,
    state,
    action,
    statsRecipientsInitialState
  );

  if (result) return result;

  switch (action.type) {
    default:
      return state;
  }
}

//*******************************************************************************

class StatsRecipientsActions extends BaseTableActions {
  // ABSTRACT ACTIONS REALIZATION

  // *** Filters
  loadFilterItems() {
    return async (dispatch, getState) => {
      let p1 = new Promise(async (resolve) => {
        if (
          !getState().recipients.items ||
          getState().recipients.items.length === 0
        ) {
          try {
            await dispatch(
              recipientsActions.fetchItems(0, false, false, null, true, true)
            );
          } catch (e) {}
        }
        resolve();
      });

      dispatch(uiActions.showBackdrop(true));
      await Promise.all([p1]);
      dispatch(uiActions.showBackdrop(false));

      let filterItems = [
        { ...tableFilters.FILTER_CREATED_DATE_STATS },
        {
          ...tableFilters.FILTER_RECIPIENT_STATS,
          items: [...getState().recipients.items]
        },
        { ...tableFilters.FILTER_ISACTIVE_STATS }
      ];

      return dispatch({
        type: this._withPrefix(BaseTableTypes.REPLACE_FILTER_ITEMS),
        filterItems: filterItems
      });
    };
  }

  _fetchItemsFromNetwork(
    filter,
    topRowNumber,
    itemsPerPage,
    sortBy,
    sortOrder
  ) {
    return async (dispatch, getState) => {
      let fetchedResponse = await statsRecipientsApi.getItems(
        filter,
        topRowNumber,
        itemsPerPage,
        sortBy,
        sortOrder
      );

      return fetchedResponse;
    };
  }

  //------------------------------------------------------------------------------
  // ABSTRACT FUNCS REALIZATION

  get _ACTION_TYPE_PREFIX() {
    return PREFIX;
  }

  get ALLOW_ADD_ITEM() {
    return false;
  }

  get _USE_PAGINATION() {
    return true;
  }

  _getStateSlice = state => {
    return state.statsRecipients;
  };
}

export const statsRecipientsActions = new StatsRecipientsActions();
