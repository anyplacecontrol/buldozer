import * as uiActions from "./uiRedux";
import * as dataFuncs from "../../utils/dataFuncs";
import * as tableColumns from "../../consts/tableColumns";
import * as serviceFuncs from "../../utils/serviceFunctions";

export const errorAbstractMethod =
  "Can not call abstract method of BaseTables class";

//*******************************************************************************
//ACTION TYPES

export class BaseTableTypes {
  static FETCH_ITEMS_COMPLETE = "FETCH_ITEMS_COMPLETE";
  static REPLACE_ITEMS = "REPLACE_ITEMS";
  static REPLACE_COLUMNS = "REPLACE_COLUMNS";
  static REPLACE_FILTER_ITEMS = "REPLACE_FILTER_ITEMS";
  static RESET_STATE = "RESET_STATE";
  static CHANGE_NEED_CLEAN_FETCH = "CHANGE_NEED_CLEAN_FETCH";
  static CHANGE_SORT_MODE = "CHANGE_SORT_MODE";
}

//*******************************************************************************
//INITIAL STATE

export const BaseTableInitialState = {
  count: 0, //quantity of orders in database
  topRowNumber: 0, //number of row (in database table) displayed on the top of list
  items: [], //see FAKE_ORDERS object.
  columns: [], //Should be overridden by child
  filterItems: [], //Should be overridden by child
  needCleanFetch: false, //if true, page should do clean fetch after its mount, because happened background fetch with unknown filter
  sortBy: tableColumns.COLUMN_ID, //Should be overridden by child
  sortOrder: "descending" //Should be overridden by child
};

//*******************************************************************************
//REDUCER

export function BaseTableReducer(
  _ACTION_TYPE_PREFIX,
  state,
  action = {},
  initialState
) {
  switch (action.type) {
    case _ACTION_TYPE_PREFIX + BaseTableTypes.RESET_STATE:
      return { ...initialState };

    case _ACTION_TYPE_PREFIX + BaseTableTypes.FETCH_ITEMS_COMPLETE: {
      return {
        ...state,
        items: action.items,
        topRowNumber: action.topRowNumber,
        count: action.count,
        checkedItems: []
      };
    }

    case _ACTION_TYPE_PREFIX + BaseTableTypes.REPLACE_ITEMS: {
      return { ...state, items: action.items };
    }

    case _ACTION_TYPE_PREFIX + BaseTableTypes.REPLACE_COLUMNS: {
      return { ...state, columns: action.columns };
    }

    case _ACTION_TYPE_PREFIX + BaseTableTypes.REPLACE_FILTER_ITEMS:
      return { ...state, filterItems: action.filterItems };

    case _ACTION_TYPE_PREFIX + BaseTableTypes.CHANGE_NEED_CLEAN_FETCH:
      return { ...state, needCleanFetch: action.value };

    case _ACTION_TYPE_PREFIX + BaseTableTypes.CHANGE_SORT_MODE:
      return { ...state, sortBy: action.sortBy, sortOrder: action.sortOrder };

    default:
      return null;
  }
}

//*******************************************************************************

export function showException(e, isStandardAlert) {
  return async (dispatch, getState) => {
    let message = e.message || e;
    let json;
    try {
      json = JSON.parse(message);
      if (json.errorMessage) {
        message = json.errorMessage;
        if (typeof message === "object" && message !== null) {
          let tmp = message;
          message = tmp.message;
          if (tmp.data)
            message = message + " " + JSON.stringify(tmp.data);
          message = message + ". Url:" + json.url;          
        }
        else if (message.indexOf("http") < 0)
          message = message + ". Url=" + json.url;
      }
    } catch (e) {}

    console.error(json ? json : e);

    dispatch(
      uiActions.ShowAlert(message, uiActions.ALERT_ERROR, isStandardAlert)
    );
    dispatch(uiActions.showBackdrop(false || isStandardAlert));
  };
}

//*******************************************************************************
//ACTION CREATORS

export class BaseTableActions {
  //******* public actions

  resetState() {
    return async (dispatch, getState) => {
      await dispatch({
        type: this._withPrefix(BaseTableTypes.RESET_STATE)
      });

      dispatch(this.resetColumns());
    };
  }

