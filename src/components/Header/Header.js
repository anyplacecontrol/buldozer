import React from "react";
import PropTypes from "prop-types";
import { UserMenu } from "./UserMenu";
import { OutsideClickHandler } from "../OutsideClickHandler/OutsideClickHandler";
import * as uiActions from "../../redux/modules/uiRedux";
import { connect } from "react-redux";
import * as authApi from "../../api/authApi";
import * as authRedux from "../../redux/modules/authRedux";

export class Header_ extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isUserMenuVisible: false };
  }

  onOutsideUserMenuClick = () => {
    if (this.state.isUserMenuVisible) {
      this.setState({ isUserMenuVisible: false });
    }
  };

  onUserIconClick = () => {
    this.setState({ isUserMenuVisible: !this.state.isUserMenuVisible });
  };

  onHamburgerClick = () => {
    this.props.dispatch(uiActions.toggleHamburgerButton());
  };

  onLogOutClick = () => {
    this.props.dispatch(authRedux.logOut());    
  }

  render() {
    let hamburgerCls = "menu-button flex animated";
    if (this.props.isHamburgerButtonPressed)
      hamburgerCls = "menu-button flex active animated";

    return (
      <header className="header animated">
        <div className="header__logo animated">A</div>
        <div className="wrapper ph-35 animated">
          <div className="header__inner flex w100 animated">
            <div className="header__left flex animated">
              {/* -- add menu button-- */}
              {/* -- click toggleClass ".active" and toggle class ".show" for ".side-bar"-- */}
              <div className={hamburgerCls} onClick={this.onHamburgerClick}>
                <div className="menu-button__item animated" />
                <div className="menu-button__item animated" />
                <div className="menu-button__item animated" />
              </div>
              <div className="header__title animated">
                <span>{this.props.header.name}</span>
                {this.props.header.comment && (
                  <span style={{ color: "#8893a3" }}>
                    {" "}
                    ({this.props.header.comment})
                  </span>
                )}
              </div>
            </div>

            <div className="header__right flex animated">
              <OutsideClickHandler onOutsideClick={this.onOutsideUserMenuClick}>
                <div
                  className="user active animated"
                  onClick={this.onUserIconClick}
                >
                  <img
                    className="user__image animated"
                    src={require("../../assets/img/del/user-photo.jpg")}
                    alt="user photo"
                  />
                  {this.state.isUserMenuVisible && (
                    <UserMenu 
                    authEmail={window.authEmail} 
                    onLogOutClick={this.onLogOutClick}
                    />
                  )}
                </div>
              </OutsideClickHandler>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

Header_.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isHamburgerButtonPressed: PropTypes.bool.isRequired,
  header: PropTypes.shape({
    name: PropTypes.string.isRequired,
    comment: PropTypes.string
  })
};

function mapStateToProps(state) {
  return {
    isHamburgerButtonPressed: state.ui.isHamburgerButtonPressed
  };
}

export const Header = connect(mapStateToProps)(Header_);
