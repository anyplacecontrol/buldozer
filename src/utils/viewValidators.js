import { isEmpty } from "./serviceFunctions";
import * as serviceFuncs from "./serviceFunctions";
import * as consts from "../consts/constants";
import { formatDateObj } from "../utils/dataFuncs";

function isNumeric(n) {
  if (n.toString().length>1 && n.toString()[0] == "0") return false;
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
    isEmptyString(viewObj.amount) ||
    isEmptyString(viewObj.validityPeriodInMonths) ||
    isEmptyString(viewObj.cardId)
  )
    throw "Проверка не удалась: пустые поля";

  if (isEmptyString(viewObj.activeFromDate))
    throw "Проверка не удалась: дата активации не задана";

  if (!viewObj.recipient) throw "Проверка не удалась: контрагент не задан";

  if (!viewObj.serviceType) throw "Проверка не удалась: вид услуг не задан";

  if (!viewObj.issuingRestaurant)
    throw "Проверка не удалась: ресторан-эмитент не задан";

  if (viewObj.amount == "0") throw "Номинал не должен быть 0";

  if (
    isLongString(viewObj.id) ||
    isLongString(viewObj.amount) ||
    isLongString(viewObj.validityPeriodInMonths) ||
    isLongString(viewObj.cardId)
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

export function validateCardView(viewObj) {
  if (!viewObj.recipient) throw "Проверка не удалась: контрагент не задан";

  if (isLongString(viewObj.recipientComment, 500)) {
    throw "Проверка не удалась: слишком длинный комментарий (>500 символов)";
  }

  return {
    ...viewObj,
    id: viewObj.id
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

  if (viewObj.id_ == 0 || viewObj.id_.length < 9)
    throw "поле Id должно содержать 9 цифр";

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
  let isEditExisting = viewObj.id != 0;

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

  if (!viewObj.role) throw "Проверка не удалась: Роль не указана";

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
  let isEditExisting = viewObj.id != 0;

  if (isEmptyString(viewObj.name)) {
    throw "Проверка не удалась: пустые поля";
  }

  if (isLongString(viewObj.name)) {
    throw "Проверка не удалась: слишком длинные поля (>255 символов)";
  }

  return {
    ...viewObj
  };
}

//--------------------------------------------------------------------------

export function validateManifestationView(viewObj) {
  let isEditExisting = viewObj.id != 0;

  if (isEmptyString(viewObj.name)) {
    throw "Проверка не удалась: пустые поля";
  }

  if (isLongString(viewObj.name)) {
    throw "Проверка не удалась: слишком длинные поля (>255 символов)";
  }

  return {
    ...viewObj
  };
}

//--------------------------------------------------------------------------

export function validateExpenseItemView(viewObj) {
  let isEditExisting = viewObj.id != 0;

  validateManifestationView(viewObj);

  if (viewObj.expenseCategory == null) {
    throw "Проверка не удалась: Категория расходов не задана";
  }

  return {
    ...viewObj
  };
}

//--------------------------------------------------------------------------

export function validateBudgetItemView(viewObj) {
  let result = {};

  if (!viewObj.periodFromDate || !viewObj.periodToDate)
    throw "Проверка не удалась: Отчетный период не задан";
  result.periodFromDate = viewObj.periodFromDate;
  result.periodToDate = viewObj.periodToDate;
  //formatDateObj(filterItems[0].value.endDate) + "T00:00:00.000Z";

  if (!viewObj.restaurant || viewObj.restaurant == 0)
    throw "Проверка не удалась: Ресторан не задан";
  result.restaurantId = viewObj.restaurant.id;

  if (!viewObj.budgetType || viewObj.budgetType.id == 0)
    throw "Проверка не удалась: Тип бюджета не задан";
  result.budgetTypeId = viewObj.budgetType.id;

  if (!viewObj.expenseCategory)
    throw "Проверка не удалась: Категория затрат не задана";
  result.expenseCategoryId = viewObj.expenseCategory.id;

  if (!viewObj.manifestation)
    throw "Проверка не удалась: Проявления не указано";
  result.manifestationId = viewObj.manifestation.id;

  if (!viewObj.expenseItem)
    throw "Проверка не удалась: Статья затрат не задана";
  result.expenseItemId = viewObj.expenseItem.id;

  result.isActive = viewObj.isActive;
  result.comment = viewObj.comment;

  //проверка expenses
  let expenses = [];
  for (let i = 0; i < viewObj.expenses.length; i++) {
    let expense = {};
    //пустая строка вместо суммы для нового expense
    if (viewObj.expenses[i].updatedAmount == "" && viewObj.id == 0)
      viewObj.expenses[i].updatedAmount = 0;

    if (!isNumeric(viewObj.expenses[i].updatedAmount))
      throw "Сумма для Бюджета статьи расходов в строке " +
        (i + 1).toString() +
        " не является числом";
    expense.id = viewObj.expenses[i].id || 0;
    expense.updatedAmount = viewObj.expenses[i].updatedAmount;
    expense.currencyId = viewObj.expenses[i].currency.id;
    expense.updatingAmountDate = viewObj.expenses[i].updatingAmountDate;
    //только при редакритровани дата обязательна
    if (expense.id != 0)
      if (!expense.updatingAmountDate || expense.updatingAmountDate == "")
        if (
          !(
            viewObj.expenses[i].updatedAmount == 0 &&
            (viewObj.expenses[i].amount == 0 || !viewObj.expenses[i].amount)
          )
        )
          throw "Дата для Бюджета статьи расходов в строке " +
            (i + 1).toString() +
            " не указана";

    if (
      expense.updatingAmountDate &&
      expense.updatingAmountDate.indexOf("T") < 0
    )
      expense.updatingAmountDate =
        expense.updatingAmountDate + "T00:00:00.000Z";
    expense.updatingAmountUser = viewObj.expenses[i].updatingAmountUser;

    expenses.push(expense);
  }

  result.expenses = JSON.stringify(expenses);

  //Проверка incomes
  let incomes = [];
  for (let i = 0; i < viewObj.incomes.length; i++) {
    let income = {};
    if (!isNumeric(viewObj.incomes[i].amount))
      throw "Сумма для Оплаты статьи расходов в строке " +
        (i + 1).toString() +
        " не является числом";
    income.id = viewObj.incomes[i].id;
    income.amount = viewObj.incomes[i].amount;
    income.currencyId = viewObj.incomes[i].currency.id;
    income.paymentTypeId = viewObj.incomes[i].paymentType.id;
    income.paymentDate = viewObj.incomes[i].paymentDate;

    if (income.amount == 0 || income.amount == null) continue;

    if (!income.paymentDate || income.paymentDate == "")
      throw "Дата для Оплаты статьи расходов в строке " +
        (i + 1).toString() +
        " не указана";

    if (income.paymentDate && income.paymentDate.indexOf("T") < 0)
      income.paymentDate = income.paymentDate + "T00:00:00.000Z";
    income.employeeReceivingCash = viewObj.incomes[i].employeeReceivingCash;

    if (!income.employeeReceivingCash || income.employeeReceivingCash == "")
      throw "Сотрудник для Оплаты статьи расходов в строке " +
        (i + 1).toString() +
        " не указан";

    incomes.push(income);
  }

  result.id = viewObj.id;
  result.incomes = JSON.stringify(incomes);

  return result;
}
