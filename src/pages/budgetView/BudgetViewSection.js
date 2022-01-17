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
          <div className="expenses-article-info">
            {item.expenseItem.name + "/" + item.manifestation.name}
          </div>
        </div>
        <div className="expenses-article-box">
          <div className="expenses-article-title">Статус</div>
          <div className="expenses-article-info">
            {item.status}
          </div>
        </div>        
        <div className="expenses-article-box">
          <div className="expenses-article-title">ID</div>
          <div className="expenses-article-info">{item.id}</div>
        </div>
        <div className="expenses-article-box">
          <div className="expenses-article-title">Бюджет</div>
          <div className="expenses-article-info" >
            {this.renderPrices(item.budget)}
          </div>
        </div>
        <div className="expenses-article-box">
          <div className="expenses-article-title">Обновленный бюджет</div>
          <div className="expenses-article-info" >
            {this.renderPrices(item.updatedBudget)}
          </div>
        </div>
        <div className="expenses-article-box">
          <div className="expenses-article-title">Оплачено</div>
          <div className="expenses-article-info">
            {this.renderPrices(item.paid)}
          </div>
        </div>
        <div className="expenses-article-box">
          <div className="expenses-article-title">Доплатить</div>
          <div className="expenses-article-info">
            {this.renderPrices(item.needToPay)}          
          </div>
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
