import React from "react";
import PropTypes from "prop-types";
import { ICardView } from "../../redux/modules/cardViewRedux";
import * as dataFuncs from "../../utils/dataFuncs";
import { IRecipientView } from "../../redux/modules/recipientViewRedux";
import * as consts from "../../consts/constants";
import { SelectBox } from "../../components/SelectBox/SelectBox";
import { IServiceTypeView } from "../../redux/modules/serviceTypeViewRedux";

export class CardRecipient extends React.Component {
  renderRecipientsSelectBox = () => {
    let nullItem = {
      text: consts.noStr,
      onClick: () => this.props.onChangeRecipient(null)
    };

    let itemsArr = this.props.allRecipients.map((recipient, index) => {
      return {
        text: recipient.company,
        onClick: () => this.props.onChangeRecipient(recipient)
      };
    });

    let currentText;
    if (this.props.card.recipient != null)
      currentText = this.props.card.recipient.company;
    else currentText = consts.chooseStr;

    return (
      <SelectBox
        style={{ zIndex: 3 }}
        className="w100"
        text={currentText}
        items={[nullItem, ...itemsArr]}
      />
    );
  };


  render() {
    let isEditExisting = this.props.card.createdUser != null;

    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">Получатель</div>
        <div className="block-set__inner flex w100 animated">
          {/*------- Left panel-------- */}
          <div className="block-set__item flex animated">
            {/* -- Контрагент -- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Контрагент*
              </div>
              <div className="block-set__content flex w100 animated">
                {this.renderRecipientsSelectBox()}
              </div>
            </div>

          </div>

          {/*------- Right panel-------- */}

          <div className="block-set__item flex animated">
            {/* ---Комментарий-- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Комментарий
              </div>
              <div className="block-set__content flex w100 animated">
                <textarea
                  placeholder=""
                  className="block-set__text-area animated"
                  type="text"
                  value={this.props.card.recipientComment || ""}
                  onChange={e =>
                    this.props.onRecipientCommentChange(e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CardRecipient.propTypes = {
  card: ICardView,
  allRecipients: PropTypes.arrayOf(IRecipientView).isRequired,  
  onChangeRecipient: PropTypes.func.isRequired,
  onRecipientCommentChange: PropTypes.func.isRequired,  
};
