import React from "react";
import PropTypes from "prop-types";
import { IRestaurantView } from "../../redux/modules/restaurantViewRedux";
import * as dataFuncs from "../../utils/dataFuncs";
import "react-datepicker/dist/react-datepicker.css";

export class RestaurantGeneral extends React.Component {
  render() {
    let isEditExisting = this.props.restaurant.createdUser != null;

    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">Общее</div>
        <div className="block-set__inner flex w100 animated">
          {/*------- Left panel-------- */}
          <div className="block-set__item flex animated">
            {/* Ресторан */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Ресторан*
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className={
                    !this.props.restaurant.isValidated ||
                    this.props.restaurant.name != ""
                      ? "block-set__input animated"
                      : "block-set__input animated  is--error"
                  }
                  value={this.props.restaurant.name}
                  onChange={e => this.props.onChangeName(e.target.value)}
                />
              </div>
            </div>

            {/* Адрес */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Адрес*
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className={
                    !this.props.restaurant.isValidated ||
                    this.props.restaurant.address != ""
                      ? "block-set__input animated"
                      : "block-set__input animated  is--error"
                  }
                  value={this.props.restaurant.address}
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
                  value={this.props.restaurant.phone}
                  onChange={e => this.props.onChangePhone(e.target.value)}
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
                  <div
                    className={
                      this.props.restaurant.isActive
                        ? "block-set__tumbler active animated"
                        : "block-set__tumbler animated"
                    }
                    onClick={this.props.onTriggerIsActive}
                  />
                  <div className="block-set__info--title animated">
                    {this.props.restaurant.isActive ? "Да" : "Нет"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*------- Right panel-------- */}

          <div className="block-set__item flex animated">
            {/* email */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                E-mail
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className="block-set__input animated"
                  value={this.props.restaurant.email}
                  onChange={e => this.props.onChangeEmail(e.target.value)}
                />
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
                  value={this.props.restaurant.comment || ""}
                  onChange={e => this.props.onChangeComment(e.target.value)}
                />
              </div>
            </div>

            {/* Дата добавления */}
            {isEditExisting ? (
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Дата добавления
                </div>
                <div className="block-set__content flex w100 animated">
                  {dataFuncs.truncateDate(this.props.restaurant.createdDate)}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

RestaurantGeneral.propTypes = {
  restaurant: IRestaurantView,
  onTriggerIsActive: PropTypes.func.isRequired,
  onChangeName: PropTypes.func.isRequired,
  onChangeCompany: PropTypes.func.isRequired,
  onChangeAddress: PropTypes.func.isRequired,
  onChangePhone: PropTypes.func.isRequired,
  onChangeEmail: PropTypes.func.isRequired,
  onChangeComment: PropTypes.func.isRequired
};