  //if keepBackdropOpened=true:  do not re-throw exception and show error in standard alert
  //if keepBackdropOpened=false:  re-throw exception and show error in special ui panel
  fetchItems = (
    topRowNumber = 0,
    isCvsExport = false,
    isUnlimitedPages = false,
    filter = null,
    keepBackdropOpened = false,
    needCleanFetch = false
  ) => {
    return async (dispatch, getState) => {
      if (!keepBackdropOpened) {
        dispatch(uiActions.HideAlert());
      }

      dispatch(uiActions.showBackdrop(true));

      if ((isUnlimitedPages && !isCvsExport) || needCleanFetch) {
        //it is background fetch!
        //so we will need to do clean fetch after page displaying
        dispatch(this.changeNeedCleanFetch(true));
      } else if (!filter) {
        let filterItems = this.getFilterItems(getState());
        filter = dataFuncs.createFilterObject(filterItems);
      }

      let itemsPerPage = this.getItemsPerPage(getState());
      let sortBy = this.getSortBy(getState());
      let sortOrder = this.getSortOrder(getState());
      if (sortBy && !sortBy.accessorSort) {
        sortBy = null;
      }

      let fetchedResponse;
      try {
        dispatch(uiActions.showBackdrop(true));
        fetchedResponse = await dispatch(
          this._fetchItemsFromNetwork(
            filter,
            topRowNumber,
            isCvsExport || isUnlimitedPages ? 0 : itemsPerPage,
            sortBy,
            sortOrder
          )
        );
      } catch (e) {
        dispatch(showException(e, keepBackdropOpened));
        //window.location.replace("/"); // todo: put to another place, check and refresh auth token
        if (!keepBackdropOpened) {
          throw e;
        }
        return;
      }

      dispatch(uiActions.showBackdrop(false || keepBackdropOpened));

      if (!fetchedResponse || !fetchedResponse.items) {
        let message =
          "Problem in fetchItems. Empty data received for table: " +
          this._ACTION_TYPE_PREFIX;

        dispatch(
          uiActions.ShowAlert(
            message,
            uiActions.ALERT_ERROR,
            keepBackdropOpened
          )
        );

        if (!keepBackdropOpened) {
          throw message;
        }

        return;
      }

      if (!fetchedResponse.count) {
        fetchedResponse.count = fetchedResponse.items.length;
      }

      //Add additional fields
      for (let i = 0; i < fetchedResponse.items.length; i++) {
        let rowNumber;
        if (
          sortBy &&
          sortBy.accessorSort === "rowNumber" &&
          sortOrder === "descending"
        ) {
          rowNumber = fetchedResponse.count - topRowNumber - i;
        } else {
          rowNumber = topRowNumber + i + 1;
        }

        fetchedResponse.items[i].isChecked = false;
        fetchedResponse.items[i].rowNumber = rowNumber;
        if (!fetchedResponse.items[i].id) {
          fetchedResponse.items[i].id = rowNumber;
        }
      }

      if (!isCvsExport) {
        await dispatch({
          type: this._withPrefix(BaseTableTypes.FETCH_ITEMS_COMPLETE),
          items: fetchedResponse.items,
          count: fetchedResponse.count,
          topRowNumber: fetchedResponse.topRowNumber
        });
      }

      return fetchedResponse;
    };
  };

  cleanFetch = () => {
    return async (dispatch, getState) => {
      let items = this.getItems(getState());
      if (
        !items ||
        items.length === 0 ||
        this._getStateSlice(getState()).needCleanFetch
      ) {
        //|| !this.props.wasGoBack
        try {
          await dispatch(this.changeNeedCleanFetch(false));
          dispatch(uiActions.showBackdrop(true));
          await dispatch(this.loadFilterItems());
          dispatch(uiActions.showBackdrop(true));
          await dispatch(this.fetchItems());
        } finally {
          dispatch(uiActions.showBackdrop(false));
        }
      }
    };
  };

  fetchByPageNumber = pageNumber => {
    return async (dispatch, getState) => {
      let topRowNumber = this.getTopRowNumber(getState());
      let itemsPerPage = getState().ui.itemsPerPage;
      let newTopRowNumber = (pageNumber - 1) * itemsPerPage;
      if (topRowNumber != newTopRowNumber)
        dispatch(this.fetchItems(newTopRowNumber));
    };
  };

