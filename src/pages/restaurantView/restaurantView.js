import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as restaurantViewRedux from "../../redux/modules/restaurantViewRedux";
import { restaurantViewActions } from "../../redux/modules/restaurantViewRedux";
import { BaseView } from "../../components/BaseView/BaseView";
import { RestaurantGeneral } from "./RestaurantGeneral";
import { CertificatesTable } from "../../components/CertificatesTable/CertificatesTable";

export class restaurantView_ extends React.Component {

  onChangeName = newValue => {
    this.props.dispatch(restaurantViewActions.changeName(newValue));
  };  

  onChangeAddress = newValue => {
    this.props.dispatch(restaurantViewActions.changeAddress(newValue));
  };

  onChangePhone = newValue => {
    this.props.dispatch(restaurantViewActions.changePhone(newValue));
  };

  onTriggerIsActive = () => {
    this.props.dispatch(restaurantViewActions.triggerIsActive());
  };    

  onChangeEmail = newValue => {
    this.props.dispatch(restaurantViewActions.changeEmail(newValue));
  };

  onChangeComment = newValue => {
    this.props.dispatch(restaurantViewActions.changeComment(newValue));
  };

  render() {
    let isEditExisting = this.props.restaurant.createdUser != null;

    return (
      <BaseView
        viewName="Обзор ресторана"
        actionsProvider={restaurantViewActions}
      >
        <RestaurantGeneral
          restaurant={this.props.restaurant}
          onChangeComment={this.onChangeComment}
          onTriggerIsActive={this.onTriggerIsActive}
          onChangeName={this.onChangeName}          
          onChangeAddress={this.onChangeAddress}
          onChangePhone={this.onChangePhone}
          onChangeEmail={this.onChangeEmail}
        />

        {isEditExisting ? <CertificatesTable />: null}

      </BaseView>
    );
  }
}

restaurantView_.propTypes = {
  dispatch: PropTypes.func.isRequired,
  restaurant: restaurantViewRedux.IRestaurantView
};

function mapStateToProps(state) {
  return {
    restaurant: state.restaurantView
  };
}

export const restaurantView = connect(mapStateToProps)(restaurantView_);
