import React from "react";
import PropTypes from "prop-types";
import { ICertificateView } from "../../redux/modules/certificateViewRedux";
import * as dataFuncs from "../../utils/dataFuncs";
import { IRestaurantView } from "../../redux/modules/restaurantViewRedux";
import * as consts from "../../consts/constants";
import { SelectBox } from "../../components/SelectBox/SelectBox";

export class CertificateRestaurants extends React.Component {
  renderRedeemerRestaurantSelectBox = () => {
    let itemsArr = this.props.allRestaurants.map((restaurant, index) => {
      let isChecked = false;
      if (this.props.certificate.redeemerRestaurants) {
        for (
          let i = 0;
          i < this.props.certificate.redeemerRestaurants.length;
          i++
        ) {
          if (
            this.props.certificate.redeemerRestaurants[i].id === restaurant.id
          ) {
            isChecked = true;
            break;
          }
        }
      }

      restaurant.id;
      return {
        text: restaurant.name,
        isChecked,
        onClick: () =>
          this.props.onChangeRedeemerRestaurant(restaurant, isChecked)
      };
    });

    return (
      <SelectBox
        style={{ zIndex: 3 }}
        className="w100"
        text={"Выбрать..."}
        items={[...itemsArr]}
        isCheckboxItems
      />
    );
  };

  renderIssuingRestaurantsSelectBox = () => {
    let nullItem = {
      text: consts.noStr,
      onClick: () => this.props.onChangeIssuingRestaurant(null)
    };

    let itemsArr = this.props.allRestaurants.map((restaurant, index) => {
      return {
        text: restaurant.name,
        onClick: () => this.props.onChangeIssuingRestaurant(restaurant)
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
    let isEditExisting = this.props.certificate.id != 0;

    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">Рестораны</div>
        <div className="block-set__inner flex w100 animated">
          {/*------- Left panel-------- */}
          <div className="block-set__item flex animated">
            {/* --  Ресторан-эмитент -- */}
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
            {/* --  Ресторан-погашатель-- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Ресторан-погашатель
              </div>
              <div className="block-set__content flex w100 animated">
               
                <div className="block-set__content flex w100 animated">
                  <div
                    className="block-set__info flex animated"
                    style={{ marginBottom: "10px" }}
                  >
                    <div
                      className={
                        this.props.certificate.allRedeemerRestaurants
                          ? "block-set__tumbler active animated"
                          : "block-set__tumbler animated"
                      }
                      onClick={this.props.onTriggerAllRedeemerRestaurants}
                    />
                    <div className="block-set__info--title animated">
                      {"Все"}
                    </div>
                  </div>
                </div>
                {this.props.certificate.allRedeemerRestaurants
                  ? null
                  : this.renderRedeemerRestaurantSelectBox()}
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
  onChangeRedeemerRestaurant: PropTypes.func.isRequired,
  onTriggerAllRedeemerRestaurants: PropTypes.func.isRequired,
};
