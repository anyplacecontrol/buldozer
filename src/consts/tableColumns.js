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
  accessorSort: "activeFromDate",
  text: "Активация",
  className: "date"
};

export const COLUMN_ACTIVE_TO = {
  accessor: item => dataFuncs.truncateDate(item.activeToDate),      
  accessorSort: "activeToDate",
  text: "Срок дейст.",
  className: "date"
};

export const COLUMN_IS_ACTIVE = {
  accessor: item => (item.isActive ? "Да" : "Нет"),  
  accessorSort: "isActive",
  text: "Активность",
  className: "id"  
}

export const COLUMN_ISSUING_RESTAURANT = {  
  accessor: item => (item.issuingRestaurant ? item.issuingRestaurant.name : ""),  
  accessorSort: "issuingRestaurant",
  text: "Рест. эмит.",
  className: "name"  
}

export const COLUMN_REDEEMER_RESTAURANT = {  
  accessor: item => (item.redeemerRestaurant ? item.redeemerRestaurant.name : ""),  
  accessorSort: "redeemerRestaurant",
  text: "Рест. погас.",
  className: "name"  
}

export const COLUMN_AMOUNT = 
{
  accessor: "amount",
  accessorSort: "amount",
  text: "Номинал, грн",
  className: "price"  
}

export const COLUMN_CREATED_DATE = {
  accessor: item => dataFuncs.truncateDate(item.createdDate),  
  accessorSort: "createdDate",
  text: "Дата добавления",
  className: "name"
};

export const CERTIFICATES_COLUMNS = _addIsDefault([
  {...COLUMN_ID, isVisible: true}, 
  {...COLUMN_CREATED_DATE, isVisible: false},   
  {...COLUMN_ACTIVE_FROM, isVisible: true},
  {...COLUMN_ACTIVE_TO, isVisible: true},
  {...COLUMN_IS_ACTIVE, isVisible: true},
  {...COLUMN_ISSUING_RESTAURANT, isVisible: true},  
  {...COLUMN_AMOUNT, isVisible: true},
]);


//-----------------------------------------------------------------------------
//Restorans

export const COLUMN_NAME = {
  accessor: "name",
  accessorSort: "name",
  text: "Название",
  className: "id"
};

export const RESTAURANTS_COLUMNS = _addIsDefault([
  {...COLUMN_ID, isVisible: true}, 
  {...COLUMN_NAME, isVisible: true}, 
  {...COLUMN_CREATED_DATE, isVisible: true}, 
  {...COLUMN_IS_ACTIVE, isVisible: true},   
]);

//-----------------------------------------------------------------------------
//Контрагенты

export const COLUMN_COMPANY = {
  accessor: "company",
  accessorSort: "company",
  text: "Компания",
  className: "id"
};

export const RECIPIENTS_COLUMNS = _addIsDefault([
  {...COLUMN_COMPANY, isVisible: true}, 
  {...COLUMN_CREATED_DATE, isVisible: true}, 
  {...COLUMN_IS_ACTIVE, isVisible: true},   
]);


//-----------------------------------------------------------------------------
//Администраторы

export const COLUMN_EMAIL = {
  accessor: "email",
  accessorSort: "email",
  text: "E-mail",
  className: "name --lowercase"
};

export const COLUMN_ROLE = {
  accessor: item => item.role ? item.role.name : "",  
  text: "Роль",
  className: "name"
};


export const COLUMN_CREATED_BY = {  
  accessor: item => (item.createdUser ? item.createdUser.email : ""),  
  text: "Кем добавлен",
  className: "name"  
}

export const USERS_COLUMNS = _addIsDefault([
  {...COLUMN_NAME, isVisible: true}, 
  {...COLUMN_EMAIL, isVisible: true},   
  {...COLUMN_ROLE, isVisible: true},   
  {...COLUMN_CREATED_DATE, isVisible: true},   
  {...COLUMN_IS_ACTIVE, isVisible: true},  
  {...COLUMN_CREATED_BY, isVisible: true}
]);

//-----------------------------------------------------------------------------
//Service types 

export const SERVICE_TYPES_COLUMNS = _addIsDefault([
  {...COLUMN_NAME, isVisible: true},   
  {...COLUMN_CREATED_DATE, isVisible: true},       
]);


