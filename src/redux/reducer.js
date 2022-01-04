import {combineReducers} from "redux";
import ui from "./modules/uiRedux";
import routing from "./modules/routingRedux";

import serviceTypes from "./modules/serviceTypesRedux";
import serviceTypeView from "./modules/serviceTypeViewRedux";

import cards from "./modules/cardsRedux";
import cardView from "./modules/cardViewRedux";

import certificates from "./modules/certificatesRedux";
import certificateView from "./modules/certificateViewRedux";

import recipients from "./modules/recipientsRedux";
import recipientView from "./modules/recipientViewRedux";

import restaurants from "./modules/restaurantsRedux";
import restaurantView from "./modules/restaurantViewRedux";

import users from "./modules/usersRedux";
import userView from "./modules/userViewRedux";

import userRoles from "./modules/userRolesRedux";

import statsIssuingRestaurants from "./modules/statsIssuingRestaurantsRedux";
import statsRedeemerRestaurants from "./modules/statsRedeemerRestaurantsRedux";
import statsRecipients from "./modules/statsRecipientsRedux";
import statsUnusedCertificates from "./modules/statsUnusedCertificatesRedux";
import statsMutualSettlement from "./modules/statsMutualSettlementRedux";

import manifestations from "./modules/manifestationsRedux";
import manifestationView from "./modules/manifestationViewRedux";
import expenseCategories from "./modules/expenseCategoriesRedux";
import expenseCategoryView from "./modules/expenseCategoryViewRedux";
import expenseItems from "./modules/expenseItemsRedux";
import expenseItemView from "./modules/expenseItemViewRedux";

import budgetTable from "./modules/budgetTableRedux";
import budgetItemView from "./modules/budgetItemViewRedux";

const reducers = {
  ui,
  routing,  

  serviceTypes,
  serviceTypeView,
  
  cards,
  cardView,
  
  certificates,
  certificateView,

  recipients,
  recipientView,

  restaurants, 
  restaurantView,

  users,  
  userView,
  userRoles,

  statsIssuingRestaurants,
  statsRedeemerRestaurants,
  statsRecipients,
  statsUnusedCertificates,
  statsMutualSettlement,

  manifestations,
  manifestationView,
  expenseCategories,
  expenseCategoryView,
  expenseItems,
  expenseItemView,

  budgetTable,
  budgetItemView
};

export default combineReducers(reducers);
