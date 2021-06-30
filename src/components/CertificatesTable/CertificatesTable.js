import React from "react";
import * as dataFuncs from "../../utils/dataFuncs";
import { ICertificateView } from "../../redux/modules/certificateViewRedux";
import { certificatesActions } from "../../redux/modules/certificatesRedux";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export class CertificatesTable_ extends React.Component {
  renderRows = () => {
    if (!this.props.certificates) return null;

    return this.props.certificates.map((certificate, index) => {
      let id = "..."+certificate.id.substr(certificate.id.length - 5);
      let activeFromDate = dataFuncs.truncateDate(certificate.activeFromDate);
      let activeToDate = dataFuncs.truncateDate(certificate.activeToDate);
      let issuingRestaurant = certificate.issuingRestaurant
        ? certificate.issuingRestaurant.name
        : "";
      let redeemerRestaurant = certificate.redeemerRestaurant
        ? certificate.redeemerRestaurant.name
        : "";
      let amount = certificate.amount;

      return (
        <div
          key={index}
          className="product__table--tr flex animated"
          style={{ textTransform: "capitalize" }}
        >
          <div className="id animated">
            <div className="product__table--td animated">{id}</div>
          </div>

          <div className="name animated">
            <div className="product__table--td animated">{activeFromDate}</div>
          </div>

          <div className="name animated">
            <div className="product__table--td animated">{activeToDate}</div>
          </div>

          <div className="name animated">
            <div className="product__table--td animated">
              {issuingRestaurant}
            </div>
          </div>

          <div className="name animated">
            <div className="product__table--td animated">
              {redeemerRestaurant}
            </div>
          </div>

          <div className="date animated">
            <div className="product__table--td animated">
              {amount}
            </div>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">Сертификаты (до 30 шт)</div>
        {/* -- add class ".no-padding"-- */}
        <div className="block-set__inner flex w100 no-padding animated">
          <div className="product__table animated">
            <div className="product__table--inner flex animated">
              <div className="product__table--thead animated">
                <div className="product__table--tr main flex animated">
                  {/* -- add class ".v2"-- */}
                  <div className="id animated">
                    <div className="product__table--td animated">ID карты</div>
                  </div>
                  <div className="name animated">
                    <div className="product__table--td animated">
                      Дата активации
                    </div>
                  </div>
                  <div className="name animated">
                    <div className="product__table--td animated">
                      Срок действия
                    </div>
                  </div>
                  <div className="name animated">
                    <div className="product__table--td animated">
                      Рест. эмитент
                    </div>
                  </div>
                  <div className="name animated">
                    <div className="product__table--td animated">
                      Рест. погаситель
                    </div>
                  </div>
                  <div className="date animated">
                    <div className="product__table--td animated">
                      Номинал
                    </div>
                  </div>
                </div>
                {this.renderRows()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CertificatesTable_.propTypes = {
  certificates: PropTypes.arrayOf(ICertificateView).isRequired
};

function mapStateToProps(state) {
  return {
    certificates: certificatesActions.getItems(state)
  };
}

export const CertificatesTable = connect(mapStateToProps)(
  CertificatesTable_
);
