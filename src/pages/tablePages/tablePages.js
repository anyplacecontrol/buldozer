import {tablePageWithProvider} from "./tablePageWithProvider";
import {certificatesActions} from "../../redux/modules/certificatesRedux";
import {restaurantsActions} from "../../redux/modules/restaurantsRedux";
import {recipientsActions} from "../../redux/modules/recipientsRedux";
import {usersActions} from "../../redux/modules/usersRedux";

export const certificates = tablePageWithProvider(certificatesActions);
export const restaurants = tablePageWithProvider(restaurantsActions);
export const recipients = tablePageWithProvider(recipientsActions);
export const users = tablePageWithProvider(usersActions);
