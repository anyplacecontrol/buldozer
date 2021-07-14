import { uiInitialState } from "./modules/uiRedux";
import { routingInitialState } from "./modules/routingRedux";

import { serviceTypesInitialState } from "./modules/serviceTypesRedux";
import { serviceTypeViewInitialState } from "./modules/serviceTypeViewRedux";

import { certificatesInitialState } from "./modules/certificatesRedux";
import { certificateViewInitialState } from "./modules/certificateViewRedux";

import { recipientsInitialState } from "./modules/recipientsRedux";
import { recipientViewInitialState } from "./modules/recipientViewRedux";

import { restaurantsInitialState } from "./modules/restaurantsRedux";
import { restaurantViewInitialState } from "./modules/restaurantViewRedux";

import { usersInitialState } from "./modules/usersRedux";
import { userViewInitialState } from "./modules/userViewRedux";

import { statsIssuingRestaurantsInitialState} from "./modules/statsIssuingRestaurantsRedux";
import { statsRedeemerRestaurantsInitialState } from "./modules/statsRedeemerRestaurantsRedux";
import { statsRecipientsInitialState } from "./modules/statsRecipientsRedux";


export const initialState = {
  ui: uiInitialState,
  routing: routingInitialState,

  serviceTypes: serviceTypesInitialState,
  serviceTypeView: serviceTypeViewInitialState,

  certificates: certificatesInitialState,
  certificateView: certificateViewInitialState,

  recipients: recipientsInitialState,
  recipientView: recipientViewInitialState,

  restaurants: restaurantsInitialState,
  restaurantView: restaurantViewInitialState,

  users: usersInitialState,
  userView: userViewInitialState,

  statsIssuingRestaurants: statsIssuingRestaurantsInitialState,
  statsRedeemerRestaurants: statsRedeemerRestaurantsInitialState,
  statsRecipients: statsRecipientsInitialState,
};
