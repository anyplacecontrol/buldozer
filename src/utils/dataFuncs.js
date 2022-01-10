import * as serviceFuncs from "./serviceFunctions";
import * as constants from "../consts/constants";

//------------------------------------------------------------------------------

//allItems - array of all possible items for list (objects)
//checkedItems - array of objects which are checked/selected
//accessorText - field of object used to display text in list
//accessorIdentificator - field of object used to compare objects in both arrays (allItems, checkedItems). if only this field is equal, item counted as "checked"
export function createMultiSelectBoxItems(
  allItems,
  checkedItems,
  accessorText,
  accessorIdentificator,
  onItemClick
) {
  return allItems.map(item => {
    return {
      isChecked: serviceFuncs.isObjectAccessorInArray(
        item,
        checkedItems,
        accessorIdentificator
      ),
      text: item[accessorText],
      onClick: () => onItemClick(item)
    };
  });
}

export function createSelectBoxItems(allItems, accessorText, onItemClick) {
  return allItems.map(item => {
    return {
      text: item[accessorText],
      onClick: () => onItemClick(item)
    };
  });
}

export function formatPrice(price) {
  let res = parseFloat(price).toLocaleString("en");
  return res;
}

export function convertPrice(price) {
  let res = formatPrice((price / 100).toFixed(2));
  return res;
}

export function withCoins(price) {
  if (isNaN(price)) {
    return price;
  }

  try {
    return convertPrice(price * 100);
  } catch (e) {
    return price;
  }
}

export function isItemByIdExists(Id, items) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].id.toString() === Id.toString()) {
      return true;
    }
  }

  return false;
}

export function getItemById(Id, items) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].id.toString() === Id.toString()) {
      return items[i];
    }
  }

  throw "getItemById failed. ID not found:" + Id;
}

export function getGmtTimeFormat(date) {
  let dt = new Date(date);
  let hours = dt.getUTCHours();
  let AmOrPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  let minutes = dt.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;

  let seconds = dt.getSeconds();
  seconds = seconds < 10 ? "0" + seconds : seconds;

  let finalTime = ", " + hours + ":" + minutes + ":" + seconds + " " + AmOrPm;
  // finalTime; // final time Time - 22:10

  return finalTime;
}

export function truncateDate(dateStr, details = "REPORT_DAILY") {
  if (!dateStr || dateStr === "") {
    return "";
  }

  let date = new Date(dateStr);
  let day = date.getDate();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;

  switch (month) {
    case 1:
      month = "Янв";
      break;
    case 2:
      month = "Фев";
      break;
    case 3:
      month = "Мар";
      break;
    case 4:
      month = "Апр";
      break;
    case 5:
      month = "Май";
      break;
    case 6:
      month = "Июн";
      break;
    case 7:
      month = "Июл";
      break;
    case 8:
      month = "Авг";
      break;
    case 9:
      month = "Сен";
      break;
    case 10:
      month = "Окт";
      break;
    case 11:
      month = "Ноя";
      break;
    case 12:
      month = "Дек";
      break;
  }

  if (day.toString().length == 1) {
    day = "0" + day;
  }

  if (details === "REPORT_MONTHLY") {
    return `${month} ${year}`;
  }
  if (details === "REPORT_ANNUAL") {
    return year.toString();
  }

  return day + "-" + month + "-" + year;
}

export function dateRangeToISOFormat(date1, date2) {
  let dateObj1 = new Date(date1);
  let month1 = dateObj1.getMonth() + 1;
  month1 = month1.toString();
  if (month1.length == 1) {
    month1 = "0" + month1;
  }

  let day1 = dateObj1.getDate().toString();
  if (day1.length == 1) {
    day1 = "0" + day1;
  }
  let year1 = dateObj1.getFullYear();

  if (date2) {
    let dateObj2 = new Date(date2);
    let month2 = dateObj2.getMonth() + 1;
    month2 = month2.toString();
    if (month2.length == 1) {
      month2 = "0" + month2;
    }

    let day2 = dateObj2.getDate().toString();
    if (day2.length == 1) {
      day2 = "0" + day2;
    }
    let year2 = dateObj2.getFullYear();

    let result = {
      startDate: year1 + "-" + month1 + "-" + day1 + "T00:00:00.000Z",
      endDate: year2 + "-" + month2 + "-" + day2 + "T23:59:59.999Z"
    };

    return result;
  } else return year1 + "-" + month1 + "-" + day1 + "T00:00:00.000Z";
}

