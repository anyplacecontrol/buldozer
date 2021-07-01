import { uiInitialState } from "./modules/uiRedux";
import { routingInitialState } from "./modules/routingRedux";
import { serviceTypesInitialState } from "./modules/serviceTypesRedux";

import { certificatesInitialState } from "./modules/certificatesRedux";
import { certificateViewInitialState } from "./modules/certificateViewRedux";

import { recipientsInitialState } from "./modules/recipientsRedux";
import { recipientViewInitialState } from "./modules/recipientViewRedux";

import { restaurantsInitialState } from "./modules/restaurantsRedux";
import { restaurantViewInitialState } from "./modules/restaurantViewRedux";

import { usersInitialState } from "./modules/usersRedux";
import { userViewInitialState } from "./modules/userViewRedux";


export const initialState = {
  ui: uiInitialState,
  routing: routingInitialState,
  serviceTypes: serviceTypesInitialState,

  certificates: certificatesInitialState,
  certificateView: certificateViewInitialState,

  recipients: recipientsInitialState,
  recipientView: recipientViewInitialState,

  restaurants: restaurantsInitialState,
  restaurantView: restaurantViewInitialState,

  users: usersInitialState,
  userView: userViewInitialState,
};
