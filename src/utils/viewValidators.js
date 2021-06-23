import {isEmpty} from "./serviceFunctions";
import * as serviceFuncs from "./serviceFunctions";

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export function isEmptyString(value) {
  return value == null || value == "" || typeof value == "undefined";
}

export function isEmptyOrLongString(value) {
  if (isEmptyString(value)) return true;
  if (value.length > 255) return true;
}

export function isLongString(value) {
  if (isEmptyString(value)) return false;
  if (value.length > 255) return true;
}

export function validateProductView(productView) {
  if (
    isEmptyString(productView.name) ||
    isEmptyString(productView.masterProductGroupName) ||
    // isEmptyString(productView.slug) ||
    !productView.categories ||
    productView.categories.length === 0
  ) {
    throw "Validation failed: empty or too long fields";
  }

  if (
    isLongString(productView.name) ||
    isLongString(productView.masterProductGroupName) ||
    // isLongString(productView.slug) ||
    isLongString(productView.description) ||
    isLongString(productView.additionalDescription)
  ) {
    throw "Validation failed: too long fields (>255 characters)";
  }

  let price = 0;
  if (isNumeric(productView.price)) {
    price = parseFloat(productView.price);
    price = (price * 100).toFixed(0);
  } else price = 0;

  if (price == 0) {
    throw "Validation failed: Price is incorrect";
  }

  if (!productView.images.length > 0) {
    throw "Validation failed: Image is empty";
  }

  let result = {
    id: productView.id,
    name: productView.name,
    // slug: productView.slug.replace(/\s/g, ""),
    category: productView.categories[0].slug,
    description: productView.description,
    additionalDescription: productView.additionalDescription,
    categories: productView.categories,
    price: price,
    priority: productView.priority,
    tags: productView.tags,
    images: productView.images,
    masterProductGroupName: productView.masterProductGroupName,
    metricId: productView.metric ? productView.metric.id : null,
    translations: productView.translations,

    prevCategories: productView.prevCategories,
    prevTags: productView.prevTags,
    prevImages: productView.prevImages
  };

  if (productView.status && productView.status.id) {
    result.status = productView.status.id;
  }

  return result;
}

export function validateCategoryView(categoryView) {
  if (isEmptyString(categoryView.name) || isEmptyString(categoryView.slug))
    throw "Validation failed: empty or too long fields";

  if (
    isLongString(categoryView.name) ||
    isLongString(categoryView.slug) ||
    isLongString(categoryView.description)
  ) {
    throw "Validation failed: too long fields (>255 characters)";
  }

  if (!categoryView.image) {
    throw "Validation failed: image is required";
  }

  return {
    id: categoryView.id,
    name: categoryView.name,
    slug: categoryView.slug.replace(/\s/g, ""),
    priority: categoryView.priority,
    description: categoryView.description,
    image: categoryView.image,
    translations: categoryView.translations,

    prevImage: categoryView.prevImage
  };
}

export function validateTagView(tagView) {
  if (isEmptyString(tagView.name)) {
    throw "Validation failed: empty fields";
  }

  return {
    id: tagView.id,
    name: tagView.name
  };
}

export function validateCookingTipsView(cookingTip) {
  if (isEmptyString(cookingTip.title) || isEmptyString(cookingTip.text)) {
    throw "Validation failed: empty fields";
  }

  return {
    id: cookingTip.id,
    title: cookingTip.title,
    text: cookingTip.text,
    product: cookingTip.product
  };
}

// export function validateStatusView(statusView) {
//   if (isEmptyString(statusView.name) ) {
//     throw "Error. Field Name is empty";
//   }

//   return statusView;
// }

