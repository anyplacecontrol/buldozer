import {combineReducers} from "redux";
import ui from "./modules/uiRedux";
import routing from "./modules/routingRedux";

import serviceTypes from "./modules/serviceTypesRedux";
import serviceTypeView from "./modules/serviceTypeViewRedux";

import certificates from "./modules/certificatesRedux";
import certificateView from "./modules/certificateViewRedux";

import recipients from "./modules/recipientsRedux";
import recipientView from "./modules/recipientViewRedux";

import restaurants from "./modules/restaurantsRedux";
import restaurantView from "./modules/restaurantViewRedux";

import users from "./modules/usersRedux";
import userView from "./modules/userViewRedux";

import statsIssuingRestaurants from "./modules/statsIssuingRestaurantsRedux";
import statsRedeemerRestaurants from "./modules/statsRedeemerRestaurantsRedux";
import statsRecipients from "./modules/statsRecipientsRedux";

const reducers = {
  ui,
  routing,  

  serviceTypes,
  serviceTypeView,
  
  certificates,
  certificateView,

  recipients,
  recipientView,

  restaurants, 
  restaurantView,

  users,  
  userView,

  statsIssuingRestaurants,
  statsRedeemerRestaurants,
  statsRecipients
};

export default combineReducers(reducers);
