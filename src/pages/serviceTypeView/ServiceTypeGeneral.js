import React from "react";
import PropTypes from "prop-types";
import { IServiceTypeView } from "../../redux/modules/serviceTypeViewRedux";
import * as dataFuncs from "../../utils/dataFuncs";

export class ServiceTypeGeneral extends React.Component {
  render() {
    let isEditExisting = this.props.serviceType.id != 0;

    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">Общее</div>
        <div className="block-set__inner flex w100 animated">
          {/*------- Left panel-------- */}
          <div className="block-set__item flex animated">
            {/* Название */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Название*
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className={
                    !this.props.serviceType.isValidated ||
                    this.props.serviceType.name != ""
                      ? "block-set__input animated"
                      : "block-set__input animated  is--error"
                  }
                  value={this.props.serviceType.name}
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
                  {dataFuncs.truncateDate(this.props.serviceType.createdDate)}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

ServiceTypeGeneral.propTypes = {
  serviceType: IServiceTypeView,  
  onChangeName: PropTypes.func.isRequired,  
};
