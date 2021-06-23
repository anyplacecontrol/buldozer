import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const UserMenu = props => {
  return (

      <ul className="user__sub animated">
        {/* <li className="user__sub--item animated">
          <a className="user__sub--link animated" href="">
            Profile
          </a>
        </li>
        <li className="user__sub--item animated">
          <a className="user__sub--link animated" href="">
            Settings
          </a>
        </li> */}
        <li className="user__sub--item animated">
          <a className="user__sub--link pointer animated" onClick={()=>props.onLogOutClick()}>
            {"Log out " + props.authEmail}
          </a>
        </li>
      </ul>

  );
};

UserMenu.propTypes = {
  authEmail: PropTypes.string,
  onLogOutClick: PropTypes.func.isRequired
};
