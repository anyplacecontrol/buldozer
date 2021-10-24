import React from "react";
import PropTypes from "prop-types";
import { ICertificateView } from "../../redux/modules/certificateViewRedux";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";
registerLocale("ru", ru);

export class CertificateGeneral extends React.Component {
  render() {    
    let isEditExisting = this.props.certificate.createdDate ? true: false;

    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">Общее</div>
        <div className="block-set__inner flex w100 animated">
          {/*------- Left panel-------- */}
          <div className="block-set__item flex animated">
            {/* Id */}
            {isEditExisting ? (
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Id
                </div>
                <div className="block-set__content flex w100 animated">
                  <div className="block-set__info flex animated">
                    <div className="block-set__info--title animated">
                      {this.props.certificate.id}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            {/* Дата активации   */}

            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Дата активации*
              </div>
              <div className="block-set__content flex w100 animated">
                <DatePicker
                  locale="ru"
                  selected={
                    this.props.certificate.activeFromDate
                      ? new Date(this.props.certificate.activeFromDate)
                      : null
                  }
                  // isClearable
                  onChange={date => this.props.onChangeActiveFromDate(date)}
                />
              </div>
            </div>

            {/* Кем добавлено */}
            {isEditExisting ? (
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Кем добавлено
                </div>
                <div className="block-set__content flex w100 animated">
                  <div className="block-set__info flex animated">
                    <div className="block-set__info--title animated">
                      {this.props.certificate.createdUser
                        ? this.props.certificate.createdUser.name
                        : "-"}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            {/* Номинал */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Номинал (грн)*
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className={
                    !this.props.certificate.isValidated ||
                    this.props.certificate.amount != "" ||
                    this.props.certificate.amount === 0
                      ? "block-set__input animated"
                      : "block-set__input animated  is--error"
                  }
                  value={this.props.certificate.amount}
                  onChange={e => this.props.onChangeAmount(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/*------- Right panel-------- */}

          <div className="block-set__item flex animated">
            {/* Срок действия */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Срок действия (месяцы)*
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className={
                    !this.props.certificate.isValidated ||
                    this.props.certificate.validityPeriodInMonths != ""
                      ? "block-set__input animated"
                      : "block-set__input animated  is--error"
                  }
                  value={this.props.certificate.validityPeriodInMonths}
                  onChange={e =>
                    this.props.onChangeValidityPeriod(e.target.value)
                  }
                />
              </div>
            </div>

            {/* Карточка */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Карточка*
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className={
                    !this.props.certificate.isValidated ||
                    this.props.certificate.cardId != ""
                      ? "block-set__input animated"
                      : "block-set__input animated  is--error"
                  }
                  value={this.props.certificate.cardId}
                  onChange={e => this.props.onChangeCardId(e.target.value)}
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
                      this.props.certificate.isActive
                        ? "block-set__tumbler active animated"
                        : "block-set__tumbler animated"
                    }
                    onClick={this.props.onTriggerIsActive}
                  />
                  <div className="block-set__info--title animated">
                    {this.props.certificate.isActive ? "Да" : "Нет"}
                  </div>
                </div>
              </div>
            </div>

            {/* Тип сертификата */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Тип сертификата
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="radio__container flex animated">
                  {/* -- checked radio button-- */}
                  <div className="radio flex animated">
                    <input
                      className="radio__input"
                      id="r-label1"
                      type="radio"
                      name="tax-status"
                      readOnly
                      onClick={() =>
                        this.props.onChangeIsPartiallyRedeemable(true)
                      }
                    />
                    <label
                      className={
                        this.props.certificate.isPartiallyRedeemable
                          ? "radio__label flex animated checked"
                          : "radio__label flex animated"
                      }
                      htmlFor="r-label1"
                    >
                      <span className="radio__label--icon animated" />
                      <span className="radio__label--text animated">
                        Частично погаш.
                      </span>
                    </label>
                  </div>
                  <div className="radio flex animated">
                    <input
                      className="radio__input"
                      id="r-label2"
                      type="radio"
                      name="tax-status"
                      onClick={() =>
                        this.props.onChangeIsPartiallyRedeemable(false)
                      }
                    />
                    <label
                      className={
                        this.props.certificate.isPartiallyRedeemable
                          ? "radio__label flex animated"
                          : "radio__label flex animated checked"
                      }
                      htmlFor="r-label2"
                    >
                      <span className="radio__label--icon animated" />
                      <span className="radio__label--text animated">
                        Обычный
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Вид сертификата */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Вид сертификата
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="radio__container flex animated">
                  {/* -- checked radio button-- */}
                  <div
                    className="radio flex animated"
                    onClick={() => {
                      this.props.onChangeIsBarterable(true);
                    }}
                  >
                    <input
                      className="radio__input"
                      id="r-label3"
                      type="radio"
                      name="tax-status"
                      readOnly
                    />
                    <label
                      className={
                        this.props.certificate.isBarterable
                          ? "radio__label flex animated checked"
                          : "radio__label flex animated"
                      }
                      htmlFor="r-label3"
                    >
                      <span className="radio__label--icon animated" />
                      <span className="radio__label--text animated">
                        Бартерный
                      </span>
                    </label>
                  </div>

                  <div
                    className="radio flex animated"
                    onClick={() => this.props.onChangeIsBarterable(false)}
                  >
                    <input
                      className="radio__input"
                      id="r-label4"
                      type="radio"
                      name="tax-status"
                    />
                    <label
                      className={
                        this.props.certificate.isBarterable
                          ? "radio__label flex animated"
                          : "radio__label flex animated checked"
                      }
                      htmlFor="r-label4"
                    >
                      <span className="radio__label--icon animated" />
                      <span className="radio__label--text animated">
                        Подарочный
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CertificateGeneral.propTypes = {
  certificate: ICertificateView,
  onChangeId: PropTypes.func.isRequired,
  onTriggerIsActive: PropTypes.func.isRequired,
  onChangeAmount: PropTypes.func.isRequired,
  onChangeValidityPeriod: PropTypes.func.isRequired,
  onChangeActiveFromDate: PropTypes.func.isRequired,
  onChangeCardId: PropTypes.func.isRequired,
  onChangeIsBarterable: PropTypes.func.isRequired,
  onChangeIsPartiallyRedeemable: PropTypes.func.isRequired
};
