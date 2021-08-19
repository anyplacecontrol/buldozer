import React from "react";
import PropTypes from "prop-types";
import { ICardView } from "../../redux/modules/cardViewRedux";


export class CardGeneral extends React.Component {
  render() {
    let isEditExisting = this.props.card.createdDate != "";

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
                      {this.props.card.id}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Id *
                </div>
                <div className="block-set__content flex w100 animated">                                  
                  <input
                    className={
                      !this.props.card.isValidated || this.props.card.id != ""
                        ? "block-set__input animated"
                        : "block-set__input animated  is--error"
                    }
                    placeholder="последние 6 цифр"
                    value={this.props.card.id}
                    onChange={e => this.props.onChangeId(e.target.value)}
                  />
                </div>
                <div style={{marginTop: "10px", fontSize: "small"}}>Автоматически будет добавлено приставку 778256460000</div>
              </div>
            )}

            {/* Кем добавлено */}
            {isEditExisting ? (
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Кем добавлено
                </div>
                <div className="block-set__content flex w100 animated">
                  <div className="block-set__info flex animated">
                    <div className="block-set__info--title animated">
                      {this.props.card.createdUser
                        ? this.props.card.createdUser.name
                        : "-"}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {/*------- Right panel-------- */}

          <div className="block-set__item flex animated">
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
                      this.props.card.isActive
                        ? "block-set__tumbler active animated"
                        : "block-set__tumbler animated"
                    }
                    onClick={this.props.onTriggerIsActive}
                  />
                  <div className="block-set__info--title animated">
                    {this.props.card.isActive ? "Да" : "Нет"}
                  </div>
                </div>
              </div>
            </div>

            {/* Номинал */}
            {isEditExisting?
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Баланс (грн)
              </div>
              <div className="block-set__content flex w100 animated">
                <div className="block-set__info flex animated">
                  <div className="block-set__info--title animated">
                    {this.props.card.balance ? this.props.card.balance : "-"}
                  </div>
                </div>
              </div>
            </div>: null}
          </div>
        </div>
      </div>
    );
  }
}

CardGeneral.propTypes = {
  card: ICardView,
  onChangeId: PropTypes.func.isRequired,
  onTriggerIsActive: PropTypes.func.isRequired
};
