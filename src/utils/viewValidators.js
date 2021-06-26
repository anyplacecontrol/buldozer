import {isEmpty} from "./serviceFunctions";
import * as serviceFuncs from "./serviceFunctions";

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export function isEmptyString(value) {
  return value == null || value === "" || typeof value == "undefined";
}

export function isEmptyOrLongString(value) {
  if (isEmptyString(value)) return true;
  if (value.length > 255) return true;
}

export function isLongString(value) {
  if (isEmptyString(value)) return false;
  if (value.length > 255) return true;
}

function splitCommaToArray(str) {
  if (isEmptyString(str)) return [];

  let newStr = str.replace(/(\r\n|\n|\r)/gm, ",");
  let strArr = newStr.split(",");
  strArr = strArr.filter(function (value, index, arr) {
    return value != "";
  });
  return strArr;
}


export function getEmailValidationError(emailAddress) {
  if (isEmptyString(emailAddress)) return null;

  if (emailAddress.indexOf(" ") > 0) return "Spaces are not allowed";

  //looks like email?
  var lastAtPos = emailAddress.lastIndexOf("@");
  var lastDotPos = emailAddress.lastIndexOf(".");
  let looksLikeMail =
    lastAtPos < lastDotPos &&
    lastAtPos > 0 &&
    emailAddress.indexOf("@@") == -1 &&
    lastDotPos > 2 &&
    emailAddress.length - lastDotPos > 2;
  if (!looksLikeMail) return "Wrong format";

  //Invalid characters
  let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (filter.test(emailAddress)) {
    return null;
  } else {
    return "Invalid characters";
  }
}

export function getEmailsValidationError(emails) {
  if (emails.indexOf(" ") > 0) return "Spaces are not allowed";

  let emailsArr = splitCommaToArray(emails);

  for (let i = 0; i < emailsArr.length; i++) {
    let result = getEmailValidationError(emailsArr[i]);
    if (result) return result;
  }

  return null;
}

//=========================================================================

export function validateCertificateView(certificateView) {

  if (isEmptyString(certificateView.id) ||
      isEmptyString(certificateView.amount) ||
      isEmptyString(certificateView.validityPeriodInMonths) 
      )
    throw "Проверка не удалась: пустые поля";

  if (
    isLongString(certificateView.id) ||
    isLongString(certificateView.amount) || 
    isLongString(certificateView.validityPeriodInMonths) 
  ) {
    throw "Проверка не удалась: слишком длинные поля (>255 символов)";
  }

  if (!isNumeric(certificateView.validityPeriodInMonths))
    throw "Проверка не удалась: 'срок действия' не является числом";

  return {
    ...certificateView 
  };
}