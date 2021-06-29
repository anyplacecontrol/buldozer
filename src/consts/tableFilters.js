import PropTypes from "prop-types";

export const IFilterItems = PropTypes.arrayOf(
  PropTypes.shape({
    type: PropTypes.string.isRequired,
    apiParamName: PropTypes.string.isRequired,
    labelText: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object
      ])
    ),
    accessorText: PropTypes.func,
    accessorApi: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object,
      PropTypes.array
    ])
  })
);

function _addDefaultValue(obj) {
  return { ...obj, defaultValue: obj.value };
}

//------------------------------------------------------------------------
// Certificates

export const FILTER_ID = _addDefaultValue({
  type: "input",
  apiParamName: "id",
  labelText: "ID",
  value: ""
});

export const FILTER_ISACTIVE = _addDefaultValue({
  type: "selectBox",
  apiParamName: "isActive",
  labelText: "Активность",
  items: [
    { name: "Все", value: null },
    { name: "Только активные", value: "true" },
    { name: "Только неактивные", value: "false" }
  ], //items are store objects
  accessorText: item => item.name,
  accessorApi: item => item.value,
  value: ""
});

export const FILTER_ACTIVATION_DATE = _addDefaultValue({
  type: "dateRange",
  apiParamName: "activationDate",
  labelText: "Дата активации серт.",
  value: {startDate: null, endDate: null}
});

export const FILTER_VALIDITY_DATE = _addDefaultValue({
  type: "dateRange",
  apiParamName: "validityDate",
  labelText: "Срок действия серт.",
  value: {startDate: null, endDate: null}
});

export const FILTER_ISSUING_RESTAURANT = _addDefaultValue({
  type: "multiSelectBox",
  apiParamName: "issuingRestaurants",
  labelText: "Ресторан-эмитент",
  items: [ ], //items are store objects
  accessorText: item => item.name,
  accessorApi: item => item.id,
  value: []
});


export const FILTER_REDEEMER_RESTAURANT = _addDefaultValue({
  type: "multiSelectBox",
  apiParamName: "redeemerRestaurants",
  labelText: "Ресторан погашающий",
  items: [ ], //items are store objects
  accessorText: item => item.name,
  accessorApi: item => item.id,
  value: []
});

export const FILTER_RECIPIENT = _addDefaultValue({
  type: "selectBox",
  apiParamName: "recipientId",
  labelText: "Контрагент",
  items: [ ], //items are store objects
  accessorText: item => item.name,
  accessorApi: item => item.id,
  value: ""
});

//------------------------------------------------------------------
// Рестораны

export const FILTER_NAME = _addDefaultValue({
  type: "input",
  apiParamName: "name",
  labelText: "Название",
  value: ""
});

export const FILTER_CREATED_DATE = _addDefaultValue({
  type: "dateRange",
  apiParamName: "createdDate",
  labelText: "Дата добавления",
  value: {startDate: null, endDate: null}
});

//------------------------------------------------------------------
// Контрагенты

export const FILTER_COMPANY = _addDefaultValue({
  type: "input",
  apiParamName: "company",
  labelText: "Компания",
  value: ""
});


//------------------------------------------------------------------
// Администраторы

export const FILTER_EMAIL = _addDefaultValue({
  type: "input",
  apiParamName: "email",
  labelText: "E-mail администратора",
  value: ""
});

export const FILTER_CREATED_BY = _addDefaultValue({
  type: "input",
  apiParamName: "email",
  labelText: "E-mail кем добавлено",
  value: ""
});

// export const FILTER_THICKNESS = _addDefaultValue({
//   type: "multiSelectBox",
//   apiParamName: "cutThickness",
//   labelText: "Thickness",
//   items: [{text: "1 Inch", value: 1}, {text: "1.5 Inch", value: 2}, {text: "2 Inch", value: 3}],
//   accessorText: item => item.text,
//   accessorApi: item => item.value,
//   value: []
// });

// export const FILTER_PRICE = _addDefaultValue({
//   type: "sliderRange",
//   apiParamName: "price",
//   labelText: "Price",
//   minValue: 0,
//   maxValue: 100,
//   value: {startValue: 0, endValue: 100, }
// });

