import { ROUTE_NAMES } from "./routeNames";

export const MAIN_MENU_ITEMS = [
  {
    name: "Карточки",
    cssCls: "certificates",
    path: ROUTE_NAMES.cards,
    comment: "",
    items: [
      {
        name: "Карточка",
        path: ROUTE_NAMES.cardView,
        isHidden: true,
        comment: ""
      }
    ]
  },

  {
    name: "Сертификаты",
    cssCls: "certificates",
    path: ROUTE_NAMES.certificates,
    comment: "",
    items: [
      {
        name: "Сертификат",
        path: ROUTE_NAMES.certificateView,
        isHidden: true,
        comment: ""
      }
    ]
  },

  {
    name: "Контрагенты",
    cssCls: "customers",
    path: ROUTE_NAMES.recipients,
    comment: "",
    items: [
      {
        name: "Контрагент",
        path: ROUTE_NAMES.recipientView,
        isHidden: true,
        comment: ""
      }
    ]
  },

  {
    name: "Рестораны",
    cssCls: "stores",
    path: ROUTE_NAMES.restaurants,
    comment: "",
    items: [
      {
        name: "Ресторан",
        path: ROUTE_NAMES.restaurantView,
        isHidden: true,
        comment: ""
      }
    ]
  },

  {
    name: "Пользователи",
    cssCls: "users",
    path: ROUTE_NAMES.users,
    comment: "",
    items: [
      {
        name: "Пользователь",
        path: ROUTE_NAMES.userView,
        isHidden: true,
        comment: ""
      },
      {
        name: "Роли",
        path: ROUTE_NAMES.userRoles,
        isHidden: false,
        comment: ""
      },     
    ]
  },

  {
    name: "Виды услуг",
    cssCls: "services",
    path: ROUTE_NAMES.serviceTypes,
    comment: "",
    items: [
      {
        name: "Вид Услуг",
        path: ROUTE_NAMES.serviceTypeView,
        isHidden: true,
        comment: ""
      }
    ]
  },

  {
    name: "Статистика",
    cssCls: "reports",
    path: ROUTE_NAMES.statsIssuingRestaurants,
    comment: "",
    items: [
      {
        name: "По рестор. эмит-ах",
        path: ROUTE_NAMES.statsIssuingRestaurants,
        isHidden: false,
        comment: ""
      },
      {
        name: "По рестор. погасит.",
        path: ROUTE_NAMES.statsRedeemerRestaurants,
        isHidden: false,
        comment: ""
      },
      {
        name: "По контрагентам",
        path: ROUTE_NAMES.statsRecipients,
        isHidden: false,
        comment: ""
      },
      {
        name: "По неиспольз. серт.",
        path: ROUTE_NAMES.statsUnusedCertificates,
        isHidden: false,
        comment: ""
      },  
      {
        name: "Взаиморасчет",
        path: ROUTE_NAMES.statsMutualSettlement,
        isHidden: false,
        comment: ""
      },  
          
    ]
  },

  
  {
    name: "Бюджет",
    cssCls: "budget",
    path: ROUTE_NAMES.budgetTable,
    comment: "",
    items: [
      {
        name: "Бюджет",
        path: ROUTE_NAMES.budgetTable,
        isHidden: false,
        comment: ""
      },
        {
          name: "Создание статьи бюджета",
          path: ROUTE_NAMES.budgetView,
          isHidden: true,
          comment: ""
        },
      {
        name: "Категории расходов",
        path: ROUTE_NAMES.expenseCategories,
        isHidden: false,
        comment: ""
      },
          {
            name: "Категория расходов",
            path: ROUTE_NAMES.expenseCategoryView,
            isHidden: true,
            comment: ""
          },
      {
        name: "Статьи расходов",
        path: ROUTE_NAMES.expenseItems,
        isHidden: false,
        comment: ""
      },
          {
            name: "Статья расходов",
            path: ROUTE_NAMES.expenseItemView,
            isHidden: true,
            comment: ""
          },
      {
        name: "Проявления",
        path: ROUTE_NAMES.manifestations,
        isHidden: false,
        comment: ""
      },      
          {
            name: "Проявление",
            path: ROUTE_NAMES.manifestationView,
            isHidden: true,
            comment: ""
          },                
    ]
  }
];
