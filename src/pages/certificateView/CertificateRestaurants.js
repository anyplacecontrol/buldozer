import React from "react";
import PropTypes from "prop-types";
import { ICertificateView } from "../../redux/modules/certificateViewRedux";
import * as dataFuncs from "../../utils/dataFuncs";
import { IRestaurantView } from "../../redux/modules/restaurantViewRedux";
import * as consts from "../../consts/constants";
import { SelectBox } from "../../components/SelectBox/SelectBox";

export class CertificateRestaurants extends React.Component {
  renderIssuingRestaurantsSelectBox = () => {
    let nullItem = {
      text: consts.noStr,
      onClick: () => this.props.onChangeIssuingRestaurant(null)
    };

    let itemsArr = this.props.allRestaurants.map((recipient, index) => {
      return {
        text: recipient.name,
        onClick: () => this.props.onChangeIssuingRestaurant(recipient)
      };
    });

    let currentText;
    if (this.props.certificate.issuingRestaurant != null)
      currentText = this.props.certificate.issuingRestaurant.name;
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
    let isEditExisting = this.props.certificate.createdUser != null;

    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">Рестораны</div>
        <div className="block-set__inner flex w100 animated">
          {/*------- Left panel-------- */}
          <div className="block-set__item flex animated">
            {/* -- Контрагент -- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Ресторан-эмитент*
              </div>
              <div className="block-set__content flex w100 animated">
                {this.renderIssuingRestaurantsSelectBox()}
              </div>
            </div>
          </div>

          {/*------- Right panel-------- */}

          <div className="block-set__item flex animated">
            {/* ---Additional description--- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Ресторан-погашатель
              </div>
              <div className="block-set__content flex w100 animated">
                {this.props.certificate.redeemerRestaurant
                  ? this.props.certificate.redeemerRestaurant.name
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CertificateRestaurants.propTypes = {
  certificate: ICertificateView,
  allRestaurants: PropTypes.arrayOf(IRestaurantView).isRequired,  
  onChangeIssuingRestaurant: PropTypes.func.isRequired,  
};
