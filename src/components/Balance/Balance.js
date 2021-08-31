import React from "react";
import * as dataFuncs from "../../utils/dataFuncs";
import PropTypes from "prop-types";

export class Balance extends React.Component {
  renderRows = () => {
    if (!this.props.item || !this.props.item.transactions)
      return null;

    return this.props.item.transactions.map((transaction, index) => {
      let date = dataFuncs.truncateDate(transaction.createdDate);
      let amount = transaction.amount;
      let restaurant = transaction.restaurant
        ? transaction.restaurant.name
        : "";
      let balance = transaction.balance;

      return (
        <div
          key={index}
          className="product__table--tr flex animated"
          style={{ textTransform: "capitalize" }}
        >
          <div className="name animated">
            <div className="product__table--td animated">{date}</div>
          </div>

          <div className="name animated">
            <div className="product__table--td animated">{amount}</div>
          </div>

          <div className="name animated">
            <div className="product__table--td animated">{restaurant}</div>
          </div>

          <div className="name animated">
            <div className="product__table--td animated">{balance}</div>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">
          {"Баланс: " + this.props.item.balance + " грн"}
        </div>
        {/* -- add class ".no-padding"-- */}
        <div className="block-set__inner flex w100 no-padding animated">
          <div className="product__table animated">
            <div className="product__table--inner flex animated">
              <div className="product__table--thead animated">
                <div className="product__table--tr main flex animated">

                  <div className="name animated">
                    <div className="product__table--td animated">Дата</div>
                  </div>
                  <div className="name animated">
                    <div className="product__table--td animated">
                      Погашено, грн
                    </div>
                  </div>
                  <div className="name animated">
                    <div className="product__table--td animated">
                      Рестор. погаш.
                    </div>
                  </div>
                  <div className="name animated">
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

Balance.propTypes = {
  item: PropTypes.IView
};
