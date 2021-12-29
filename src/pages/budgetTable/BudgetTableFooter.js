import React from "react";
import PropTypes from "prop-types";

export class BudgetTableFooter extends React.Component {
  render() {
    return (
      <div className="table__tfoot">
        <div className="table-tr">
          <div className="table-td">
            <div className="brand-value-text">ИТОГО ЗА ПЕРИОД</div>
          </div>
          <div className="table-td">
            <div className="table-grid">
              <div className="table-grid-inner">
                <div className="table-grid-item">₴9 999 999.99</div>
                <div className="table-grid-item">₴9 999 999.99</div>
                <div className="table-grid-item">₴9 999 999.99</div>
                <div className="table-grid-item">₴9 999 999.99</div>
              </div>
            </div>
          </div>
          <div className="table-td">
            <div className="table-grid">
              <div className="table-grid-inner">
                <div className="table-grid-item">₴9 999 999.99</div>
                <div className="table-grid-item">₴9 999 999.99</div>
                <div className="table-grid-item">₴9 999 999.99</div>
                <div className="table-grid-item">₴9 999 999.99</div>
              </div>
            </div>
          </div>
          <div className="table-td">
            <div className="table-grid">
              <div className="table-grid-inner">
                <div className="table-grid-item">+₴9 999 999.99</div>
                <div className="table-grid-item">-₴9 999 999.99</div>
                <div className="table-grid-item">-₴9 999 999.99</div>
                <div className="table-grid-item">+₴9 999 999.99</div>
              </div>
            </div>
          </div>
          <div className="table-td">
            <div className="table-grid">
              <div className="table-grid-inner">
                <div className="table-grid-item">₴9 999 999.99</div>
                <div className="table-grid-item">₴9 999 999.99</div>
                <div className="table-grid-item">₴9 999 999.99</div>
                <div className="table-grid-item">₴9 999 999.99</div>
              </div>
            </div>
          </div>
          <div className="table-td">
            <div className="table-grid">
              <div className="table-grid-inner">
                <div className="table-grid-item">₴9 999 999.99</div>
                <div className="table-grid-item">₴9 999 999.99</div>
                <div className="table-grid-item">₴9 999 999.99</div>
                <div className="table-grid-item">₴9 999 999.99</div>
              </div>
            </div>
          </div>
          <div className="table-td"></div>
          <div className="table-td"></div>
        </div>
      </div>
    );
  }
}

BudgetTableFooter.propTypes = {};
