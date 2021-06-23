export const delayTime = t => new Promise(resolve => setTimeout(resolve, t));

export function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function isFunction(functionToCheck) {
  var getType = {};
  return (
    functionToCheck &&
    getType.toString.call(functionToCheck) === "[object Function]"
  );
}

export function isEmpty(obj) {
  if (!obj) return true;
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

export function isObjectsEquivalent(a, b) {
  if (a && !b) return false;
  if (!a && b) return false;

  // Create arrays of property names
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);

  // If number of properties is different,
  // objects are not equivalent
  if (aProps.length != bProps.length) {
    return false;
  }

  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i];

    // If values of same property are not equal,
    // objects are not equivalent
    if (a[propName] !== b[propName]) {
      return false;
    }
  }

  // If we made it this far, objects
  // are considered equivalent
  return true;
}

export function isItemInArray(item, arr) {
  if (!Array.isArray(arr)) return false;
  return arr.indexOf(item) >= 0;
}

export function isObjectInArray(obj, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (isObjectsEquivalent(obj, arr[i])) return true;
  }
  return false;
}

export function isObjectAccessorInArray(obj, arr, accessor) {
  for (let i = 0; i < arr.length; i++) {
    if (obj[accessor] === arr[i][accessor]) return true;
  }
  return false;
}

//if array contains object with the same field (obj[accessor]) - remove object from array
//otherwise add object to array

export function addOrRemoveObjectFromArray(obj, currentArray, accessor) {
  let newArray = [];

  if (!isObjectAccessorInArray(obj, currentArray, accessor)) {
    newArray = [...currentArray, obj];
  } else {
    for (let i = 0; i < currentArray.length; i++) {
      if (obj[accessor] != currentArray[i][accessor])
        newArray.push(currentArray[i]);
    }
  }
  return newArray;
}

// export function timestampToString(unix_timestamp) {
//   var date = new Date(unix_timestamp);
//   var year = date.getFullYear();
//   var month = date.getMonth() + 1;
//   var day = date.getDate();
//   var hour = date.getHours();
//   var minute = date.getMinutes();

//   if (day.toString().length == 1) {
//     day = "0" + day;
//   }
//   if (hour.toString().length == 1) {
//     hour = "0" + hour;
//   }
//   if (minute.toString().length == 1) {
//     minute = "0" + minute;
//   }

//   var dateTime = year + "/" + month + "/" + day + " " + hour + ":" + minute;
//   return dateTime;
// }

// export function getDateTime() {
//   var now = new Date();
//   var year = now.getFullYear();
//   var month = now.getMonth() + 1;
//   var day = now.getDate();
//   var hour = now.getHours();
//   var minute = now.getMinutes();
//   var second = now.getSeconds();
//   if (month.toString().length == 1) {
//     month = "0" + month;
//   }
//   if (day.toString().length == 1) {
//     day = "0" + day;
//   }
//   if (hour.toString().length == 1) {
//     hour = "0" + hour;
//   }
//   if (minute.toString().length == 1) {
//     minute = "0" + minute;
//   }
//   if (second.toString().length == 1) {
//     second = "0" + second;
//   }
//   var dateTime =
//     year + "-" + month + "-" + day + " " + hour + "_" + minute + "_" + second;
//   return dateTime;
// }

export function parseQueryParams(query) {
  try {
    //You get a '?key=asdfghjkl1234567890&val=123&val2&val3=other'
    const queryArray = query.split("?")[1].split("&");
    let queryParams = {};
    for (let i = 0; i < queryArray.length; i++) {
      const [key, val] = queryArray[i].split("=");
      queryParams[key] = val ? val : true;
    }
    /* queryParams = 
        {
         key:"asdfghjkl1234567890",
         val:"123",
         val2:true,
         val3:"other"
        }
     */
    return queryParams;
  } catch (error) {
    return {};
  }
}

export function withoutQueryParams(query) {
  let index = query.indexOf("?");
  if (index < 0) return query;
  let result = query.substring(0, index);
  return result;
}

export function arrayAsText(stringsArr) {
  let result = "";
  if (stringsArr) {
    for (let i = 0; i < stringsArr.length; i++) {
      result = result + stringsArr[i].replace(/\s+/g, '');
      if (i < stringsArr.length - 1) result = result + ",\n";
    }
  }  
  return result;
}

export function isUUID ( uuid ) {
  let s = "" + uuid;

  s = s.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$');
  if (s === null) {
    return false;
  }
  return true;
}

export function dayOfWeekToStr( dayOfWeek ) {
  switch (dayOfWeek) {
    case 1:
      return "Mon."
    case 2:
      return "Tue."
    case 3:
      return "Wed."
    case 4:
      return "Thu."      
    case 5:
      return "Fri."     
    case 6:
      return "Sat."  
    case 7:
      return "Sun."     
  }
}