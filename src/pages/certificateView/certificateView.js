import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as certificateViewRedux from "../../redux/modules/certificateViewRedux";
import {certificateViewActions}  from "../../redux/modules/certificateViewRedux";
import { CertificateGeneral } from "./CertificateGeneral";
import { BaseView } from "../../components/BaseView/BaseView";

export class certificateView_ extends React.Component {
  onChangeId = newValue => {
    this.props.dispatch(certificateViewActions.changeId(newValue));
  };

  onTriggerIsActive = () => {
    this.props.dispatch(certificateViewActions.triggerIsActive());
  };

  onChangeAmount  = newValue => {
    this.props.dispatch(certificateViewActions.changeAmount(newValue));
  };

  onChangeValidityPeriod = newValue => {
    this.props.dispatch(certificateViewActions.changeValidityPeriod(newValue));
  };

  render() {
    return (
      <BaseView viewName="Сертификат" actionsProvider={certificateViewActions}>
        <CertificateGeneral
          certificate={this.props.certificate}
          onChangeId={this.onChangeId}
          onTriggerIsActive={this.onTriggerIsActive}
          onChangeAmount={this.onChangeAmount}
          onChangeValidityPeriod={this.onChangeValidityPeriod}
        />
      </BaseView>
    );
  }
}

certificateView_.propTypes = {
  dispatch: PropTypes.func.isRequired,
  certificate: certificateViewRedux.ICertificateView,  
};

function mapStateToProps(state) {
  return {
    certificate: state.certificateView
  };
}

export const certificateView = connect(mapStateToProps)(certificateView_);
