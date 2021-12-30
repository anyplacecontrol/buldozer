import React from "react";
import PropTypes from "prop-types";
import { BudgetTableSection } from "./BudgetTableSection";
import { BudgetTableFooter } from "./BudgetTableFooter";
import { connect } from "react-redux";
import { budgetTableActions } from "./../../redux/modules/budgetTableRedux";
import { Filter } from "../../components/TableControls/Filter";
import * as uiActions from "../../redux/modules/uiRedux";
import { AlertPanel } from "../../components/TableControls/AlertPanel";

export class _budgetTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expandedSections: [0] };
  }

  async componentDidMount() {
    //do clean fetch with zero filters only if needed
    await this.props.dispatch(budgetTableActions.cleanFetch());
  }

  onApplyFilterClick = () => {};

  //HANDLE COMMANDS-------------------------------------------------------------

  //*For table Header

  onSortClick = column => {
    if (!column.accessorSort) return;
    this.props.dispatch(budgetTableActions.sortItemsBy(column));
  };

  onChangeFilterValue = (filterItem, newValue) => {
    this.props.dispatch(
      budgetTableActions.changeFilterValue(filterItem, newValue)
    );
  };

  onApplyFilterClick = () => {
    this.props.dispatch(budgetTableActions.fetchItems());
  };

  onAlertClose = () => {
    this.props.dispatch(uiActions.HideAlert());
  };

  onTotalClick = (index, isExpanded) => {
    let newState = [];
    if (!isExpanded) {
      newState = [...this.state.expandedSections, index];
    } else {
      for (let i = 0; i < this.state.expandedSections.length; i++) {
        if (this.state.expandedSections[i] != index)
          newState.push(this.state.expandedSections[i]);
      }
    }
    this.setState({ expandedSections: newState });
  };

  //-----------------------------------------------------------------------------
  renderSections = () => {
    if (!this.props.sections) return null;

    return this.props.sections.map((section, index) => {
      let isExpanded = this.state.expandedSections.includes(index);
      return (
        <BudgetTableSection
          key={index}
          total={section.total}
          items={section.items}
          isExpanded={isExpanded}
          onTotalClick={() => this.onTotalClick(index, isExpanded)}
        />
      );
    });
  };

  renderCurrencyColumnHeaders = columnName => {
    let baseCls = "sort sortable";
    let clsUAH = baseCls;
    let clsUSD = baseCls;
    let clsEUR = baseCls;
    let clsUahBarter = baseCls;
    let sortDirectionCls = " sort-up active";
    if (this.props.sortOrder == "descending")
      sortDirectionCls = " sort-down active";

    if (this.props.sortBy.columnName == columnName) {
      if (this.props.sortBy.currency == "ГРН")
        clsUAH = clsUAH + sortDirectionCls;
      if (this.props.sortBy.currency == "USD")
        clsUSD = clsUSD + sortDirectionCls;
      if (this.props.sortBy.currency == "EUR")
        clsEUR = clsEUR + sortDirectionCls;
      if (this.props.sortBy.currency == "ГРН (бартер)")
        clsUahBarter = clsUahBarter + sortDirectionCls;
    }

    return (
      <div className="table-grid-inner">
        <div className="table-grid-item">
          <button
            className={clsUAH}
            type="button"
            onClick={() =>
              this.props.dispatch(
                budgetTableActions.sortItemsBy({
                  columnName: columnName,
                  currency: "ГРН"
                })
              )
            }
          >
            ГРН
          </button>
        </div>
        <div className="table-grid-item">
          <button
            className={clsUSD}
            type="button"
            onClick={() =>
              this.props.dispatch(
                budgetTableActions.sortItemsBy({
                  columnName: columnName,
                  currency: "USD"
                })
              )
            }
          >
            USD
          </button>
        </div>
        <div className="table-grid-item">
          <button
            className={clsEUR}
            type="button"
            onClick={() =>
              this.props.dispatch(
                budgetTableActions.sortItemsBy({
                  columnName: columnName,
                  currency: "EUR"
                })
              )
            }
          >
            EUR
          </button>
        </div>
        <div className="table-grid-item">
          <button
            className={clsUahBarter}
            type="button"
            onClick={() =>
              this.props.dispatch(
                budgetTableActions.sortItemsBy({
                  columnName: columnName,
                  currency: "ГРН (бартер)"
                })
              )
            }
          >
            ГРН бартер
          </button>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div>
        <button style={{ float: "right" }} className="add animated">
          Добавить статью бюджета
        </button>

        <div className="main-nav flex w100 animated"> </div>

        {this.props.alert && this.props.alert.text && (
          <AlertPanel
            text={this.props.alert.text}
            kind={this.props.alert.kind}
            onClose={this.onAlertClose}
          />
        )}

        <Filter
          filterItems={this.props.filterItems}
          onApplyFilterClick={this.onApplyFilterClick}
          onChangeFilterValue={this.onChangeFilterValue}
        />

        <div className="table-parent --budget">
          <div className="table animated">
            <div className="table__inner flex animated">
              <div className="table__thead animated">
                <div className="table-tr">
                  <div className="table-td">
                    <div className="table-col-title">Статьи расходов</div>
                  </div>
                  <div className="table-td">
                    <div className="table-col-title">Бюджет</div>
                  </div>
                  <div className="table-td">
                    <div className="table-col-title">Обновленный бюджет</div>
                  </div>
                  <div className="table-td">
                    <div className="table-col-title">
                      Разница обнов. бюджета
                    </div>
                  </div>
                  <div className="table-td">
                    <div className="table-col-title">Оплачено</div>
                  </div>
                  <div className="table-td">
                    <div className="table-col-title">Доплатить</div>
                  </div>
                  <div className="table-td">
                    <div className="table-col-title">Статус</div>
                  </div>
                  <div className="table-td">
                    <div className="table-col-title">Ответственный</div>
                  </div>
                </div>
              </div>
              <div className="table__tbody animated">
                <div className="table-tr">
                  <div className="table-td"></div>
                  <div className="table-td">
                    <div className="table-grid">
                      {this.renderCurrencyColumnHeaders("budget")}
                    </div>
                  </div>
                  <div className="table-td">
                    <div className="table-grid">
                      {this.renderCurrencyColumnHeaders("updatedBudget")}
                    </div>
                  </div>
                  <div className="table-td">
                    <div className="table-grid">
                      {this.renderCurrencyColumnHeaders("budgetsDifference")}
                    </div>
                  </div>
                  <div className="table-td">
                    <div className="table-grid">
                      {this.renderCurrencyColumnHeaders("paid")}
                    </div>
                  </div>
                  <div className="table-td">
                    <div className="table-grid">
                      {this.renderCurrencyColumnHeaders("needToPay")}
                    </div>
                  </div>
                  <div className="table-td"></div>
                  <div className="table-td"></div>
                </div>
                {this.renderSections()}
              </div>

              <BudgetTableFooter totalSummary={this.props.totalSummary} />
            </div>
          </div>
          <div className="table__tfoot flex animated">
            <div className="export-list animated pointer">Экспорт CSV</div>
          </div>
        </div>
      </div>
    );
  }
}

_budgetTable.propTypes = {
  dispatch: PropTypes.func.isRequired,
  sections: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalSummary: PropTypes.object,
  sortBy: PropTypes.object.isRequired,
  sortOrder: PropTypes.string.isRequired,
  filterItems: PropTypes.arrayOf(PropTypes.object),
  alert: uiActions.IAlert
};

function mapStateToProps(state) {
  return {
    sections: state.budgetTable.sections,
    sortBy: state.budgetTable.sortBy,
    sortOrder: state.budgetTable.sortOrder,
    totalSummary: state.budgetTable.totalSummary,
    alert: state.ui.alert,
    filterItems: budgetTableActions.getFilterItems(state)
  };
}

export const budgetTable = connect(mapStateToProps)(_budgetTable);
