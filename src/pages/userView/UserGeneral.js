import React from "react";
import PropTypes from "prop-types";
import { IUserView } from "../../redux/modules/userViewRedux";
import * as dataFuncs from "../../utils/dataFuncs";

export class UserGeneral extends React.Component {
  render() {
    let isEditExisting = this.props.user.createdUser != null;

    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">Общее</div>
        <div className="block-set__inner flex w100 animated">
          {/*------- Left panel-------- */}
          <div className="block-set__item flex animated">
            {/* ФИО */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                ФИО*
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className={
                    !this.props.user.isValidated || this.props.user.name != ""
                      ? "block-set__input animated"
                      : "block-set__input animated  is--error"
                  }
                  value={this.props.user.name}
                  onChange={e => this.props.onChangeName(e.target.value)}
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
                  value={this.props.user.phone}
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
                      this.props.user.isActive
                        ? "block-set__tumbler active animated"
                        : "block-set__tumbler animated"
                    }
                    onClick={this.props.onTriggerIsActive}
                  />
                  <div className="block-set__info--title animated">
                    {this.props.user.isActive ? "Да" : "Нет"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*------- Right panel-------- */}

          <div className="block-set__item flex animated">
            {/* Должность */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Должность
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className="block-set__input animated"
                  value={this.props.user.position}
                  onChange={e => this.props.onChangePosition(e.target.value)}
                />
              </div>
            </div>

            {/* ФИО */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                E-mail*
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className={
                    !this.props.user.isValidated || this.props.user.email != ""
                      ? "block-set__input animated"
                      : "block-set__input animated  is--error"
                  }
                  value={this.props.user.email}
                  onChange={e => this.props.onChangeEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Пароль */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Пароль*
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className={
                    !this.props.user.isValidated ||
                    this.props.user.password != ""
                      ? "block-set__input animated"
                      : "block-set__input animated  is--error"
                  }
                  value={this.props.user.password}
                  onChange={e => this.props.onChangePassword(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserGeneral.propTypes = {
  user: IUserView,
  onTriggerIsActive: PropTypes.func.isRequired,
  onChangeName: PropTypes.func.isRequired,
  onChangePosition: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  onChangePhone: PropTypes.func.isRequired,
  onChangeEmail: PropTypes.func.isRequired
};
