import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { MainMenu } from "./MainMenu";
import { MAIN_MENU_ITEMS } from "../../consts/mainMenuItems";
import * as routing from "../../redux/modules/routingRedux";
import * as uiActions from "../../redux/modules/uiRedux";

export class SideBar_ extends React.Component {
  onMenuItemClick = path => {
    if (this.props.isHamburgerButtonPressed)
      this.props.dispatch(uiActions.toggleHamburgerButton());
    this.props.dispatch(routing.goto_Page(path));
  };

  onToggleSidebarClick = () => {
    this.props.dispatch(uiActions.toggleSidebar());
  };

  render() {
    let cls = "side-bar animated";
    if (this.props.isHamburgerButtonPressed) cls = "side-bar animated show";
    else if (this.props.isMinimized) {
      cls = cls + " active";
    }

    return (
      <div className={cls}>
        <div className="side-bar__inner animated">
          <div className="side-bar__logo animated">
            <img
              className="side-bar__logo--image animated"
              src={require("../../assets/img/svg/main-logo.svg")}
              alt="logo"
            />
          </div>

          <MainMenu
            items={MAIN_MENU_ITEMS}
            currentPath={this.props.currentPath}
            onItemClick={this.onMenuItemClick}
          />
        </div>

        {/* -- click ".side-bar__toggle" -- toggle class "active" for ".side-bar" and "#wrapper"-- */}
        <div className="side-bar__toggle animated">
          <div
            className="side-bar__toggle--button animated"
            title="Toggle sidebar"
            onClick={this.onToggleSidebarClick}
          >
            Toggle sidebar
          </div>
        </div>
      </div>
    );
  }
}

SideBar_.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currentPath: PropTypes.string.isRequired,
  isHamburgerButtonPressed: PropTypes.bool.isRequired,
  isMinimized: PropTypes.bool.isRequired,
  myUser: PropTypes.object
};

function mapStateToProps(state) {
  return {
    currentPath: state.router.location.pathname,
    isHamburgerButtonPressed: state.ui.isHamburgerButtonPressed
  };
}

export const SideBar = connect(mapStateToProps)(SideBar_);