export function validateStoreView(storeView) {
  if (isEmptyString(storeView.name) /*|| isEmptyString(storeView.slug)*/) {
    throw "Validation failed: empty fields";
  }

  if (
    !isEmptyString(storeView.machineId) &&
    !serviceFuncs.isUUID(storeView.machineId)
  ) {
    throw "Validation failed: machine ID has invalid format";
  }

  storeView = JSON.parse(JSON.stringify(storeView));

  if (
    !storeView.address.coordinates ||
    !storeView.address.coordinates.latitude ||
    !storeView.address.coordinates.longitude ||
    !storeView.address.country ||
    !storeView.address.state ||
    !storeView.address.zip ||
    !storeView.address.city ||
    !storeView.address.address ||
    !storeView.address.contactPerson ||
    !storeView.address.phone
  ) {
    throw "Validation failed: all address fields are required";
  }

  for (let i = 0; i < storeView.WorkHours.length; i++) {
    let workDay = storeView.WorkHours[i];
    if (!workDay.isDayOff) {
      if (isEmptyString(workDay.openTime)) {
        throw "Validation failed: openTime for one of working days is empty";
      }
      if (isEmptyString(workDay.closeTime)) {
        throw "Validation failed: closeTime for one of working days is empty";
      }
    }

    if (!workDay.isDefault && isEmptyString(workDay.specialDate)) {
      throw "Validation failed: field 'Special Date' is empty for one of special days";
    }

    if (!workDay.isDefault) {
      workDay.specialDate = new Date(workDay.specialDate);
    }
  }

  let result = {
    id: storeView.id,
    slug: storeView.slug,
    WorkHours: storeView.WorkHours,
    machineId: storeView.machineId,
    name: storeView.name,
    address: storeView.address,
    image: storeView.image,

    prevImage: storeView.prevImage,
    prevAddress: storeView.prevAddress,
    prevWorkHours: storeView.prevWorkHours
  };

  if (storeView.status && storeView.status.id) {
    result.statusId = storeView.status.id;
  }

  return result;
}

export function validateMachineView(machineView) {
  if (
    isEmptyString(machineView.inventoryNumber) ||
    isEmptyString(machineView.name)
  ) {
    throw "Validation failed: empty fields";
  }

  let result = {
    id: machineView.id,
    name: machineView.name,
    details: machineView.details,
    inventoryNumber: machineView.inventoryNumber,
    kioskIds: machineView.kioskIds,
    address: machineView.address,
    manufacturer: machineView.manufacturer,
    model: machineView.model,
    inboundQueue: machineView.inboundQueue,
    outboundQueue: machineView.outboundQueue,

    prevAddress: machineView.prevAddress,
    prevManufacturer: machineView.prevManufacturer,
    prevModel: machineView.prevModel
  };

  if (machineView.status && machineView.status.id) {
    result.statusId = machineView.status.id;
  }

  return result;
}

export function validateKioskView(view) {
  if (isEmptyString(view.inventoryNumber)) {
    throw "Validation failed: empty fields";
  }

  return {
    id: view.id,
    details: view.details,
    inventoryNumber: view.inventoryNumber,
    machineId: view.machineId,
    address: view.address,
    manufacturer: view.manufacturer,
    model: view.model,
    hideSleepScreen: view.hideSleepScreen,

    prevAddress: view.prevAddress,
    prevManufacturer: view.prevManufacturer,
    prevModel: view.prevModel
  };
}

export function validateMetricButtons(
  metricButtonsObj,
  parameterName,
  language
) {
  if (!metricButtonsObj || !metricButtonsObj.buttons) return;

  for (let i = 0; i < metricButtonsObj.buttons.length; i++) {
    let button = metricButtonsObj.buttons[i];
    if (!button) continue;

    if (
      button.id &&
      (!button.text ||
        button.text.length === 0 ||
        isEmptyString(button.text[0]))
    )
      throw parameterName +
      " button text for id " +
      button.id +
      " in language '" +
      language +
      "' is empty";

    if (
      !button.id &&
      button.text && !isEmptyString(button.text[0]) &&
      language === "en"
    )
      throw "One of IDs for " + parameterName + " button is empty";
  }

  if (
    !metricButtonsObj.buttons[0] ||
    isEmptyString(metricButtonsObj.buttons[0].id)
  )
    metricButtonsObj.buttons[0] = null;
  if (
    !metricButtonsObj.buttons[1] ||
    isEmptyString(metricButtonsObj.buttons[1].id)
  )
    metricButtonsObj.buttons[1] = null;
  if (
    !metricButtonsObj.buttons[2] ||
    isEmptyString(metricButtonsObj.buttons[2].id)
  )
    metricButtonsObj.buttons[2] = null;

  return metricButtonsObj;
}

