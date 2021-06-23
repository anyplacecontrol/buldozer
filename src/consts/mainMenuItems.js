import {ROUTE_NAMES} from "./routeNames";

export const MAIN_MENU_ITEMS = [
  
  {
    name: "Сертификаты",
    cssCls: "kiosk",
    path: ROUTE_NAMES.certificates,
    comment: "",
    items: [
      {
        name: "Сертификаты",
        path: ROUTE_NAMES.certificateView,
        isHidden: true,
        comment: "",
      }
    ]
  },

  {
    name: "Контрагенты",
    cssCls: "kiosk",
    path: ROUTE_NAMES.recipients,
    comment: "",
    items: [
      {
        name: "Контрагенты",
        path: ROUTE_NAMES.recipientView,
        isHidden: true,
        comment: "",
      }
    ]
  },

  {
    name: "Рестораны",
    cssCls: "kiosk",
    path: ROUTE_NAMES.restaurants,
    comment: "",
    items: [
      {
        name: "Контрагенты",
        path: ROUTE_NAMES.restaurantView,
        isHidden: true,
        comment: "",
      }
    ]
  },

  {
    name: "Администраторы",
    cssCls: "kiosk",
    path: ROUTE_NAMES.users,
    comment: "",
    items: [
      {
        name: "Администраторы",
        path: ROUTE_NAMES.userView,
        isHidden: true,
        comment: "",
      }
    ]
  }

];
