import React from "react";
import PropTypes from "prop-types";
import { getValueByCurrency } from "../../utils/dataFuncs";
import { budgetTableActions } from "./../../redux/modules/budgetTableRedux";
import { budgetItemViewActions } from "./../../redux/modules/budgetItemViewRedux";

export class BudgetTableSection extends React.Component {
  renderNames = () => {
    return this.props.items.map((item, index) => {
      if (!item.expenseItem || !item.manifestation) return "?";
      return (
        <button key={index} className="toggle-box-btn" type="button" onClick={async ()=>{
          await this.props.dispatch(budgetTableActions.goto_addItem());
          this.props.dispatch(budgetItemViewActions.fetchItem(item.id));
        }}>
          {item.expenseItem.name + "/" + item.manifestation.name}
        </button>
      );
    });
  };

  renderPrices = value => {
    return (
      <>
        <div className="table-grid-item">
          {getValueByCurrency(value, "ГРН") + "₴"}
        </div>
        <div className="table-grid-item">
          {getValueByCurrency(value, "USD") + "$" }
        </div>
        <div className="table-grid-item">
          {getValueByCurrency(value, "EUR") + "€"}
        </div>
        <div className="table-grid-item">
          {getValueByCurrency(value, "ГРН (бартер)") + "₴"}
        </div>
      </>
    );
  };

  renderItemPrices = columnName => {
    return this.props.items.map((item, index) => {
      if (!item[columnName]) return null;
      return (
        <div key={index} className="toggle-box-body">
          <div className="table-grid">
            <div className="table-grid-inner">
              {this.renderPrices(item[columnName])}
            </div>
          </div>
        </div>
      );
    });
  };

  renderItemsInfo = columnName => {
    return this.props.items.map((item, index) => {
      if (!item[columnName]) return null;
      return (
        <div key={index} className="toggle-box-body">          
            <div className="text-ellipsis">
              {item[columnName]}
            </div>        
        </div>
      );
    });
  };

  render() {
    if (!this.props.items || !this.props.total) return null;
    let items = this.props.items;
    let total = this.props.total;

    let cls = this.props.isExpanded ? "table-tr --show" : "table-tr";

    return (
      <div className={cls}>
        {/* -- NOTE: Add class '--show' to '.table-tr' when clicking on the 'button.toggle-box-title'-- */}
        <div className="table-td">
          <div className="toggle-box --main">
            <button
              className="toggle-box-title"
              type="button"
              onClick={this.props.onTotalClick}
            >
              {total.expenseCategory.name}
            </button>
            <div className="toggle-box-body">{this.renderNames()}</div>
          </div>
        </div>
        {/* --Бюджет-- */}
        <div className="table-td">
          <div className="toggle-box">
            <div className="toggle-box-title">
              <div className="table-grid">
                <div className="table-grid-inner">
                  {this.renderPrices(total.budget)}
                </div>
              </div>
            </div>
            {this.renderItemPrices("budget")}
          </div>
        </div>
        {/* --Обновленный Бюджет-- */}
        <div className="table-td">
          <div className="toggle-box">
            <div className="toggle-box-title">
              <div className="table-grid">
                <div className="table-grid-inner">
                  {this.renderPrices(total.updatedBudget)}
                </div>
              </div>
            </div>
            {this.renderItemPrices("updatedBudget")}
          </div>
        </div>
        {/* --Разница обн. бюдж-- */}
        <div className="table-td">
          <div className="toggle-box">
            <div className="toggle-box-title" >
              <div className="table-grid">
                <div className="table-grid-inner">
                {this.renderPrices(total.budgetsDifference)}
                </div>
              </div>
            </div>
            {this.renderItemPrices("budgetsDifference")}
          </div>
        </div>
        <div className="table-td">
          <div className="toggle-box">
            <div className="toggle-box-title">
              <div className="table-grid">
                <div className="table-grid-inner">
                {this.renderPrices(total.paid)}
                </div>
              </div>
            </div>
            {this.renderItemPrices("paid")}
          </div>
        </div>
        <div className="table-td">
          <div className="toggle-box">
            <div className="toggle-box-title">
              <div className="table-grid">
                <div className="table-grid-inner">
                {this.renderPrices(total.needToPay)}
                </div>
              </div>
            </div>
            {this.renderItemPrices("needToPay")}        
          </div>
        </div>
        <div className="table-td">
          <div className="toggle-box">
            <button className="toggle-box-title" type="button">
            {total.status}
            </button>
            {this.renderItemsInfo("status")}            
          </div>
        </div>
        <div className="table-td">
          <div className="toggle-box">
            <button className="toggle-box-title" type="button">
              <div className="text-ellipsis">
              {total.person}               
              </div>
            </button>
            {this.renderItemsInfo("person")} 
          </div>
        </div>
      </div>
    );
  }
}

BudgetTableSection.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  total: PropTypes.object.isRequired,
  isExpanded: PropTypes.bool,
  onTotalClick: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
};