function validateMetricButtonsForLanguage(metricUi, parameterName, language) {
  metricUi[parameterName] = validateMetricButtons(
    metricUi[parameterName],
    parameterName,
    language
  );
}

function validateTotalWeightForLanguage(metricUi, language) {
  if (!metricUi.totalWeight) return;

  if (
    isEmptyString(metricUi.totalWeight[0]) &&
    isEmptyString(metricUi.totalWeight[1])
  )
    metricUi.totalWeight = null;
  else if (
    (isEmptyString(metricUi.totalWeight[0]) &&
      !isEmptyString(metricUi.totalWeight[1])) ||
    (isEmptyString(metricUi.totalWeight[1]) &&
      !isEmptyString(metricUi.totalWeight[0]))
  )
    throw "Both fields for Total Weight panel in language '" +
    language +
    "' should be either empty or non-empty";
}

function copyButtonsIds(source, destination) {
  if (!source || !destination) return;

  if (!source.buttons) {
    destination.buttons = null;
    return;
  }

  destination.buttons = destination.buttons || [];

  for (let i = 0; i < source.buttons.length; i++) {
    if (!source.buttons[i] || !source.buttons[i].id) {
      destination.buttons[i] = null;
      continue;
    }

    destination.buttons[i] = destination.buttons[i] || {};
    destination.buttons[i].id = source.buttons[i].id;
  }
}

function validateWeightRules(view) {
  let isNaN = maybeNaN => maybeNaN != maybeNaN;

  if (view.rules && view.rules.weight && view.rules.weight.values_transformed) {
    let values_transformed = view.rules.weight.values_transformed;
    for (let i = 0; i < values_transformed.length; i++) {
      if (view.metricUi.weight.buttons[i].id != null) {
        let obj = values_transformed[i];
        let min = parseFloat(obj.min);
        if (isNaN(min))
          throw "Min value for weight (button " +
          (i + 1) +
          ") has incorrect format";
        let max = parseFloat(obj.max);
        if (isNaN(max))
          throw "Max value for weight (button " +
          (i + 1) +
          ") has incorrect format";
      }
    }
  } else {
    //check if all buttons ids are null
    for (let i = 0; i < view.metricUi.weight.buttons.length; i++) {
      if (view.metricUi.weight.buttons[i].id != null)
        throw "Min and Max values for weight buttons are not specified"
    }

  }
}

export function validateMetricView(view) {
  if (isEmptyString(view.name) || isEmptyString(view.metricUi.priceMeasure)) {
    throw "Validation failed: empty fields";
  }

  let newMetricUi = JSON.parse(JSON.stringify(view.metricUi));
  let newTranslations = view.translations
    ? JSON.parse(JSON.stringify(view.translations))
    : {};

  //Validate rules for weight
  if (
    newMetricUi.weight &&
    newMetricUi.weight.buttons &&
    newMetricUi.weight.buttons.length > 0
  )
    validateWeightRules(view);

  //validate buttons panels for english
  validateMetricButtonsForLanguage(newMetricUi, "weight", "en");
  validateMetricButtonsForLanguage(newMetricUi, "thickness", "en");
  validateMetricButtonsForLanguage(newMetricUi, "marbling", "en");
  //validate total weight for english
  validateTotalWeightForLanguage(newMetricUi, "en");

  //validate for other languages
  for (var language in newTranslations) {
    let langMetricUi = newTranslations[language].metricUi;
    if (!langMetricUi) continue;

    //validate buttons panels
    if (!newMetricUi.weight) langMetricUi.weight = null;
    else {
      if (langMetricUi.weight) langMetricUi.weight.isChecked = true;
    }
    validateMetricButtonsForLanguage(langMetricUi, "weight", language);
    if (!newMetricUi.thickness) langMetricUi.thickness = null;
    else {
      if (langMetricUi.thickness) langMetricUi.thickness.isChecked = true;
    }
    validateMetricButtonsForLanguage(langMetricUi, "thickness", language);
    if (!newMetricUi.marbling) langMetricUi.marbling = null;
    else {
      if (langMetricUi.marbling) langMetricUi.marbling.isChecked = true;
    }
    validateMetricButtonsForLanguage(langMetricUi, "marbling", language);

    //copy buttons IDs from english to other language
    copyButtonsIds(newMetricUi.weight, langMetricUi.weight);
    copyButtonsIds(newMetricUi.thickness, langMetricUi.thickness);
    copyButtonsIds(newMetricUi.marbling, langMetricUi.marbling);

    //validate total weight
    if (!newMetricUi.totalWeight) langMetricUi.totalWeight = null;
    validateTotalWeightForLanguage(langMetricUi, language);
  }

  return {
    id: view.id,
    name: view.name,
    description: view.description,
    metricUi: newMetricUi,
    translations: newTranslations,
    rules: JSON.parse(JSON.stringify(view.rules)),
  };
}

