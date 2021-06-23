import React from "react";
import PropTypes from "prop-types";
import {appVersion} from "../../consts/constants";


export class Footer extends React.Component {
  render() {
    return (
      <footer className="footer animated">
        <div className="copyright ph-35 animated">
          &copy; {(new Date()).getFullYear()} Buldozer Group Ukraine. Все права защищены
          Version: {appVersion}
        </div>
      </footer>
    );
  }
}


Footer.propTypes = {};
