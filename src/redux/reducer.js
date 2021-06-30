import {combineReducers} from "redux";
import ui from "./modules/uiRedux";
import routing from "./modules/routingRedux";
import serviceTypes from "./modules/serviceTypesRedux"

import certificates from "./modules/certificatesRedux";
import certificateView from "./modules/certificateViewRedux";

import recipients from "./modules/recipientsRedux";
import recipientView from "./modules/recipientViewRedux";

import restaurants from "./modules/restaurantsRedux";
import restaurantView from "./modules/restaurantViewRedux";

import users from "./modules/usersRedux";



const reducers = {
  ui,
  routing,  
  serviceTypes,
  
  certificates,
  certificateView,

  recipients,
  recipientView,

  restaurants, 
  restaurantView,

  users,  
};

export default combineReducers(reducers);
