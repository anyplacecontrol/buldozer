import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as certificateViewRedux from "../../redux/modules/certificateViewRedux";
import { certificateViewActions } from "../../redux/modules/certificateViewRedux";
import { CertificateGeneral } from "./CertificateGeneral";
import { CertificateRecipient } from "./CertificateRecipient";
import { CertificateRestaurants } from "./CertificateRestaurants";
import { CertificateBalance } from "./CertificateBalance";
import { BaseView } from "../../components/BaseView/BaseView";
import { recipientsActions } from "../../redux/modules/recipientsRedux";
import { restaurantsActions } from "../../redux/modules/restaurantsRedux";
import { IRecipientView } from "../../redux/modules/recipientViewRedux";
import {
  serviceTypesActions,  
} from "../../redux/modules/serviceTypesRedux";
import {IServiceTypeView} from "../../redux/modules/serviceTypeViewRedux";
import { IRestaurantView } from "../../redux/modules/restaurantViewRedux";

export class certificateView_ extends React.Component {
  onChangeId = newValue => {
    this.props.dispatch(certificateViewActions.changeId(newValue));
  };

  onChangeCardId = newValue => {
    this.props.dispatch(certificateViewActions.changeCardId(newValue));
  };

  onTriggerIsActive = () => {
    this.props.dispatch(certificateViewActions.triggerIsActive());
  };

  onChangeAmount = newValue => {
    this.props.dispatch(certificateViewActions.changeAmount(newValue));
  };

  onChangeValidityPeriod = newValue => {
    this.props.dispatch(certificateViewActions.changeValidityPeriod(newValue));
  };

  onChangeRecipient = newValue => {
    this.props.dispatch(certificateViewActions.changeRecipient(newValue));
  };

  onRecipientCommentChange = newValue => {
    this.props.dispatch(
      certificateViewActions.changeRecipientComment(newValue)
    );
  };

  onChangeServiceType = newValue => {
    this.props.dispatch(certificateViewActions.changeServiceType(newValue));
  };

  onChangeIssuingRestaurant  = newValue => {
   this.props.dispatch(certificateViewActions.changeIssuingRestaurant(newValue));
  };

  onChangeRedeemerRestaurant  = (restaurant, isChecked) => {
    this.props.dispatch(certificateViewActions.changeRedeemerRestaurant(restaurant, isChecked));
   };

  onChangeActiveFromDate = newValue => {
    this.props.dispatch(certificateViewActions.changeActiveFromDate(newValue));
   };

  onChangeIsBarterable = newValue => {
    this.props.dispatch(certificateViewActions.changeIsBarterable(newValue));
   };

  onChangeIsPartiallyRedeemable = newValue => {
    this.props.dispatch(certificateViewActions.changeIsPartiallyRedeemable(newValue));
   };

  render() {
    return (
      <BaseView viewName="Обзор сертификата" actionsProvider={certificateViewActions}>
        <CertificateGeneral
          certificate={this.props.certificate}
          onChangeId={this.onChangeId}
          onTriggerIsActive={this.onTriggerIsActive}
          onChangeAmount={this.onChangeAmount}
          onChangeValidityPeriod={this.onChangeValidityPeriod}
          onChangeActiveFromDate={this.onChangeActiveFromDate}
          onChangeCardId={this.onChangeCardId}
          onChangeIsBarterable={this.onChangeIsBarterable}
          onChangeIsPartiallyRedeemable={this.onChangeIsPartiallyRedeemable}
        />

        <CertificateRecipient
          certificate={this.props.certificate}
          allRecipients={this.props.allRecipients}
          allServiceTypes={this.props.allServiceTypes}
          onChangeRecipient={this.onChangeRecipient}
          onRecipientCommentChange={this.onRecipientCommentChange}
          onChangeServiceType={this.onChangeServiceType}
        />

        <CertificateRestaurants
          certificate={this.props.certificate}
          allRestaurants={this.props.allRestaurants}          
          onChangeIssuingRestaurant={this.onChangeIssuingRestaurant}
          onChangeRedeemerRestaurant={this.onChangeRedeemerRestaurant}
        />

        <CertificateBalance
          certificate={this.props.certificate}
        />

      </BaseView>
    );
  }
}

certificateView_.propTypes = {
  dispatch: PropTypes.func.isRequired,
  certificate: certificateViewRedux.ICertificateView,
  allRecipients: PropTypes.arrayOf(IRecipientView).isRequired,
  allServiceTypes: PropTypes.arrayOf(IServiceTypeView).isRequired,
  allRestaurants: PropTypes.arrayOf(IRestaurantView).isRequired,
};

function mapStateToProps(state) {
  return {
    certificate: state.certificateView,
    allRecipients: recipientsActions.getItems(state),
    allServiceTypes: serviceTypesActions.getItems(state),
    allRestaurants: restaurantsActions.getItems(state),
  };
}

export const certificateView = connect(mapStateToProps)(certificateView_);
