import {uiInitialState} from "./modules/uiRedux";
import {routingInitialState} from "./modules/routingRedux";
import { usersInitialState } from "./modules/usersRedux";
import {serviceTypesInitialState} from "./modules/serviceTypesRedux";

import {certificatesInitialState} from "./modules/certificatesRedux";
import { certificateViewInitialState } from "./modules/certificateViewRedux";

import { recipientsInitialState } from "./modules/recipientsRedux";
import { recipientViewInitialState } from "./modules/recipientViewRedux";

import {restaurantsInitialState} from "./modules/restaurantsRedux";


export const initialState = {
  ui: uiInitialState,
  routing: routingInitialState,
  serviceTypes: serviceTypesInitialState,

  certificates: certificatesInitialState,
  certificateView:  certificateViewInitialState,
  
  recipients: recipientsInitialState,
  recipientView: recipientViewInitialState,

  restaurants: restaurantsInitialState,
  users: usersInitialState,  
};
