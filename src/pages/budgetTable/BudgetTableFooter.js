import React from "react";
import PropTypes from "prop-types";
import {getValueByCurrency} from "../../utils/dataFuncs";

export class BudgetTableFooter extends React.Component {
  

  render() {
    let totalSummary = this.props.totalSummary;
    if (!totalSummary) return null;

    return (
      <div className="table__tfoot">
        <div className="table-tr">
          <div className="table-td">
            <div className="brand-value-text">ИТОГО ЗА ПЕРИОД</div>
          </div>
          <div className="table-td">
            <div className="table-grid">
              <div className="table-grid-inner">
                <div className="table-grid-item">
                  {"₴" + getValueByCurrency(totalSummary.budget, "ГРН")}
                </div>
                <div className="table-grid-item">
                  {"$" + getValueByCurrency(totalSummary.budget, "USD")}
                </div>
                <div className="table-grid-item">
                  {"€" + getValueByCurrency(totalSummary.budget, "EUR")}
                </div>
                <div className="table-grid-item">
                  {"₴" +
                    getValueByCurrency(
                      totalSummary.budget,
                      "ГРН (бартер)"
                    )}
                </div>
              </div>
            </div>
          </div>
          <div className="table-td">
            <div className="table-grid">
              <div className="table-grid-inner">
                <div className="table-grid-item">
                  {"₴" +
                    getValueByCurrency(totalSummary.updatedBudget, "ГРН")}
                </div>
                <div className="table-grid-item">
                  {"$" +
                    getValueByCurrency(totalSummary.updatedBudget, "USD")}
                </div>
                <div className="table-grid-item">
                  {"€" +
                    getValueByCurrency(totalSummary.updatedBudget, "EUR")}
                </div>
                <div className="table-grid-item">
                  {"₴" +
                    getValueByCurrency(
                      totalSummary.updatedBudget,
                      "ГРН (бартер)"
                    )}
                </div>
              </div>
            </div>
          </div>
          <div className="table-td">
            <div className="table-grid">
              <div className="table-grid-inner">
                <div className="table-grid-item">
                  {"₴" +
                    getValueByCurrency(
                      totalSummary.budgetsDifference,
                      "ГРН"
                    )}
                </div>
                <div className="table-grid-item">
                  {"$" +
                    getValueByCurrency(
                      totalSummary.budgetsDifference,
                      "USD"
                    )}
                </div>
                <div className="table-grid-item">
                  {"€" +
                    getValueByCurrency(
                      totalSummary.budgetsDifference,
                      "EUR"
                    )}
                </div>
                <div className="table-grid-item">
                  {"₴" +
                    getValueByCurrency(
                      totalSummary.budgetsDifference,
                      "ГРН (бартер)"
                    )}
                </div>
              </div>
            </div>
          </div>
          <div className="table-td">
            <div className="table-grid">
              <div className="table-grid-inner">
                <div className="table-grid-item">
                  {"₴" + getValueByCurrency(totalSummary.paid, "ГРН")}
                </div>
                <div className="table-grid-item">
                  {"$" + getValueByCurrency(totalSummary.paid, "USD")}
                </div>
                <div className="table-grid-item">
                  {"€" + getValueByCurrency(totalSummary.paid, "EUR")}
                </div>
                <div className="table-grid-item">
                  {"₴" +
                    getValueByCurrency(totalSummary.paid, "ГРН (бартер)")}
                </div>
              </div>
            </div>
          </div>
          <div className="table-td">
            <div className="table-grid">
              <div className="table-grid-inner">
              <div className="table-grid-item">
                  {"₴" + getValueByCurrency(totalSummary.needToPay, "ГРН")}
                </div>
                <div className="table-grid-item">
                  {"$" + getValueByCurrency(totalSummary.needToPay, "USD")}
                </div>
                <div className="table-grid-item">
                  {"€" + getValueByCurrency(totalSummary.needToPay, "EUR")}
                </div>
                <div className="table-grid-item">
                  {"₴" +
                    getValueByCurrency(totalSummary.needToPay, "ГРН (бартер)")}
                </div>
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

BudgetTableFooter.propTypes = {
  totalSummary: PropTypes.object.isRequired
};
