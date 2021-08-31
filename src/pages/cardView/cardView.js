import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as cardViewRedux from "../../redux/modules/cardViewRedux";
import { cardViewActions } from "../../redux/modules/cardViewRedux";
import { CardGeneral } from "./CardGeneral";
import { CardRecipient } from "./CardRecipient";
import { BaseView } from "../../components/BaseView/BaseView";
import { recipientsActions } from "../../redux/modules/recipientsRedux";
import { IRecipientView } from "../../redux/modules/recipientViewRedux";
import { CertificatesTable } from "../../components/CertificatesTable/CertificatesTable";
import { Balance } from "../../components/Balance/Balance";

export class cardView_ extends React.Component {
  onChangeId = newValue => {
    this.props.dispatch(cardViewActions.changeId(newValue));
  };

  onTriggerIsActive = () => {
    this.props.dispatch(cardViewActions.triggerIsActive());
  };
  
  onChangeRecipient = newValue => {
    this.props.dispatch(cardViewActions.changeRecipient(newValue));
  };

  onRecipientCommentChange = newValue => {
    this.props.dispatch(
      cardViewActions.changeRecipientComment(newValue)
    );
  };


  render() {
    let isEditExisting = this.props.card.createdDate != "";

    return (
      <BaseView viewName="Обзор карточки" actionsProvider={cardViewActions}>
        <CardGeneral
          card={this.props.card}
          onChangeId={this.onChangeId}
          onTriggerIsActive={this.onTriggerIsActive}                    
        />

        <CardRecipient
          card={this.props.card}
          allRecipients={this.props.allRecipients}          
          onChangeRecipient={this.onChangeRecipient}
          onRecipientCommentChange={this.onRecipientCommentChange}          
        />       

         {isEditExisting ? <CertificatesTable hideCardId certificates={this.props.card.certificates}/>: null} 

         {isEditExisting ? (
          <Balance item={this.props.card} />
        ) : null}

      </BaseView>
    );
  }
}

cardView_.propTypes = {
  dispatch: PropTypes.func.isRequired,
  card: cardViewRedux.ICardView,
  allRecipients: PropTypes.arrayOf(IRecipientView).isRequired,  
};

function mapStateToProps(state) {
  return {
    card: state.cardView,
    allRecipients: recipientsActions.getItems(state),    
  };
}

export const cardView = connect(mapStateToProps)(cardView_);