//-----------------------------------------------------------------------------
//Stats Issuing Restaurants


export const COLUMN_RESTAURANT_NAME = {
  accessor: "restaurantName",
  accessorSort: "restaurantName",
  text: "Ресторан",
  className: "name"
};

export const COLUMN_ALL_COUNT = {
  accessor: "allCount",
  accessorSort: "allCount",
  text: "Серт. всего",
  className: "short-name"
};

export const COLUMN_ALL_AMOUNT = {
  accessor: "allAmount",
  accessorSort: "allAmount",
  text: "Сумма, грн",
  className: "price"
};
 
export const COLUMN_REDEEMED_COUNT = {
  accessor: "redeemedCount",
  accessorSort: "redeemedCount",
  text: "Серт. погаш.",
  className: "short-name"
};

export const COLUMN_REDEEMED_AMOUNT = {
  accessor: "redeemedAmount",
  accessorSort: "redeemedAmount",
  text: "Сумма погаш., грн",
  className: "name"
};
 
export const COLUMN_ACTIVE_COUNT = {
  accessor: "activeCount",
  accessorSort: "activeCount",
  text: "Серт. акт.",
  className: "short-name"
};

export const COLUMN_ACTIVE_AMOUNT = {
  accessor: "activeAmount",
  accessorSort: "activeAmount",
  text: "Сумма акт., грн",
  className: "price"
};

 
export const STATS_ISSUING_RESTAURANTS_COLUMNS = _addIsDefault([
  {...COLUMN_RESTAURANT_NAME, isVisible: true},   
  {...COLUMN_ALL_COUNT, isVisible: true},       
  {...COLUMN_ACTIVE_COUNT, isVisible: true},       
  {...COLUMN_REDEEMED_COUNT, isVisible: true},       
  {...COLUMN_ALL_AMOUNT, isVisible: true},       
  {...COLUMN_ACTIVE_AMOUNT, isVisible: true},       
  {...COLUMN_REDEEMED_AMOUNT, isVisible: true},       
]);


//-----------------------------------------------------------------------------
//Stats Redeemer Restaurants

export const STATS_REDEEMER_RESTAURANTS_COLUMNS = _addIsDefault([
  {...COLUMN_RESTAURANT_NAME, isVisible: true},   
  {...COLUMN_REDEEMED_COUNT, isVisible: true},       
  {...COLUMN_REDEEMED_AMOUNT, isVisible: true},       
]);

//-----------------------------------------------------------------------------
//Stats RECIPIENTS

export const COLUMN_RECIPIENT_COMPANY = {
  accessor: "recipientCompany",
  accessorSort: "recipientCompany",
  text: "Контрагент",
  className: "name"
};

export const STATS_RECIPIENTS_COLUMNS = _addIsDefault([
  {...COLUMN_RECIPIENT_COMPANY, isVisible: true},   
  {...COLUMN_ALL_COUNT, isVisible: true},       
  {...COLUMN_ACTIVE_COUNT, isVisible: true},       
  {...COLUMN_REDEEMED_COUNT, isVisible: true},       
  {...COLUMN_ALL_AMOUNT, isVisible: true},       
  {...COLUMN_ACTIVE_AMOUNT, isVisible: true},       
  {...COLUMN_REDEEMED_AMOUNT, isVisible: true},       
]);

//-----------------------------------------------------------------------------
//Stats Unused Cert

export const COLUMN_EXPIRED_COUNT = {
  accessor: "expiredCount",
  accessorSort: "expiredCount",
  text: "Просрочен. серт.",
  className: "name"
};

export const COLUMN_EXPIRED_AMOUNT = {
  accessor: "expiredAmount",
  accessorSort: "expiredAmount",
  text: "Сумма просроч. серт., грн",
  className: "name"
};

export const STATS_UNUSED_CERTIFICATES_COLUMNS = _addIsDefault([
  {...COLUMN_RESTAURANT_NAME, isVisible: true},   
  {...COLUMN_ALL_COUNT, isVisible: true},       
  {...COLUMN_ALL_AMOUNT, isVisible: true},         
  {...COLUMN_EXPIRED_COUNT, isVisible: true},       
  {...COLUMN_EXPIRED_AMOUNT, isVisible: true},       
]);

