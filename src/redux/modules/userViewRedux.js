import PropTypes from "prop-types";
import {   
    IBaseView,    
  } from "./baseViewRedux";  

//*******************************************************************************

export const IUserView = PropTypes.shape({
  ...IBaseView,
  id: PropTypes.number.isRequired,  
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,  
  phone: PropTypes.string,  
  isActive: PropTypes.bool,
  createdDate: PropTypes.string,
  createdBy: PropTypes.object,
});