  fetchCsv = () => {
    return async (dispatch, getState) => {
      let fetchedResponse = await dispatch(this.fetchItems(0, true));
      if (!fetchedResponse) return;

      let data = [];
      let columns = this._getStateSlice(getState()).columns;
      //headers;
      let headers = [];
      for (let i = 0; i < columns.length; i++) {
        let column = columns[i];
        if (column.isVisible) {
          headers.push(column.text);
        }
      }

      data.push(headers);

      //data
      for (let i = 0; i < fetchedResponse.items.length; i++) {
        let dataItem = fetchedResponse.items[i];
        let tableRow = [];
        for (let i = 0; i < columns.length; i++) {
          let column = columns[i];
          if (column.isVisible) {
            let dataField;
            if (serviceFuncs.isFunction(column.accessor))
              dataField = column.accessor(dataItem);
            else dataField = dataItem[column.accessor];
            tableRow.push(dataField);
          }
        }
        data.push(tableRow);
      }

      return data;
    };
  };

  sortItemsBy = columnObj => {
    return async (dispatch, getState) => {
      let currentSortColumn = this.getSortBy(getState());
      let newSortOrder = "descending";

      //if clicked to the same column - just change sort order mode
      if (currentSortColumn.accessorSort === columnObj.accessorSort) {
        if (this.getSortOrder(getState()) === "descending")
          newSortOrder = "ascending";
        else newSortOrder = "descending";
      }

      await dispatch({
        type: this._withPrefix(BaseTableTypes.CHANGE_SORT_MODE),
        sortBy: columnObj,
        sortOrder: newSortOrder
      });

      const usePagination = this.getItemsPerPage(getState()) > 0;
      if (usePagination) dispatch(this.fetchItems());
    };
  };

  selectAllItems = () => {
    return async (dispatch, getState) => {
      //if all orders selected - deselect all
      if (this.isAllItemsChecked(getState())) {
        return dispatch({
          type: this._withPrefix(BaseTableTypes.REPLACE_ITEMS),
          items: this._createCheckedItems(getState(), false)
        });
      }

      //otherwise select all items, visible on current page
      return dispatch({
        type: this._withPrefix(BaseTableTypes.REPLACE_ITEMS),
        items: this._createCheckedItems(getState(), true)
      });
    };
  };

  selectItem = item => {
    return async (dispatch, getState) => {
      let id = item.id;
      if (!id) return;

      let newItems = [...this.getItems(getState())];

      for (let i = 0; i < newItems.length; i++) {
        if (newItems[i].id === id) {
          newItems[i] = { ...newItems[i], isChecked: !newItems[i].isChecked };
          break;
        }
      }

      return dispatch({
        type: this._withPrefix(BaseTableTypes.REPLACE_ITEMS),
        items: newItems
      });
    };
  };

  triggerColumn = columbObj => {
    return async (dispatch, getState) => {
      let columns = [...this.getColumns(getState())];

      for (let i = 0; i < columns.length; i++) {
        if (columns[i].text === columbObj.text) {
          columns[i] = { ...columns[i], isVisible: !columns[i].isVisible };
          break;
        }
      }

      dispatch({
        type: this._withPrefix(BaseTableTypes.REPLACE_COLUMNS),
        columns: columns
      });
    };
  };

  resetColumns = () => {
    return (dispatch, getState) => {
      let columns = [];
      let Columns = this.getColumns(getState());

      for (let i = 0; i < Columns.length; i++) {
        let column = Columns[i];
        let newColumn = { ...column };
        newColumn.isVisible = newColumn.isDefault;
        columns.push(newColumn);
      }

      dispatch({
        type: this._withPrefix(BaseTableTypes.REPLACE_COLUMNS),
        columns: columns
      });
    };
  };