export function timestampToShortDate(timestamp) {
  const time = new Date(timestamp * 1000);
  const months = [
    "Янв",
    "Фев",
    "Мар",
    "Апр",
    "Май",
    "Июн",
    "Июл",
    "Авг",
    "Сен",
    "Окт",
    "Ноя",
    "Дек"
  ];
  const year = time
    .getFullYear()
    .toString()
    .substr(2, 2);
  const month = months[time.getMonth()];
  const date = time.getDate();

  let formattedTime = `${date}-${month}-${year}`;

  return formattedTime;
}
export function formatDateObj(dateObj) {  
  let year = dateObj.getFullYear();
  const months = [
    "01",
    "02",
    "02",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12"
  ];
  let month =  months[dateObj.getMonth()];
  let day = dateObj.getDate();
  if (day.toString().length == 1) day="0"+day.toString();
  dateObj = year + "-" + month + "-" + day;
  return dateObj;
}

export function formatDate(dateStr) { 
  if (!dateStr || dateStr == "")
     return "дд.мм.ггг"//currentDay;

  let Tsymbol = dateStr.indexOf("T");
  if (Tsymbol>0)
    return dateStr.substring(0,Tsymbol);
  return dateStr;
}

export function timestampToDate(timestamp) {
  const time = new Date(timestamp * 1000);
  const months = [
    "Янв",
    "Фев",
    "Мар",
    "Апр",
    "Май",
    "Июн",
    "Июл",
    "Авг",
    "Сен",
    "Окт",
    "Ноя",
    "Дек"
  ];
  const year = time.getFullYear();
  const month = months[time.getMonth()];
  const date = time.getDate();

  let formattedTime = `${date} ${month} ${year}`;

  return formattedTime;
}

export function timestampToTime(timestamp) {
  const time = new Date(timestamp * 1000);
  const hour = time.getHours();
  const min =
    time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
  const sec =
    time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();

  let formattedTime = `${hour}:${min}:${sec}`;

  return formattedTime;
}

export function timestampToDateTime(timestamp) {
  return timestampToDate(timestamp) + " " + timestampToTime(timestamp);
}

export function dateToString(date) {
  if (!date) {
    return "";
  }

  let dateObj = new Date(date);
  let month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
  let day = ("0" + dateObj.getDate()).slice(-2);
  let year = dateObj.getFullYear();

  return `${month}/${day}/${year}`;
}

export function truncateString(str, num) {
  // If the length of str is less than or equal to num
  // just return str--don't truncate it.
  if (str.length <= num) {
    return str;
  }
  // Return str truncated with '...' concatenated to the end of str.
  return str.slice(0, num) + "...";
}

export function truncateDateTime(dateTimeStr) {
  if (!dateTimeStr) {
    return "";
  }

  dateTimeStr = dateTimeStr.replace("T", " ");

  return dateTimeStr.substring(0, 19);
}

export function getFilterTooltipText(filterItem) {
  switch (filterItem.type) {
    case "multiSelectBox": {
      let result = "";

      if (filterItem.hasOwnProperty("tooltipText")) {
        result = filterItem.tooltipText;
      }

      return result;
    }

    default:
      return "";
  }
}

export function getFilterText(filterItem) {
  switch (filterItem.type) {
    case "input":
    case "arrayInput":
    case "numberInput":
      return filterItem.value;

    case "dateRange":
    case "advancedDateRange": {
      if (
        !filterItem.value ||
        (!filterItem.value.startDate && !filterItem.value.endDate)
      ) {
        return "";
      } else {
        return (
          dateToString(filterItem.value.startDate) +
          " - " +
          dateToString(filterItem.value.endDate)
        );
      }
    }

    case "selectBox": {
      let result = filterItem.accessorText(filterItem.value);
      if (!result || result === "") {
        result = constants.anyValue;
      }

      return result;
    }

    case "multiSelectBox": {
      let result = "";

      filterItem.value.forEach(item => {
        result = result + filterItem.accessorText(item) + ",";
      });

      if (result === "") {
        result = constants.anyValue;
      }

      return result;
    }

    default:
      return "";
  }
}

