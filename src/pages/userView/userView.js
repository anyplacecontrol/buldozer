import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as userViewRedux from "../../redux/modules/userViewRedux";
import { userViewActions } from "../../redux/modules/userViewRedux";
import { userRolesActions } from "../../redux/modules/userRolesRedux";
import { BaseView } from "../../components/BaseView/BaseView";
import { UserGeneral } from "./UserGeneral";
import { UserCreatedBy } from "./UserCreatedBy";
import { UserPermissions } from "./UserPermissions";

export class userView_ extends React.Component {
  onChangeName = newValue => {
    this.props.dispatch(userViewActions.changeName(newValue));
  };

  onChangePosition = newValue => {
    this.props.dispatch(userViewActions.changePosition(newValue));
  };

  onChangePhone = newValue => {
    this.props.dispatch(userViewActions.changePhone(newValue));
  };

  onTriggerIsActive = () => {
    this.props.dispatch(userViewActions.triggerIsActive());
  };

  onChangeEmail = newValue => {
    this.props.dispatch(userViewActions.changeEmail(newValue));
  };

  onChangePassword = newValue => {
    this.props.dispatch(userViewActions.changePassword(newValue));
  };

  onChangeRole = newValue => {
    this.props.dispatch(userViewActions.changeRole(newValue));
  };

  render() {
    return (
      <BaseView
        viewName="Обзор администратора"
        actionsProvider={userViewActions}
      >
        <UserGeneral
          user={this.props.user}          
          onChangePosition={this.onChangePosition}
          onTriggerIsActive={this.onTriggerIsActive}
          onChangeName={this.onChangeName}
          onChangePassword={this.onChangePassword}
          onChangePhone={this.onChangePhone}
          onChangeEmail={this.onChangeEmail}
        />
        <UserPermissions
          user={this.props.user}
          allUserRoles={this.props.allUserRoles}
          onChangeRole = {this.onChangeRole}
        />

        {this.props.user.createdUser ? (
          <UserCreatedBy user={this.props.user} />
        ) : null}
      </BaseView>
    );
  }
}

userView_.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: userViewRedux.IUserView,
  allUserRoles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.userView,
    allUserRoles: userRolesActions.getItems(state)
  };
}

export const userView = connect(mapStateToProps)(userView_);
