import React from "react";
import PropTypes from "prop-types";
import { ICertificateView } from "../../redux/modules/certificateViewRedux";

export class CertificateGeneral extends React.Component {
  render() {
    let isEditExisting = this.props.certificate.id != "";

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
            ) : (
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Id*
                </div>
                <div className="block-set__content flex w100 animated">
                  <input
                    className={
                      !this.props.certificate.isValidated ||
                      this.props.certificate.id != ""
                        ? "block-set__input animated"
                        : "block-set__input animated  is--error"
                    }
                    value={this.props.certificate.id}
                    onChange={e => this.props.onChangeId(e.target.value)}
                  />
                </div>
              </div>
            )}
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
          </div>
        </div>
      </div>
    );
  }
}

CertificateGeneral.propTypes = {
  certificate: ICertificateView,
  onChangeId: PropTypes.func.isRequired,
  onTriggerIsActive: PropTypes.func.isRequired
};
