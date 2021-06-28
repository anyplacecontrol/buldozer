import {combineReducers} from "redux";
import ui from "./modules/uiRedux";
import routing from "./modules/routingRedux";

import certificates from "./modules/certificatesRedux";
import certificateView from "./modules/certificateViewRedux";

import restaurants from "./modules/restaurantsRedux";
import recipients from "./modules/recipientsRedux";
import users from "./modules/usersRedux";

import serviceTypes from "./modules/serviceTypesRedux"

const reducers = {
  ui,
  routing,  
  certificates,
  certificateView,

  restaurants,
  recipients,
  users,

  serviceTypes
};

export default combineReducers(reducers);
