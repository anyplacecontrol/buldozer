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

  if (emailAddress.indexOf(" ") > 0) return "Пробелы не допустимы";

  //looks like email?
  var lastAtPos = emailAddress.lastIndexOf("@");
  var lastDotPos = emailAddress.lastIndexOf(".");
  let looksLikeMail =
    lastAtPos < lastDotPos &&
    lastAtPos > 0 &&
    emailAddress.indexOf("@@") == -1 &&
    lastDotPos > 2 &&
    emailAddress.length - lastDotPos > 2;
  if (!looksLikeMail) return "Не верный фромат";

  //Invalid characters
  let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (filter.test(emailAddress)) {
    return null;
  } else {
    return "Недопустимые символы";
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

export function getPhoneValidationError(phone) {
  if (isEmptyString(phone)) return null;

  if (phone.length < 10) return "Слишком короткий номер";

  //Invalid characters
  let filter = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
  if (filter.test(phone)) {
    return null;
  } else {
    return "Недопустимые символы";
  }

  return null;
}

//=========================================================================

export function validateCertificateView(viewObj) {
  if (
    isEmptyString(viewObj.id) ||
    isEmptyString(viewObj.amount) ||
    isEmptyString(viewObj.validityPeriodInMonths)
  )
    throw "Проверка не удалась: пустые поля";

  if (isEmptyString(viewObj.activeFromDate))
    throw "Проверка не удалась: дата активации не задана";

  if (!viewObj.recipient) throw "Проверка не удалась: контрагент не задан";

  if (!viewObj.serviceType) throw "Проверка не удалась: вид услуг не задан";

  if (!viewObj.issuingRestaurant)
    throw "Проверка не удалась: ресторан-эмитент не задан";

  if (
    isLongString(viewObj.id) ||
    isLongString(viewObj.amount) ||
    isLongString(viewObj.validityPeriodInMonths)
  ) {
    throw "Проверка не удалась: слишком длинные поля (>255 символов)";
  }

  if (isLongString(viewObj.recipientComment, 500)) {
    throw "Проверка не удалась: слишком длинный комментарий (>500 символов)";
  }

  if (!isNumeric(viewObj.validityPeriodInMonths))
    throw "Проверка не удалась: 'срок действия' не является числом";

  if (viewObj.validityPeriodInMonths < 0 || viewObj.validityPeriodInMonths > 36)
    throw "Проверка не удалась: 'срок действия' в недопустимых границах";
  return {
    ...viewObj
  };
}

//--------------------------------------------------------------------------

export function validateRecipientView(viewObj) {
  if (isEmptyString(viewObj.company)) throw "Проверка не удалась: пустые поля";

  if (
    isLongString(viewObj.company) ||
    isLongString(viewObj.name) ||
    isLongString(viewObj.address) ||
    isLongString(viewObj.phone) ||
    isLongString(viewObj.email)
  ) {
    throw "Проверка не удалась: слишком длинные поля (>255 символов)";
  }

  if (isLongString(viewObj.comment, 500)) {
    throw "Проверка не удалась: слишком длинный комментарий (>500 символов)";
  }

  let emailError = getEmailValidationError(viewObj.email);
  if (emailError) throw "Проверка E-mail не удалась: " + emailError;

  let phoneError = getPhoneValidationError(viewObj.phone);
  if (phoneError) throw "Проверка телефона не удалась: " + phoneError;

  return {
    ...viewObj
  };
}

//--------------------------------------------------------------------------

export function validateRestaurantView(viewObj) {
  if (isEmptyString(viewObj.name) || isEmptyString(viewObj.address))
    throw "Проверка не удалась: пустые поля";

  if (
    isLongString(viewObj.name) ||
    isLongString(viewObj.address) ||
    isLongString(viewObj.phone) ||
    isLongString(viewObj.email)
  ) {
    throw "Проверка не удалась: слишком длинные поля (>255 символов)";
  }

  if (isLongString(viewObj.comment, 500)) {
    throw "Проверка не удалась: слишком длинный комментарий (>500 символов)";
  }

  let emailError = getEmailValidationError(viewObj.email);
  if (emailError) throw "Проверка E-mail не удалась: " + emailError;

  let phoneError = getPhoneValidationError(viewObj.phone);
  if (phoneError) throw "Проверка телефона не удалась: " + phoneError;

  return {
    ...viewObj
  };
}

//--------------------------------------------------------------------------

export function validateUserView(viewObj) {
  let isEditExisting = viewObj.createdUser != null;

  if (isEmptyString(viewObj.name) || isEmptyString(viewObj.email))
    throw "Проверка не удалась: пустые поля";

  if (!viewObj.password || viewObj.password.length < 6)
    throw "Пароль должен содержать не менее 6 символов";

  if (
    isLongString(viewObj.name) ||
    isLongString(viewObj.position) ||
    isLongString(viewObj.phone) ||
    isLongString(viewObj.email)
  ) {
    throw "Проверка не удалась: слишком длинные поля (>255 символов)";
  }

  let emailError = getEmailValidationError(viewObj.email);
  if (emailError) throw "Проверка E-mail не удалась: " + emailError;

  let phoneError = getPhoneValidationError(viewObj.phone);
  if (phoneError) throw "Проверка телефона не удалась: " + phoneError;

  return {
    ...viewObj
  };
}

//--------------------------------------------------------------------------

export function validateServiceTypeView(viewObj) {
  let isEditExisting = viewObj.createdUser != null;

  if (isEmptyString(viewObj.name)) {
    throw "Проверка не удалась: пустые поля";
  }
  
  if (
    isLongString(viewObj.name) 
  ) {
    throw "Проверка не удалась: слишком длинные поля (>255 символов)";
  }
    
  return {
    ...viewObj
  };
}