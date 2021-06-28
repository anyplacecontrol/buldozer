import PropTypes from "prop-types";
import {   
    IBaseView,    
  } from "./baseViewRedux";
import {IUserView} from "../../redux/modules/userViewRedux";  

//*******************************************************************************

export const IRecipientView = PropTypes.shape({
  ...IBaseView,
  id: PropTypes.number.isRequired,  
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  company: PropTypes.string,
  address: PropTypes.string,
  phone: PropTypes.string,
  comment: PropTypes.string,
  isActive: PropTypes.bool,
  createdDate: PropTypes.string,
  createdBy: IUserView,  
});