export function createFilterObject(filterItems) {
  let result = {};

  filterItems.forEach(filterItem => {
    switch (filterItem.type) {
      case "input":
        if (filterItem.value != "" && filterItem.apiParamName != "unknown") {
          result[filterItem.apiParamName] = filterItem.value;
        }
        break;

      case "arrayInput":
        if (filterItem.value != "" && filterItem.apiParamName != "unknown") {
          result[filterItem.apiParamName] = [filterItem.value];
        }
        break;

      case "numberInput":
        if (filterItem.value != "" && filterItem.apiParamName != "unknown")
          result[filterItem.apiParamName] = parseFloat(filterItem.value);
        break;

      case "dateRange":
      case "advancedDateRange":
        if (
          filterItem.value &&
          filterItem.value.startDate &&
          filterItem.value.endDate &&
          filterItem.apiParamName != "unknown"
        )
          result[filterItem.apiParamName] = dateRangeToISOFormat(
            filterItem.value.startDate,
            filterItem.value.endDate
          );
        break;

      case "sliderRange":
        if (filterItem.value) {
          result[filterItem.apiParamName] = filterItem.value;
        }
        break;

      case "selectBox":
        if (
          filterItem.accessorText(filterItem.value) != constants.anyValue &&
          filterItem.apiParamName != "unknown"
        ) {
          let text = filterItem.accessorApi(filterItem.value);

          if (text != "") {
            result[filterItem.apiParamName] = text;
          }
        }
        break;

      case "multiSelectBox": {
        if (filterItem.apiParamName != "unknown") {
          let res = [];
          filterItem.value.forEach(valueItem => {
            let apiValue = filterItem.accessorApi(valueItem);
            res.push(apiValue);
          });
          if (res.length > 0) {
            result[filterItem.apiParamName] = res;
          }
        }
        break;
      }
    }
  });

  return result;
}

export function sortObjArray(data, accessor, sortOrder) {
  if (!accessor || sortOrder == "") {
    return data;
  }

  let sortedData = [...data];

  sortedData.sort((a, b) => {
    let AField, BField;

    if (serviceFuncs.isFunction(accessor)) {
      AField = accessor(a);
      BField = accessor(b);
    } else {
      AField = a[accessor];
      BField = b[accessor];
    }

    if (sortOrder === "descending") {
      if (AField < BField) {
        return -1;
      }
      if (AField > BField) {
        return 1;
      }
      return 0;
    } else {
      if (AField < BField) {
        return 1;
      }
      if (AField > BField) {
        return -1;
      }
      return 0;
    }
  });
  return sortedData;
}

export function isColumnVisible(columnsArr, columnObj) {
  if (!columnsArr || !columnObj) {
    return false;
  }

  for (let i = 0; i < columnsArr.length; i++) {
    let columnItem = { ...columnsArr[i] };
    delete columnItem.isVisible;
    delete columnItem.isDefault;
    if (serviceFuncs.isObjectsEquivalent(columnItem, columnObj)) {
      return columnsArr[i].isVisible;
    }
  }

  return false;
}

export function getUserRole() {
  let authData = null;
  let result =  "recipient" //"user";
  
  try {
    authData = JSON.parse(localStorage.getItem("authData"));
  } catch {}
  
  if (authData && authData.user && authData.user.role && authData.user.role.slug) {
    result = authData.user.role.slug;
  }
  return result;
}

export function getValueByCurrency(allValues, currency) {  
  let result = "";
  try {
    for (let i = 0; i < allValues.length; i++) {
      let valueObj = allValues[i];
      if (valueObj.currency.name == currency) {
        result = valueObj.amount;
        break;
      }
    } 
  } catch (error) {    
  }  
  return result;
}

export function sortItems(items, sortBy, sortOrder) {

  function compare( a, b ) {
    let columnA = a[sortBy.columnName];
    let columnB = b[sortBy.columnName];

    let currencyA = getValueByCurrency(columnA, sortBy.currency);
    let currencyB = getValueByCurrency(columnB, sortBy.currency);

    let sortOrderDirection = (sortOrder == "descending")?1:-1;
    if ( currencyA <currencyB ){
      return -1 * sortOrderDirection;
    }
    if ( currencyA > currencyB ){
      return 1 * sortOrderDirection;
    }
    return 0;
  }

  let result = [...items].sort( compare );
  return result;
}