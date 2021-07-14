import {tablePageWithProvider} from "./tablePageWithProvider";
import {certificatesActions} from "../../redux/modules/certificatesRedux";
import {restaurantsActions} from "../../redux/modules/restaurantsRedux";
import {recipientsActions} from "../../redux/modules/recipientsRedux";
import {usersActions} from "../../redux/modules/usersRedux";
import {serviceTypesActions} from "../../redux/modules/serviceTypesRedux";
import {statsIssuingRestaurantsActions} from "../../redux/modules/statsIssuingRestaurantsRedux";
import {statsRedeemerRestaurantsActions} from "../../redux/modules/statsRedeemerRestaurantsRedux";
import {statsRecipientsActions} from "../../redux/modules/statsRecipientsRedux";

export const certificates = tablePageWithProvider(certificatesActions);
export const restaurants = tablePageWithProvider(restaurantsActions);
export const recipients = tablePageWithProvider(recipientsActions);
export const users = tablePageWithProvider(usersActions);
export const serviceTypes = tablePageWithProvider(serviceTypesActions);
export const statsIssuingRestaurants  = tablePageWithProvider(statsIssuingRestaurantsActions);
export const statsRedeemerRestaurants = tablePageWithProvider(statsRedeemerRestaurantsActions);
export const statsRecipients = tablePageWithProvider(statsRecipientsActions);
