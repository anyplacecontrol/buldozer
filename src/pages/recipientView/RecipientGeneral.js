import React from "react";
import PropTypes from "prop-types";
import { IRecipientView } from "../../redux/modules/recipientViewRedux";
import * as dataFuncs from "../../utils/dataFuncs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export class RecipientGeneral extends React.Component {
  render() {
    let isEditExisting = this.props.recipient.createdUser != null;

    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">Общее</div>
        <div className="block-set__inner flex w100 animated">
          {/*------- Left panel-------- */}
          <div className="block-set__item flex animated">
           {/* Компания */}
           <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Компания*
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                    className={
                      !this.props.recipient.isValidated ||
                      this.props.recipient.company != ""
                        ? "block-set__input animated"
                        : "block-set__input animated  is--error"
                    }
                    value={this.props.recipient.company}
                    onChange={e => this.props.onChangeCompany(e.target.value)}
                  />
              </div>
            </div>

            {/* Сотрудник */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Сотрудник
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className="block-set__input animated"
                  value={this.props.recipient.name}
                  onChange={e => this.props.onChangeName(e.target.value)}
                />
              </div>
            </div>
           
            {/* Адрес */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Адрес
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className="block-set__input animated"
                  value={this.props.recipient.address}
                  onChange={e => this.props.onChangeAddress(e.target.value)}
                />
              </div>
            </div>
            {/* Телефон */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Телефон
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className="block-set__input animated"
                  value={this.props.recipient.phone}
                  onChange={e => this.props.onChangePhone(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/*------- Right panel-------- */}

          <div className="block-set__item flex animated">
            {/* Телефон */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                E-mail
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className="block-set__input animated"
                  value={this.props.recipient.email}
                  onChange={e => this.props.onChangeEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Активность */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Активность
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  {/* -- click - toggle class "active" and change text "Yes | No" in the next ".block-set__info--title"-- */}
                  <div
                    className={
                      this.props.recipient.isActive
                        ? "block-set__tumbler active animated"
                        : "block-set__tumbler animated"
                    }
                    onClick={this.props.onTriggerIsActive}
                  />
                  <div className="block-set__info--title animated">
                    {this.props.recipient.isActive ? "Да" : "Нет"}
                  </div>
                </div>
              </div>
            </div>
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
                  value={this.props.recipient.comment || ""}
                  onChange={e => this.props.onChangeComment(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RecipientGeneral.propTypes = {
  recipient: IRecipientView,
  onTriggerIsActive: PropTypes.func.isRequired,
  onChangeName: PropTypes.func.isRequired,
  onChangeCompany: PropTypes.func.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
  onChangePhone: PropTypes.func.isRequired,
  onChangeEmail: PropTypes.func.isRequired,
  onChangeComment: PropTypes.func.isRequired
};