export function getPhoneValidationError(phone) {
  if (isEmptyString(phone)) return null;

  if (phone.indexOf(" ") > 0) return "Spaces are not allowed";

  if (phone.length < 10) return "Too short phone number";

  //Invalid characters
  let filter = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
  if (filter.test(phone)) {
    return null;
  } else {
    return "Invalid characters";
  }

  return null;
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

export function getPhonesValidationError(phones) {
  if (phones.indexOf(" ") > 0) return "Spaces are not allowed";

  let phonesArr = splitCommaToArray(phones);

  for (let i = 0; i < phonesArr.length; i++) {
    let result = getPhoneValidationError(phonesArr[i]);
    if (result) return result;
  }

  return null;
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

export function validateCustomerView(customerView_) {
  let customerView = {...customerView_};
  if (
    isEmptyString(customerView.name) &&
    isEmptyString(customerView.email) &&
    isEmptyString(customerView.phone)
  )
    throw "Please specify either name or email or phone";

  //validate phones
  let error = getPhoneValidationError(customerView.phone);
  if (error) throw error;

  error = getPhonesValidationError(customerView.secondaryPhones_asString);
  if (error) throw error;
  else
    customerView.secondaryPhones = splitCommaToArray(
      customerView.secondaryPhones_asString
    );

  //validate email
  error = getEmailValidationError(customerView.email);
  if (error) throw error;

  error = getEmailsValidationError(customerView.secondaryEmails_asString);
  if (error) throw error;
  else
    customerView.secondaryEmails = splitCommaToArray(
      customerView.secondaryEmails_asString
    );

  return customerView;
}

// admin validation
export function validateUserView(userView_) {
  let userView = {...userView_};
  if (
    isEmptyString(userView.firstName) &&
    isEmptyString(userView.lastName) &&
    isEmptyString(userView.email) &&
    isEmptyString(userView.phone)
  ) {
    throw "Please specify either names or email or phone";
  }

  //validate phones
  let error = getPhoneValidationError(userView.phone);
  if (error) {
    throw error;
  }

  //validate email
  error = getEmailValidationError(userView.email);
  if (error) {
    throw error;
  }

  return userView;
}

export function validateMobileUserView(mobileUserView_) {
  let mobileUserView = {...mobileUserView_};
  if (
    isEmptyString(mobileUserView.firstName) &&
    isEmptyString(mobileUserView.lastName) &&
    isEmptyString(mobileUserView.email) &&
    isEmptyString(mobileUserView.phone)
  ) {
    throw "Please specify either names or email or phone";
  }

  //validate phones
  let error = getPhoneValidationError(mobileUserView.phone);
  if (error) {
    throw error;
  }

  //validate email
  error = getEmailValidationError(mobileUserView.email);
  if (error) {
    throw error;
  }

  return mobileUserView;
}

export function getNonTranslatableViewFieldClass(
  viewItem,
  fieldName,
  fieldType,
  canNotBeEmpty
) {
  if (viewItem.language != "en") return "hidden";

  let result = "block-set__input animated"; //<input>

  if (fieldType === "textarea")
    //<textarea>
    result = "block-set__text-area animated";

  //select kind of validation: isLongString or isEmptyOrLongString
  let checkProcedure = isLongString;
  if (canNotBeEmpty) checkProcedure = isEmptyOrLongString;

  if (!viewItem.isValidated || !checkProcedure(viewItem[fieldName]))
    return result;
  else return result + " is--error";
}

export function getNonTranslatableSelectBoxClass(viewItem, isError) {
  if (viewItem.language != "en") return "hidden";

  let result = "w100";

  if (!viewItem.isValidated || !isError) return result;
  else return result + " is--error";
}