  changeFilterValue = (filterItem, changedValue) => {
    return (dispatch, getState) => {
      let newValue = changedValue;
      let filterItems = [...this._getStateSlice(getState()).filterItems];
      for (let i = 0; i < filterItems.length; i++) {
        if (filterItems[i] === filterItem) {
          //For multiSelectBox
          if (filterItem.type === "multiSelectBox") {
            let oldValue = filterItems[i].value;
            //remove item from array if it already exists
            if (oldValue.indexOf(newValue) >= 0) {
              newValue = oldValue.filter(function(value, index, arr) {
                return value != newValue;
              });
            } else {
              newValue = [...oldValue, changedValue];
            }
          }

          filterItems[i] = { ...filterItems[i], value: newValue };
          break;
        }
      }
      dispatch({
        type: this._withPrefix(BaseTableTypes.REPLACE_FILTER_ITEMS),
        filterItems: filterItems
      });
    };
  };

  changeNeedCleanFetch = value => {
    return {
      type: this._withPrefix(BaseTableTypes.CHANGE_NEED_CLEAN_FETCH),
      value: value
    };
  };

  deleteItem = (itemObj, isBulkOperation = false) => {
    return async (dispatch, getState) => {
      return await dispatch(
        this._handleItem(
          itemObj,
          this._deleteItem,
          "Item(s) successfully deleted",
          isBulkOperation
        )
      );
    };
  };

  deleteSelectedItems = () => {
    return async (dispatch, getState) => {
      return await dispatch(this._handleSelectedItems(this.deleteItem));
    };
  };

  disableItem = (itemObj, isBulkOperation = false) => {
    return async (dispatch, getState) => {
      return await dispatch(
        this._handleItem(
          itemObj,
          this._disableItem,
          "Item(s) successfully disabled",
          isBulkOperation
        )
      );
    };
  };

  disableSelectedItems = () => {
    return async (dispatch, getState) => {
      return await dispatch(this._handleSelectedItems(this.disableItem));
    };
  };

  enableItem = (itemObj, isBulkOperation = false) => {
    return async (dispatch, getState) => {
      return await dispatch(
        this._handleItem(
          itemObj,
          this._enableItem,
          "Item(s) successfully enabled",
          isBulkOperation
        )
      );
    };
  };

  enableSelectedItems = () => {
    return async (dispatch, getState) => {
      return await dispatch(this._handleSelectedItems(this.enableItem));
    };
  };

  //disableSelectedItems

  //******* abstract actions

  _deleteItem(itemObj) {
    throw errorAbstractMethod;
  }

  _disableItem(itemObj) {
    throw errorAbstractMethod;
  }

  _enableItem(itemObj) {
    throw errorAbstractMethod;
  }

  goto_editItem(itemId) {
    throw errorAbstractMethod;
  }

  goto_addItem(itemId) {
    throw errorAbstractMethod;
  }

  loadFilterItems() {
    throw errorAbstractMethod;
  }

  _fetchItemsFromNetwork(
    filter,
    topRowNumber,
    itemsPerPage,
    sortBy,
    sortOrder
  ) {
    throw errorAbstractMethod;
  }

  //------------------------------------------------------------------------------
  //SELECTORS

  getColumns = globalState => {
    return this._getStateSlice(globalState).columns;
  };

  getSortBy = globalState => {
    return this._getStateSlice(globalState).sortBy;
  };

  getSortOrder = globalState => {
    let result = this._getStateSlice(globalState).sortOrder;
    return result;
  };

  getFilterItems = globalState => {
    return this._getStateSlice(globalState).filterItems;
  };

  getItems = globalState => {
    return this._getStateSlice(globalState).items;
  };

  getWasFilterChanged = globalState => {
    let filteredItems = this.getFilterItems(globalState);
    for (let i = 0; i < filteredItems.length; i++) {
      let filteredItem = filteredItems[i];
      if (filteredItem.value != filteredItem.defaultValue) {
        return true;
      }
    }
    return false;
  };

  getTopRowNumber = globalState => {
    return this._getStateSlice(globalState).topRowNumber;
  };

  getCount = globalState => {
    return this._getStateSlice(globalState).count;
  };

  getItemsPerPage = globalState => {
    return this._USE_PAGINATION ? globalState.ui.itemsPerPage : 0;
  };

