import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as recipientViewRedux from "../../redux/modules/recipientViewRedux";
import { recipientViewActions } from "../../redux/modules/recipientViewRedux";
import { BaseView } from "../../components/BaseView/BaseView";
import { RecipientGeneral } from "./RecipientGeneral";
import { CertificatesTable } from "../../components/CertificatesTable/CertificatesTable";
import { ICertificateView } from "../../redux/modules/certificateViewRedux";
import { certificatesActions } from "../../redux/modules/certificatesRedux";

export class recipientView_ extends React.Component {
  onTriggerIsActive = () => {
    this.props.dispatch(recipientViewActions.triggerIsActive());
  };

  onChangeComment = newValue => {
    this.props.dispatch(recipientViewActions.changeComment(newValue));
  };

  onChangeName = newValue => {
    this.props.dispatch(recipientViewActions.changeName(newValue));
  };

  onChangeCompany = newValue => {
    this.props.dispatch(recipientViewActions.changeCompany(newValue));
  };

  onChangeAddress = newValue => {
    this.props.dispatch(recipientViewActions.changeAddress(newValue));
  };

  onChangePhone = newValue => {
    this.props.dispatch(recipientViewActions.changePhone(newValue));
  };

  onChangeEmail = newValue => {
    this.props.dispatch(recipientViewActions.changeEmail(newValue));
  };

  render() {
    let isEditExisting = this.props.recipient.id != 0;

    return (
      <BaseView
        viewName="Обзор контрагента"
        actionsProvider={recipientViewActions}
      >
        <RecipientGeneral
          recipient={this.props.recipient}
          onChangeComment={this.onChangeComment}
          onTriggerIsActive={this.onTriggerIsActive}
          onChangeName={this.onChangeName}
          onChangeCompany={this.onChangeCompany}
          onChangeAddress={this.onChangeAddress}
          onChangePhone={this.onChangePhone}
          onChangeEmail={this.onChangeEmail}
        />

        {isEditExisting ? <CertificatesTable certificates={this.props.certificates} />: null}

      </BaseView>
    );
  }
}

recipientView_.propTypes = {
  dispatch: PropTypes.func.isRequired,
  recipient: recipientViewRedux.IRecipientView,
  certificates: PropTypes.arrayOf(ICertificateView)
};

function mapStateToProps(state) {
  return {
    recipient: state.recipientView,
    certificates: certificatesActions.getItems(state)
  };
}

export const recipientView = connect(mapStateToProps)(recipientView_);
