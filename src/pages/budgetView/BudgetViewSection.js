import React from "react";
import PropTypes from "prop-types";
import { getValueByCurrency } from "../../utils/dataFuncs";

export class BudgetViewSection extends React.Component {
  renderPrices = property => {
    let uah = getValueByCurrency(property, "ГРН");
    let usd = getValueByCurrency(property, "USD");
    let eur = getValueByCurrency(property, "EUR");
    return "₴" + uah + " / $" + usd + " / €" + eur;
  };

   

  render() {
    if (!this.props.item || !this.props.total) return null;
    let item = this.props.item;
    let total = this.props.total;

    return (
      <div className="expenses-article" onClick={this.props.onItemClick}>
        <div className="expenses-article-box">
          <div className="expenses-article-title">
            {total.expenseCategory.name}
          </div>
          <button className="expenses-article-info" type="button">
            {item.expenseItem.name + "/" + item.manifestation.name}
          </button>
        </div>
        <div className="expenses-article-box">
          <div className="expenses-article-title">Обновленный бюджет</div>
          <button className="expenses-article-info" type="button">
            {this.renderPrices(item.updatedBudget)}
          </button>
        </div>
        <div className="expenses-article-box">
          <div className="expenses-article-title">Оплачено</div>
          <button className="expenses-article-info" type="button">
            {this.renderPrices(item.paid)}
          </button>
        </div>
        <div className="expenses-article-box">
          <div className="expenses-article-title">Доплатить</div>
          <button className="expenses-article-info" type="button">
            {this.renderPrices(item.needToPay)}          
          </button>
        </div>
        <div className="expenses-article-box">
          <div className="expenses-article-title">Статус</div>
          <div className="expenses-article-info">
            {item.status}
          </div>
        </div>
        <div className="expenses-article-box">
          <div className="expenses-article-title">Изменено</div>
          <div className="expenses-article-info">24.11.2021</div>
        </div>
      </div>
    );
  }
}

BudgetViewSection.propTypes = {
  item: PropTypes.object.isRequired,
  total: PropTypes.object.isRequired,
  onItemClick: PropTypes.func.isRequired
};
