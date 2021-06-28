import { isEmpty } from "./serviceFunctions";
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

export function isLongString(value, charsNum = 255) {
  if (isEmptyString(value)) return false;
  if (value.length > charsNum) return true;
}

function splitCommaToArray(str) {
  if (isEmptyString(str)) return [];

  let newStr = str.replace(/(\r\n|\n|\r)/gm, ",");
  let strArr = newStr.split(",");
  strArr = strArr.filter(function(value, index, arr) {
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

export function getSelectBoxClass(viewItem, isError) {
  let result = "w100";

  if (!viewItem.isValidated || !isError) return result;
  else return result + " is--error";
}

//=========================================================================

export function validateCertificateView(certificateView) {
  if (
    isEmptyString(certificateView.id) ||
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

  if (
    isLongString(certificateView.recipientComment, 500)    
  ) {
    throw "Проверка не удалась: слишком длинный комментарий (>500 символов)";
  }  

  if (!isNumeric(certificateView.validityPeriodInMonths))
    throw "Проверка не удалась: 'срок действия' не является числом";

  if (
    certificateView.validityPeriodInMonths < 0 ||
    certificateView.validityPeriodInMonths > 36
  )
    throw "Проверка не удалась: 'срок действия' в недопустимых границах";
  return {
    ...certificateView
  };
}
