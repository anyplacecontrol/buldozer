import React from "react";
import * as dataFuncs from "../../utils/dataFuncs";
import { ICertificateView } from "../../redux/modules/certificateViewRedux";
import PropTypes from "prop-types";

export class CertificatesTable extends React.Component {
  renderRows = () => {
    function compare(a, b) {      
        let cardA = a.card ? a.card.id : null;
        let cardB = b.card ? b.card.id : null;

        if (cardA < cardB) {
          return -1;
        }
        if (cardA > cardB) {
          return 1;
        }
        return 0;      
    }

    try {
      if (!this.props.certificates) return null;
      let certificates = this.props.certificates;

      //if we need to sort array by cardId

      if (!this.props.hideCardId) {
        if (this.props.certificates)
          certificates = [...this.props.certificates].sort(compare);
      }

      return certificates.map((certificate, index) => {
        try {
          let id = "..." + certificate.id.toString().substr(certificate.id.length - 5);
          let activeFromDate = dataFuncs.truncateDate(
            certificate.activeFromDate
          );
          let activeToDate = dataFuncs.truncateDate(certificate.activeToDate);
          let issuingRestaurant = certificate.issuingRestaurant
            ? certificate.issuingRestaurant.name
            : "";
          let redeemerRestaurant = certificate.redeemerRestaurant
            ? certificate.redeemerRestaurant.name
            : "";
          let amount = certificate.amount;
          let cardId = certificate.card
            ? "..." + certificate.card.id.substr(certificate.card.id.length - 5)
            : null;

          let isActive = certificate.isActive ? "Да" : "Нет";
          let certType = certificate.isPartiallyRedeemable
            ? "Частич. погаш."
            : "Обычный";
          let certKind = certificate.isBarterable ? "Бартерный" : "Подарочный";
          let balance = certificate.balance || 0;

          return (
            <div
              key={index}
              className="product__table--tr flex animated"
              style={{ textTransform: "capitalize" }}
            >
              {!this.props.hideCardId ? (
                <div className="id animated">
                  <div className="product__table--td animated">{cardId}</div>
                </div>
              ) : null}

              <div className="id animated">
                <div className="product__table--td animated">{id}</div>
              </div>

              <div className="activity animated">
                <div className="product__table--td animated">{isActive}</div>
              </div>

              <div className="date animated">
                <div className="product__table--td animated">
                  {activeToDate}
                </div>
              </div>

              <div className="name animated">
                <div className="product__table--td animated">
                  {issuingRestaurant}
                </div>
              </div>

              <div className="name animated">
                <div className="product__table--td animated">{certType}</div>
              </div>

              <div className="name animated">
                <div className="product__table--td animated">{certKind}</div>
              </div>

              <div className="price animated">
                <div className="product__table--td animated">{amount}</div>
              </div>

              <div className="price animated">
                <div className="product__table--td animated">
                  {amount - balance}
                </div>
              </div>

              <div className="price animated">
                <div className="product__table--td animated">{balance}</div>
              </div>
            </div>
          );          
        } catch (e) {
          console.log(e);
        }
      });
     
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    let title = this.props.title;
    if (!title)
       title = "Сертификаты (до 30 шт)";
    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">{title}</div>
        {/* -- add class ".no-padding"-- */}
        <div className="block-set__inner flex w100 no-padding animated">
          <div className="product__table animated">
            <div className="product__table--inner flex animated">
              <div className="product__table--thead animated">
                <div className="product__table--tr main flex animated">
                  {!this.props.hideCardId ? (
                    <div className="id animated">
                      <div className="product__table--td animated">
                        ID карты
                      </div>
                    </div>
                  ) : null}
                  <div className="id animated">
                    <div className="product__table--td animated">ID серт</div>
                  </div>
                  <div className="activity animated">
                    <div className="product__table--td animated">
                      Активность
                    </div>
                  </div>
                  <div className="date animated">
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
                    <div className="product__table--td animated">Тип серт</div>
                  </div>
                  <div className="name animated">
                    <div className="product__table--td animated">Вид серт</div>
                  </div>
                  <div className="price animated">
                    <div className="product__table--td animated">
                      Номинал, грн
                    </div>
                  </div>
                  <div className="price animated">
                    <div className="product__table--td animated">
                      Погашено, грн
                    </div>
                  </div>
                  <div className="price animated">
                    <div className="product__table--td animated">
                      Баланс, грн
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

CertificatesTable.propTypes = {
  certificates: PropTypes.arrayOf(ICertificateView).isRequired,
  hideCardId: PropTypes.bool,
  title: PropTypes.string,
};
