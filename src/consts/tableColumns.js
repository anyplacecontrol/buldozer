import React from "react";
import * as dataFuncs from "../utils/dataFuncs";
import PropTypes from "prop-types";
import {formatPrice} from "../utils/dataFuncs";

export const IColumn = PropTypes.shape({
  accessor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  accessorSort: PropTypes.oneOfType([PropTypes.func, PropTypes.string]), //if null -  do not sort. otherwise use data item accessor to sort data
  text: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired
});

function _addIsDefault(columns) {
  for (let i = 0; i < columns.length; i++) {
    let column = columns[i];
    column.isDefault = column.isVisible;
  }
  return columns;
}

//-----------------------------------------------------------------------------
//Certificates

export const COLUMN_ID = {
  accessor: "id",
  accessorSort: "id",
  text: "ID",
  className: "id"
};

export const COLUMN_ACTIVE_FROM = {
  accessor: item => dataFuncs.truncateDate(item.activeFromDate),  
  accessorSort: "active_from_date",
  text: "Активация",
  className: "date"
};

export const COLUMN_ACTIVE_TO = {
  accessor: item => dataFuncs.truncateDate(item.activeToDate),      
  accessorSort: "active_to_date",
  text: "Срок дейст.",
  className: "date"
};

export const COLUMN_IS_ACTIVE = {
  accessor: item => (item.isActive ? "Да" : "Нет"),  
  accessorSort: "is_active",
  text: "Активность",
  className: "status"  
}

export const COLUMN_ISSUING_RESTAURANT = {  
  accessor: item => (item.issuingRestaurant ? item.issuingRestaurant.name : ""),  
  accessorSort: "issuing_restaurant_id",
  text: "Рест. эмит.",
  className: "name"  
}

export const COLUMN_REDEEMER_RESTAURANT = {  
  accessor: item => (item.redeemerRestaurant ? item.redeemerRestaurant.name : ""),  
  accessorSort: "redeemer_restaurant_id",
  text: "Рест. погас.",
  className: "name"  
}

export const COLUMN_AMOUNT = 
{
  accessor: "amount",
  accessorSort: "amount",
  text: "Номинал",
  className: "price"  
}

export const CERTIFICATES_COLUMNS = _addIsDefault([
  {...COLUMN_ID, isVisible: true}, 
  {...COLUMN_ACTIVE_FROM, isVisible: true},
  {...COLUMN_ACTIVE_TO, isVisible: true},
  {...COLUMN_IS_ACTIVE, isVisible: true},
  {...COLUMN_ISSUING_RESTAURANT, isVisible: true},
  {...COLUMN_REDEEMER_RESTAURANT, isVisible: true},
  {...COLUMN_AMOUNT, isVisible: true},
]);


//-----------------------------------------------------------------------------
//Certificates

export const COLUMN_NAME = {
  accessor: "name",
  accessorSort: "name",
  text: "Название",
  className: "id"
};

export const COLUMN_CREATED_DATE = {
  accessor: item => dataFuncs.truncateDate(item.createdDate),  
  accessorSort: "createdDate",
  text: "Дата добавления",
  className: "name"
};


export const RESTAURANTS_COLUMNS = _addIsDefault([
  {...COLUMN_NAME, isVisible: true}, 
  {...COLUMN_CREATED_DATE, isVisible: true}, 
  {...COLUMN_IS_ACTIVE, isVisible: true},   
]);

//-----------------------------------------------------------------------------
//Контрагенты


export const RECIPIENTS_COLUMNS = _addIsDefault([
  {...COLUMN_NAME, isVisible: true}, 
  {...COLUMN_CREATED_DATE, isVisible: true}, 
  {...COLUMN_IS_ACTIVE, isVisible: true},   
]);


//-----------------------------------------------------------------------------
//Администраторы

export const COLUMN_EMAIL = {
  accessor: "email",
  accessorSort: "email",
  text: "E-mail",
  className: "name"
};


export const COLUMN_CREATED_BY = {  
  accessor: item => (item.createdBy ? item.createdBy.email : ""),  
  text: "Кем добавлен",
  className: "name"  
}

export const USERS_COLUMNS = _addIsDefault([
  {...COLUMN_NAME, isVisible: true}, 
  {...COLUMN_EMAIL, isVisible: true},   
  {...COLUMN_CREATED_DATE, isVisible: true},   
  {...COLUMN_IS_ACTIVE, isVisible: true},  
  {...COLUMN_CREATED_BY, isVisible: true}
]);