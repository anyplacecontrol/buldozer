import React from "react";
import PropTypes from "prop-types";
import { IManifestationView } from "../../redux/modules/manifestationViewRedux";
import * as dataFuncs from "../../utils/dataFuncs";

export class ManifestationGeneral extends React.Component {
  render() {
    let isEditExisting = this.props.manifestation.id != 0;

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
                      {this.props.manifestation.id}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Название */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Название*
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className={
                    !this.props.manifestation.isValidated ||
                    this.props.manifestation.name != ""
                      ? "block-set__input animated"
                      : "block-set__input animated  is--error"
                  }
                  value={this.props.manifestation.name}
                  onChange={e => this.props.onChangeName(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/*------- Right panel-------- */}
          <div className="block-set__item flex animated">
            {/* Дата добавления */}
            {isEditExisting ? (
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Дата добавления
                </div>
                <div className="block-set__content flex w100 animated">
                  {dataFuncs.truncateDate(this.props.manifestation.createdDate)}
                </div>
              </div>
            ) : null}

            {/* Кем добавлено */}
            {isEditExisting ? (
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Кем добавлено
                </div>
                <div className="block-set__content flex w100 animated">
                  <div className="block-set__info flex animated">
                    <div className="block-set__info--title animated">
                      {this.props.manifestation.createdUser
                        ? this.props.manifestation.createdUser.name
                        : "-"}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

ManifestationGeneral.propTypes = {
  manifestation: IManifestationView,
  onChangeName: PropTypes.func.isRequired
};
