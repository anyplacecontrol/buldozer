import React from "react";
import PropTypes from "prop-types";
import { BudgetTableRow } from "./BudgetTableRow";
import { BudgetTableFooter } from "./BudgetTableFooter";
import { connect } from "react-redux";
import { budgetTableActions } from "./../../redux/modules/budgetTableRedux";
import { Filter } from "../../components/TableControls/Filter";
import * as uiActions from "../../redux/modules/uiRedux";
import { AlertPanel } from "../../components/TableControls/AlertPanel";

export class _budgetTable extends React.Component {
  constructor(props) {
    super(props);
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

  //-----------------------------------------------------------------------------
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
                      <div className="table-grid-inner">
                        <div className="table-grid-item">
                          <button
                            className="sort sortable sort-up sort-down active"
                            type="button"
                          >
                            ГРН
                          </button>
                        </div>
                        <div className="table-grid-item">
                          <button className="sort sortable" type="button">
                            USD
                          </button>
                        </div>
                        <div className="table-grid-item">
                          <button className="sort sortable" type="button">
                            EUR
                          </button>
                        </div>
                        <div className="table-grid-item">
                          <button className="sort sortable" type="button">
                            ГРН бартер
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="table-td">
                    <div className="table-grid">
                      <div className="table-grid-inner">
                        <div className="table-grid-item">
                          <button
                            className="sort sortable sort-up sort-down active"
                            type="button"
                          >
                            ГРН
                          </button>
                        </div>
                        <div className="table-grid-item">
                          <button className="sort sortable" type="button">
                            USD
                          </button>
                        </div>
                        <div className="table-grid-item">
                          <button className="sort sortable" type="button">
                            EUR
                          </button>
                        </div>
                        <div className="table-grid-item">
                          <button className="sort sortable" type="button">
                            ГРН бартер
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="table-td">
                    <div className="table-grid">
                      <div className="table-grid-inner">
                        <div className="table-grid-item">
                          <button
                            className="sort sortable sort-up sort-down active"
                            type="button"
                          >
                            ГРН
                          </button>
                        </div>
                        <div className="table-grid-item">
                          <button className="sort sortable" type="button">
                            USD
                          </button>
                        </div>
                        <div className="table-grid-item">
                          <button className="sort sortable" type="button">
                            EUR
                          </button>
                        </div>
                        <div className="table-grid-item">
                          <button className="sort sortable" type="button">
                            ГРН бартер
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="table-td">
                    <div className="table-grid">
                      <div className="table-grid-inner">
                        <div className="table-grid-item">
                          <button
                            className="sort sortable sort-up sort-down active"
                            type="button"
                          >
                            ГРН
                          </button>
                        </div>
                        <div className="table-grid-item">
                          <button className="sort sortable" type="button">
                            USD
                          </button>
                        </div>
                        <div className="table-grid-item">
                          <button className="sort sortable" type="button">
                            EUR
                          </button>
                        </div>
                        <div className="table-grid-item">
                          <button className="sort sortable" type="button">
                            ГРН бартер
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="table-td">
                    <div className="table-grid">
                      <div className="table-grid-inner">
                        <div className="table-grid-item">
                          <button
                            className="sort sortable sort-up sort-down active"
                            type="button"
                          >
                            ГРН
                          </button>
                        </div>
                        <div className="table-grid-item">
                          <button className="sort sortable" type="button">
                            USD
                          </button>
                        </div>
                        <div className="table-grid-item">
                          <button className="sort sortable" type="button">
                            EUR
                          </button>
                        </div>
                        <div className="table-grid-item">
                          <button className="sort sortable" type="button">
                            ГРН бартер
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="table-td"></div>
                  <div className="table-td"></div>
                </div>

                <BudgetTableRow />
              </div>

              <BudgetTableFooter />
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
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortBy: PropTypes.string.isRequired,
  sortOrder: PropTypes.string.isRequired,
  filterItems: PropTypes.arrayOf(PropTypes.object),
  alert: uiActions.IAlert
};

function mapStateToProps(state) {
  return {
    table: state.budgetTable,
    alert: state.ui.alert,
    filterItems: budgetTableActions.getFilterItems(state)
  };
}

export const budgetTable = connect(mapStateToProps)(_budgetTable);