//-----------------------------------------------------------------------------
//statsMutualSettlement

export const COLUMN_CARD_ID = {
  accessor: item => (item.card ? item.card.id : ""),    
  text: "ID карты",
  className: "id",
  accessorSort: "card",  
}

export const COLUMN_CERT_ID = {
  accessor: "id",  
  text: "ID серт",
  className: "id",
  accessorSort: "id",  
};

export const COLUMN_CERT_KIND = {
  accessor: (item) => {
    if (item.isPartiallyRedeemable === true) return "Частично погаш" 
    if (item.isPartiallyRedeemable === false) return "Обычный"     
  },    
  accessorSort: "isPartiallyRedeemable",
  text: "Тип серт",
  className: "id",    
}

export const COLUMN_RECIPIENT = {  
  accessor: item => (item.recipient ? item.recipient.company : ""),  
  accessorSort: "recipient",
  text: "Контрагент",
  className: "name"
};

export const SERVICE_TYPE_NAME = {
  accessor: item => (item.serviceType  ? item.serviceType.name : ""),      
  text: "Вид услуг",
  className: "id",
  accessorSort: "serviceType", 
}


export const CERT_STATUS = {
  accessor: (item) => {
    if (item.isActive === true) return "Активен";
    if (item.isActive === false) return "Погашен"
  },     
  text: "Вид серт",
  className: "id",  
  accessorSort: "isActive",
}


export const USED_AMOUNT = {
  accessor: item => item.usedAmount,      
  text: "Погаш., грн",
  className: "price",
  accessorSort: "amount",  
}

export const COLUMN_OSTATOK = 
{
  accessor: "balance",
  accessorSort: "balance",
  text: "Остаток, грн",
  className: "price"  
}

export const COLUMN_COMMENT = 
{
  accessor: "recipientComment",  
  text: "Комментарий",
  className: "name"  
}

export const COLUMN_REDEEMER_RESTAURANTS = {
  accessor: item => {
    if (!item.redeemerRestaurants)
      return ""
    let result = "";

    if (item.redeemerRestaurants.length>0) {
    result = item.redeemerRestaurants[0].name;    
    if (item.redeemerRestaurants.length > 1)
      result = result + "...";
    }

    return result;
  },      
  text: "Ресторан погас.",
  className: "name"  
}


export const STATS_MUTUAL_SETTLEMENT_COLUMNS = _addIsDefault([
  {...COLUMN_CARD_ID, isVisible: true}, 
  {...COLUMN_CERT_ID, isVisible: true},   
  {...COLUMN_OSTATOK, isVisible: true},      
  {...USED_AMOUNT, isVisible: true},        
  {...COLUMN_CERT_KIND, isVisible: true},   
  {...COLUMN_ISSUING_RESTAURANT, isVisible: true},    
  {...COLUMN_RECIPIENT, isVisible: true},    
  {...SERVICE_TYPE_NAME, isVisible: true},      
  {...CERT_STATUS, isVisible: true},      
  {...COLUMN_AMOUNT, isVisible: true},
  {...COLUMN_REDEEMER_RESTAURANTS, isVisible: true},  
  {...COLUMN_COMMENT, isVisible: true},  
]);

//-----------------------------------------------------------------------------
//Cards

export const COLUMN_BALANCE = 
{
  accessor: "balance",
  accessorSort: "balance",
  text: "Баланс, грн",
  className: "price"  
}

export const CARDS_COLUMNS = _addIsDefault([
  {...COLUMN_ID, isVisible: true}, 
  {...COLUMN_CREATED_DATE, isVisible: false},   
  {...COLUMN_IS_ACTIVE, isVisible: true},
  {...COLUMN_RECIPIENT, isVisible: true},  
  {...COLUMN_BALANCE, isVisible: true},
]);

//-----------------------------------------------------------------------------
//User Roles

export const USER_ROLES_COLUMNS = _addIsDefault([
  {...COLUMN_NAME, isVisible: true},   
  {...COLUMN_ID, isVisible: true},       
]);
