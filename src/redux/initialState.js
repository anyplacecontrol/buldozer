import { uiInitialState } from "./modules/uiRedux";
import { routingInitialState } from "./modules/routingRedux";

import { serviceTypesInitialState } from "./modules/serviceTypesRedux";
import { serviceTypeViewInitialState } from "./modules/serviceTypeViewRedux";

import { cardsInitialState } from "./modules/cardsRedux";
import { cardViewInitialState } from  "./modules/cardViewRedux";

import { certificatesInitialState } from "./modules/certificatesRedux";
import { certificateViewInitialState } from "./modules/certificateViewRedux";

import { recipientsInitialState } from "./modules/recipientsRedux";
import { recipientViewInitialState } from "./modules/recipientViewRedux";

import { restaurantsInitialState } from "./modules/restaurantsRedux";
import { restaurantViewInitialState } from "./modules/restaurantViewRedux";

import { usersInitialState } from "./modules/usersRedux";
import { userViewInitialState } from "./modules/userViewRedux";

import {userRolesInitialState} from "./modules/userRolesRedux";

import { statsIssuingRestaurantsInitialState} from "./modules/statsIssuingRestaurantsRedux";
import { statsRedeemerRestaurantsInitialState } from "./modules/statsRedeemerRestaurantsRedux";
import { statsRecipientsInitialState } from "./modules/statsRecipientsRedux";
import { statsUnusedCertificatesInitialState } from "./modules/statsUnusedCertificatesRedux";
import { statsMutualSettlementReduxInitialState } from "./modules/statsMutualSettlementRedux"

import {manifestationsInitialState} from "./modules/manifestationsRedux";
import {manifestationViewInitialState} from "./modules/manifestationViewRedux";
import {expenseCategoriesInitialState} from "./modules/expenseCategoriesRedux";
import {expenseCategoryViewInitialState} from "./modules/expenseCategoryViewRedux";
import {expenseItemsInitialState} from "./modules/expenseItemsRedux";
import {expenseItemViewInitialState} from "./modules/expenseItemViewRedux";

import {budgetTableInitialState} from "./modules/budgetTableRedux";
import {budgetItemViewInitialState} from  "./modules/budgetItemViewRedux";

export const initialState = {
  ui: uiInitialState,
  routing: routingInitialState,

  serviceTypes: serviceTypesInitialState,
  serviceTypeView: serviceTypeViewInitialState,

  cards: cardsInitialState,
  cardView: cardViewInitialState,

  certificates: certificatesInitialState,
  certificateView: certificateViewInitialState,

  recipients: recipientsInitialState,
  recipientView: recipientViewInitialState,

  restaurants: restaurantsInitialState,
  restaurantView: restaurantViewInitialState,

  users: usersInitialState,
  userView: userViewInitialState,

  userRoles: userRolesInitialState,

  statsIssuingRestaurants: statsIssuingRestaurantsInitialState,
  statsRedeemerRestaurants: statsRedeemerRestaurantsInitialState,
  statsRecipients: statsRecipientsInitialState,
  statsUnusedCertificates: statsUnusedCertificatesInitialState,
  statsMutualSettlement: statsMutualSettlementReduxInitialState,

  manifestations: manifestationsInitialState,
  manifestationView: manifestationViewInitialState,
  expenseCategories: expenseCategoriesInitialState,
  expenseCategoryView: expenseCategoryViewInitialState,
  expenseItems: expenseItemsInitialState,
  expenseItemView: expenseItemViewInitialState,

  budgetTable: budgetTableInitialState,
  budgetItemView: budgetItemViewInitialState
};
