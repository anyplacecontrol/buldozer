import React from "react";
import PropTypes from "prop-types";
import { ICertificateView } from "../../redux/modules/certificateViewRedux";
import * as dataFuncs from "../../utils/dataFuncs";
import { IRecipientView } from "../../redux/modules/recipientViewRedux";
import * as consts from "../../consts/constants";
import { SelectBox } from "../../components/SelectBox/SelectBox";
import { IServiceType } from "../../redux/modules/serviceTypesRedux";

export class CertificateRecipient extends React.Component {
  renderRecipientsSelectBox = () => {
    let nullItem = {
      text: consts.noStr,
      onClick: () => this.props.onChangeRecipient(null)
    };

    let itemsArr = this.props.allRecipients.map((recipient, index) => {
      return {
        text: recipient.name,
        onClick: () => this.props.onChangeRecipient(recipient)
      };
    });

    let currentText;
    if (this.props.certificate.recipient != null)
      currentText = this.props.certificate.recipient.name;
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

  renderServiceTypesSelectBox = () => {
    let nullItem = {
      text: consts.noStr,
      onClick: () => this.props.onChangeServiceType(null)
    };

    let itemsArr = this.props.allServiceTypes.map((serviceType, index) => {
      return {
        text: serviceType.name,
        onClick: () => this.props.onChangeServiceType(serviceType)
      };
    });

    let currentText;
    if (this.props.certificate.serviceType != null)
      currentText = this.props.certificate.serviceType.name;
    else currentText = consts.chooseStr;

    return (
      <SelectBox
        style={{ zIndex: 0 }}
        className="w100"
        text={currentText}
        items={[nullItem, ...itemsArr]}
      />
    );
  };

  render() {
    let isEditExisting = this.props.certificate.createdUser != null;

    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">Получатель</div>
        <div className="block-set__inner flex w100 animated">
          {/*------- Left panel-------- */}
          <div className="block-set__item flex animated">
            {/* -- Контрагент -- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Контрагент
              </div>
              <div className="block-set__content flex w100 animated">
                {this.renderRecipientsSelectBox()}
              </div>
            </div>

            {/* -- Вид услуг -- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Вид услуг
              </div>
              <div className="block-set__content flex w100 animated">
                {this.renderServiceTypesSelectBox()}
              </div>
            </div>
          </div>

          {/*------- Right panel-------- */}

          <div className="block-set__item flex animated">
            {/* ---Additional description--- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Комментарий
              </div>
              <div className="block-set__content flex w100 animated">
                <textarea
                  placeholder=""
                  className="block-set__text-area animated"
                  type="text"
                  value={this.props.certificate.recipientComment}
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

CertificateRecipient.propTypes = {
  certificate: ICertificateView,
  allRecipients: PropTypes.arrayOf(IRecipientView).isRequired,
  allServiceTypes: PropTypes.arrayOf(IServiceType).isRequired,
  onChangeRecipient: PropTypes.func.isRequired,
  onRecipientCommentChange: PropTypes.func.isRequired,
  onChangeServiceType: PropTypes.func.isRequired
};
