import {uiInitialState} from "./modules/uiRedux";
import {routingInitialState} from "./modules/routingRedux";
//import {kioskViewInitialState} from "./modules/kioskViewRedux";
import {certificatesInitialState} from "./modules/certificatesRedux";
import {restaurantsInitialState} from "./modules/restaurantsRedux";
import { recipientsInitialState } from "./modules/recipientsRedux";
import { usersInitialState } from "./modules/usersRedux";
import { certificateViewInitialState } from "./modules/certificateViewRedux";
import {serviceTypesInitialState} from "./modules/serviceTypesRedux"

export const initialState = {
  ui: uiInitialState,
  routing: routingInitialState,
    
  certificates: certificatesInitialState,
  certificateView:  certificateViewInitialState,

  restaurants: restaurantsInitialState,
  recipients: recipientsInitialState,
  users: usersInitialState,

  serviceTypes: serviceTypesInitialState
};