  getSelectedItemsQty = globalState => {
    const items = this.getItems(globalState);
    let result = 0;
    for (let i = 0; i < items.length; i++) {
      if (items[i].isChecked) {
        result = result + 1;
      }
    }
    return result;
  };

  isAnyCheckedItems = globalState => {
    const items = this.getItems(globalState);
    for (let i = 0; i < items.length; i++) {
      if (items[i].isChecked) {
        return true;
      }
    }
    return false;
  };

  isAllItemsChecked = globalState => {
    const items = this.getItems(globalState);
    if (items.length == 0) return false;

    let itemsPerPage = this.getItemsPerPage(globalState);
    let limit = items.length;
    if (itemsPerPage > 0) limit = Math.min(items.length, itemsPerPage);

    let result = true;

    for (let i = 0; i < limit; i++) {
      if (!items[i].isChecked) {
        result = false;
        break;
      }
    }

    return result;
  };

  //------------------------------------------------------------------------------
  //ABSTRACT SERVICE FUNCS

  //********** public

  get ALLOW_ADD_ITEM() {
    return false;
  }

  get ALLOW_DELETE_ITEM() {
    return this.ALLOW_ADD_ITEM;
  }

  get ALLOW_DISABLE_ITEM() {
    return false;
  }

  //******* protected

  _getStateSlice = state => {
    throw errorAbstractMethod;
  };

  get _USE_PAGINATION() {
    return false;
  }

  get _ACTION_TYPE_PREFIX() {
    throw errorAbstractMethod;
  }

  ///------------------------------------------------------------------------------
  //PRIVATE SERVICE FUNCS

  _withPrefix = actionType => {
    return this._ACTION_TYPE_PREFIX + actionType;
  };

  _createCheckedItems = (globalState, isChecked) => {
    const items = this._getStateSlice(globalState).items;
    let newItems = [];

    //unCheck absolutely all items
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      let newItem = { ...item, isChecked: isChecked };
      newItems.push(newItem);
    }

    //if isChecked=true: Check items only on current page
    if (isChecked) {
      let itemsPerPage = this.getItemsPerPage(globalState);
      let limit = newItems.length;
      if (itemsPerPage > 0) limit = Math.min(newItems.length, itemsPerPage);

      for (let i = 0; i < limit; i++) {
        newItems[i].isChecked = true;
      }
    }

    return newItems;
  };

  //API operation (such as delete, enable, disable) under item
  //"func" will be called under item
  _handleItem = (itemObj, func, successMessage, isBulkOperation = false) => {
    return async (dispatch, getState) => {
      dispatch(uiActions.showBackdrop(true));

      try {
        await dispatch(func(itemObj));

        dispatch(uiActions.ShowAlert(successMessage, uiActions.ALERT_INFO));

        if (!isBulkOperation) {
          if (func === this._deleteItem) location.reload(true);
          else {
            let topRowNumber = this._getStateSlice(getState()).topRowNumber;
            await dispatch(
              this.fetchItems(topRowNumber, false, false, null, true)
            ); //do not throw exception, but show standard alert
          }
        }

        return true;

        dispatch(uiActions.showBackdrop(false));
      } catch (e) {
        dispatch(showException(e, isBulkOperation));
        dispatch(uiActions.showBackdrop(false));
        return false;
      }
    };
  };

  //Bulk operation via Actions dropdown menu under selected items
  //"func" will be called under each selected item
  _handleSelectedItems = (func, dispatch, getState) => {
    return async (dispatch, getState) => {
      const items = this.getItems(getState());
      const selectedItems = items.filter(item => item.isChecked);
      let isAnyError = false;
      let isBulkOperation = selectedItems.length > 1;
      for (let i = 0; i < selectedItems.length; i++) {
        let item = selectedItems[i];
        let isSuccess = await dispatch(func(item, isBulkOperation));
        isAnyError = isAnyError || !isSuccess;
      }
      await dispatch(uiActions.showBackdrop(false));

      if (!isAnyError && isBulkOperation) {
        if (func === this._deleteItem) location.reload(true);
        else {
          let topRowNumber = this._getStateSlice(getState()).topRowNumber;
          await dispatch(
            this.fetchItems(topRowNumber, false, false, null, false)
          );
        }
      }
    };
  };
}
