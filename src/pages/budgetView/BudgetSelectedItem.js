import React from "react";
import PropTypes from "prop-types";
// eslint-disable-next-line import/no-duplicates
import { getValueByCurrency } from "../../utils/dataFuncs";
import { connect } from "react-redux";
import { SelectBox } from "../../components/SelectBox/SelectBox";
import * as consts from "../../consts/constants";
import {
  budgetItemViewActions,
  allCurrencies,
  allPaymentTypes
} from '../../redux/modules/budgetItemViewRedux';
// eslint-disable-next-line import/no-duplicates
import * as dataFuncs from "../../utils/dataFuncs";
import { allBudgetTypes } from "../../redux/modules/budgetTableRedux";
import { DateRangeBox } from "../../components/DateRangeBox/DateRangeBox";
import { BudgetFiles } from "./BudgetFiles";

function isNotNull(val) {
  return val != null
}

export class _BudgetSelectedItem extends React.Component {
  renderExpenseCategoriesSelectBox = () => {
    let nullItem = {
      text: consts.noStr,
      onClick: () => {
        this.props.dispatch(budgetItemViewActions.changeExpenseCategory(null));
      }
    };

    let itemsArr = this.props.allExpenseCategories.map((category, index) => {
      return {
        text: category.name,
        onClick: () => {
          this.props.dispatch(
            budgetItemViewActions.changeExpenseCategory(category)
          );
        }
      };
    });

    let currentText;
    if (
      this.props.selectedItem &&
      isNotNull(this.props.selectedItem.expenseCategory)
    )
      currentText = this.props.selectedItem.expenseCategory.name;
    else currentText = consts.chooseStr;

    return (
      <SelectBox
        style={{ zIndex: 6 }}
        className="w100"
        text={currentText}
        items={[nullItem, ...itemsArr]}
      />
    );
  };

  //-------------------------------------------------------------------------------------
  renderExpenseItemsSelectBox = () => {
    let nullItem = {
      text: consts.noStr,
      onClick: () => {
        this.props.dispatch(budgetItemViewActions.changeExpenseItem(null));
      }
    };

    let itemsArr = this.props.allExpenseItems.map((item, index) => {
      return {
        text: item.name,
        onClick: () => {
          this.props.dispatch(budgetItemViewActions.changeExpenseItem(item));
        }
      };
    });

    let currentText;
    if (this.props.selectedItem && isNotNull(this.props.selectedItem.expenseItem))
      currentText = this.props.selectedItem.expenseItem.name;
    else currentText = consts.chooseStr;

    return (
      <SelectBox
        style={{ zIndex: 4 }}
        className="w100"
        text={currentText}
        items={[nullItem, ...itemsArr]}
      />
    );
  };

  //-------------------------------------------------------------------------------------
  renderManifestationsSelectBox = () => {
    let nullItem = {
      text: consts.noStr,
      onClick: () => {
        this.props.dispatch(budgetItemViewActions.changeManifestation(null));
      }
    };

    let itemsArr = this.props.allManifestations.map((item, index) => {
      return {
        text: item.name,
        onClick: () => {
          this.props.dispatch(budgetItemViewActions.changeManifestation(item));
        }
      };
    });

    let currentText;
    if (
      this.props.selectedItem &&
      isNotNull(this.props.selectedItem.manifestation)
    )
      currentText = this.props.selectedItem.manifestation.name;
    else currentText = consts.chooseStr;

    return (
      <SelectBox
        style={{ zIndex: 5 }}
        className="w100"
        text={currentText}
        items={[nullItem, ...itemsArr]}
      />
    );
  };
  //-------------------------------------------------------------------------------------
  renderSums = fieldName => {
    //Для существующих статей нельзя редактировать сумму, а можно только обновленную сумму
    if (!this.props.selectedItem || !this.props.selectedItem.expenses) return null;

    return this.props.selectedItem.expenses.map((expense, index) => {
      let isReadOnly = this.props.selectedItem.id !== 0 && fieldName === "amount";
      return (
        <div key={fieldName + index} className="block-set-grid">
          <div className="block-set-grid-inner">
            <input
              className="block-set__input animated"
              type="text"
              readOnly={isReadOnly}
              value={expense[fieldName]}
              onChange={e => {
                if (isReadOnly) return null;

                return this.props.dispatch(
                  budgetItemViewActions.changeArrayValue(
                    "expenses",
                    fieldName,
                    index,
                    e.target.value
                  )
                );
              }}
            />
            <div className="brand-value-text">{expense.currency.name}</div>
          </div>
        </div>
      );
    });
  };

  //-------------------------------------------------------------------------------------
  renderInputs = (arrayName, fieldName) => {
    if (!this.props.selectedItem || !this.props.selectedItem[arrayName])
      return null;

    return this.props.selectedItem[arrayName].map((arrayItem, index) => {
      let value = "";
      let type = "text";
      if (fieldName === "updatingAmountDate" || fieldName === "paymentDate") {
        value = dataFuncs.formatDate(arrayItem[fieldName]);
        type = "date";
      } else value = arrayItem[fieldName];

      return (
        <input
          key={fieldName + index}
          className="block-set__input animated"
          type={type}
          value={value}
          onChange={e => {
            return this.props.dispatch(
              budgetItemViewActions.changeArrayValue(
                arrayName,
                fieldName,
                index,
                e.target.value
              )
            );
          }}
        />
      );
    });
  };

  //-------------------------------------------------------------------------------------
  renderIncomeSums = () => {
    if (!this.props.selectedItem || !this.props.selectedItem.incomes) return null;

    return this.props.selectedItem.incomes.map((income, index1) => {
      let itemsArr = allCurrencies.map((item, index2) => {
        return {
          text: item.name,
          onClick: () => {
            this.props.dispatch(
              budgetItemViewActions.changeArrayValue(
                "incomes",
                "currency",
                index1,
                item
              )
            );
          }
        };
      });

      let currentText;
      if (isNotNull(income.currency)) currentText = income.currency.name;
      else currentText = consts.chooseStr;

      return (
        <div
          key={"incomeSum" + index1}
          className="w100"
          style={{ zIndex: this.props.selectedItem.incomes.length - index1 }}
        >
          <div className='payment-grid-box'>
            <button className='payment-grid-item-remove-btn' type='button'/>
            <div className="block-set-grid">
              <div className="block-set-grid-inner">
                <input
                  className="block-set__input animated"
                  type="text"
                  value={income.amount}
                  onChange={e => {
                    return this.props.dispatch(
                      budgetItemViewActions.changeArrayValue(
                        "incomes",
                        "amount",
                        index1,
                        e.target.value
                      )
                    );
                  }}
                />
                <SelectBox
                  className="w100"
                  text={currentText}
                  items={[...itemsArr]}
                />
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  //-------------------------------------------------------------------------------------
  renderIncomePaymentTypes = () => {
    if (!this.props.selectedItem || !this.props.selectedItem.incomes)
      return null;

    return this.props.selectedItem.incomes.map((income, index) => {
      let itemsArr = allPaymentTypes.map((item, index1) => {
        return {
          text: item.name,
          onClick: () => {
            this.props.dispatch(
              budgetItemViewActions.changeArrayValue(
                "incomes",
                "paymentType",
                index,
                item
              )
            );
          }
        };
      });

      let currentText;
      if (isNotNull(income.paymentType)) currentText = income.paymentType.name;
      else currentText = consts.chooseStr;

      return (
        <SelectBox
          key={"incomePayType" + index}
          style={{ zIndex: this.props.selectedItem.incomes.length - index }}
          className="w100"
          text={currentText}
          items={[...itemsArr]}
        />
      );
    });
  };

  renderSummary = fieldName => {
    if (!this.props.selectedItem[fieldName]) return null;

    return (
      <>
        <div className="payment-info-value">
          {getValueByCurrency(this.props.selectedItem[fieldName], "ГРН") + "₴"}
        </div>
        <div className="payment-info-value">
          {getValueByCurrency(this.props.selectedItem[fieldName], "USD") + "$"}
        </div>
        <div className="payment-info-value">
          {getValueByCurrency(this.props.selectedItem[fieldName], "EUR") + "€"}
        </div>
        <div className="payment-info-value">
          {getValueByCurrency(
            this.props.selectedItem[fieldName],
            "ГРН (бартер)"
          ) + "₴"}
        </div>
      </>
    );
  };

  //-------------------------------------------------------------------------------------
  renderRestaurantsSelectBox = () => {
    let nullItem = {
      text: consts.noStr,
      onClick: () => {
        this.props.dispatch(budgetItemViewActions.changeRestaurant(null));
      }
    };

    let itemsArr = this.props.allRestaurants.map((restaurant, index) => {
      return {
        text: restaurant.name,
        onClick: () => {
          this.props.dispatch(
            budgetItemViewActions.changeRestaurant(restaurant)
          );
        }
      };
    });

    let currentText;
    if (isNotNull(this.props.selectedItem.restaurant))
      currentText = this.props.selectedItem.restaurant.name;
    else currentText = consts.chooseStr;

    return (
      <SelectBox
        style={{ zIndex: 8 }}
        className="w100"
        text={currentText}
        items={[nullItem, ...itemsArr]}
      />
    );
  };

  //-------------------------------------------------------------------------------------
  renderBudgetTypes = () => {
    let nullItem = {
      text: consts.noStr,
      onClick: () => {
        this.props.dispatch(budgetItemViewActions.changeBudgetType(null));
      }
    };

    let itemsArr = allBudgetTypes.map((budgetType, index) => {
      return {
        text: budgetType.name,
        onClick: () => {
          this.props.dispatch(
            budgetItemViewActions.changeBudgetType(budgetType)
          );
        }
      };
    });

    let currentText;
    if (isNotNull(this.props.selectedItem.budgetType)) currentText = this.props.selectedItem.budgetType.name;
    else currentText = consts.chooseStr;

    return (
      <SelectBox
        style={{ zIndex: 7 }}
        className="w100"
        text={currentText}
        items={[nullItem, ...itemsArr]}
      />
    );
  };
  //-------------------------------------------------------------------------------------

  renderPeriodPicker = () => {
    let startDate = this.props.selectedItem.periodFromDate
      ? new Date(this.props.selectedItem.periodFromDate)
      : null;
    let endDate = this.props.selectedItem.periodToDate
      ? new Date(this.props.selectedItem.periodToDate)
      : null;
    return (
      <div className="w100r" style={{ zIndex: 9 }}>
        <DateRangeBox
          onValueChange={(dummy, data) => {
            this.props.dispatch(budgetItemViewActions.changePeriod(data));
          }}
          className="filter__calendar w100r animated"
          filterItem={{
            type: "dateRange",
            value: {
              startDate: startDate,
              endDate: endDate
            }
          }}
        />
      </div>
    );
  };

  //-------------------------------------------------------------------------------------

  render() {
    if (!this.props.selectedItem) return null;

    return (
      <div className="block-sets">
        <div className="block-set__box flex animated">
          <div className="block-set__title-box">
            <div className="block-set__title animated">Описание</div>
            <div className="buttons__right flex animated">
              <button
                className="buttons__main button--save animated"
                type="button"
                onClick={() =>
                  this.props.dispatch(budgetItemViewActions.resetStateToNull())
                }
              >
                Отменить
              </button>
              <button
                className="buttons__main button--save animated"
                type="button"
                onClick={() =>
                  this.props.dispatch(budgetItemViewActions.updateItem())
                }
              >
                Сохранить
              </button>
            </div>
          </div>
          <div className="block-set__inner flex w100 animated">
            <div className="block-set__item flex animated">
              {/* Отчетный период */}
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Отчетный период *
                </div>
                <div className="block-set__content flex w100 animated">
                  {this.renderPeriodPicker()}
                </div>
              </div>

              {/* Ресторан */}
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Ресторан *
                </div>
                <div className="block-set__content flex w100 animated">
                  {this.renderRestaurantsSelectBox()}
                </div>
              </div>

              {/* Тип бюджета */}
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Тип бюджета *
                </div>
                <div className="block-set__content flex w100 animated">
                  {this.renderBudgetTypes()}
                </div>
              </div>

              {/* Категория затрат */}
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Категория затрат *
                </div>
                <div className="block-set__content flex w100 animated">
                  {this.renderExpenseCategoriesSelectBox()}
                </div>
              </div>

              {/* Проявления */}
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Проявления *
                </div>
                <div className="block-set__content flex w100 animated">
                  {this.renderManifestationsSelectBox()}
                </div>
              </div>

              {/* Статьи затрат */}
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Статья затрат *
                </div>
                <div className="block-set__content flex w100 animated">
                  {this.renderExpenseItemsSelectBox()}
                </div>
              </div>
            </div>
            <div className="block-set__item flex animated">
              {/* -- ID -- */}
              {this.props.selectedItem.id !== 0 ? null : (
                <>
                  <div className="block-set__item--inner flex w100 animated">
                    <div className="block-set__sub-title flex w100 animated">
                      ID
                    </div>
                    <div className="block-set__content flex w100 animated">
                      <div className="block-set__info flex animated">
                        <div className="block-set__info--title animated">
                          {this.props.selectedItem.id}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Ответственный */}

                  <div className="block-set__item--inner flex w100 animated">
                    <div className="block-set__sub-title flex w100 animated">
                      Ответственный
                    </div>
                    <div className="block-set__content flex w100 animated">
                      <div className="block-set__info flex animated">
                        <div className="block-set__info--title animated">
                          {this.props.selectedItem.createdUser
                            ? this.props.selectedItem.createdUser.name
                            : ""}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Статус оплаты */}
                  <div className="block-set__item--inner flex w100 animated">
                    <div className="block-set__sub-title flex w100 animated">
                      Статус оплаты
                    </div>
                    <div className="block-set__content flex w100 animated">
                      <div className="block-set__info flex animated">
                        <div className="block-set__info--title animated">
                          {this.props.selectedItem.paymentStatus}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Комментарий
                </div>
                <div className="block-set__content flex w100 animated">
                  <textarea
                    placeholder=""
                    className="block-set__text-area"
                    value={this.props.selectedItem.comment || ""}
                    onChange={e =>
                      this.props.dispatch(
                        budgetItemViewActions.changeComment(e.target.value)
                      )
                    }
                  />
                </div>
              </div>

              {/* Активность */}
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Активировать
                </div>
                <div className="block-set__content flex w100 animated">
                  <div className="block-set__info flex animated">
                    <div
                      className={
                        this.props.selectedItem.isActive
                          ? "block-set__tumbler active animated"
                          : "block-set__tumbler animated"
                      }
                      onClick={() =>
                        this.props.dispatch(
                          budgetItemViewActions.triggerIsActive()
                        )
                      }
                    />
                    <div className="block-set__info--title animated">
                      {this.props.selectedItem.isActive ? "Да" : "Нет"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="block-set__title-box">
            <div className="block-set__title animated">
              Бюджет статьи расходов
            </div>
          </div>
          <div className="block-set__inner flex w100 animated">
            <div className="payment-grid">
              <div className="payment-grid-inner">
                {this.props.selectedItem.id === 0 ? null : (
                  <div className="payment-grid-item">
                    <div className="brand-sub-title">Старая сумма</div>
                    {this.renderSums("amount")}
                  </div>
                )}

                <div className="payment-grid-item">
                  <div className="brand-sub-title">Новая сумма *</div>
                  {this.renderSums("updatedAmount")}
                </div>

                {this.props.selectedItem.id === 0 ? null : (
                  <div className="payment-grid-item">
                    <div className="brand-sub-title">Дата обновления суммы *</div>
                    {this.renderInputs("expenses", "updatingAmountDate")}
                  </div>
                )}

                <div className="payment-grid-item">
                  <div className="brand-sub-title">
                    Сотрудник утвердивший обновление
                  </div>
                  {this.renderInputs("expenses", "updatingAmountUser")}
                </div>
              </div>
            </div>
          </div>
          <div className="block-set__title-box">
            <div className="block-set__title animated">
              Оплата статьи расходов
            </div>
          </div>
          <div className="block-set__inner flex w100 animated">
            <div className="payment-fields">
              <div className="payment-grid">
                <div className="payment-grid-inner">
                  <div className="payment-grid-item">
                    <div className="brand-sub-title">Оплаченная сумма *</div>
                    {this.renderIncomeSums()}
                  </div>
                  <div className="payment-grid-item">
                    <div className="brand-sub-title">Тип оплаты</div>
                    {this.renderIncomePaymentTypes()}
                  </div>
                  <div className="payment-grid-item">
                    <div className="brand-sub-title">Дата оплаты *</div>
                    {this.renderInputs("incomes", "paymentDate")}
                  </div>
                  <div className="payment-grid-item">
                    <div className="brand-sub-title">
                      Сотрудник, получивший наличные *
                    </div>
                    {this.renderInputs("incomes", "employeeReceivingCash")}
                  </div>
                </div>
              </div>
              <button
                className="btn-secondary"
                type="button"
                onClick={() =>
                  this.props.dispatch(budgetItemViewActions.addIncome())
                }
              >
                + Добавить оплату
              </button>
            </div>
          </div>
          <div className="block-set__inner flex w100 animated">
            <div className="payment-info-list">
              <div className="payment-info-item">
                <div className="payment-info-title">Осталось оплатить:</div>
                <div className="payment-info-values">
                  {this.renderSummary("needToPay")}
                </div>
              </div>
              <div className="payment-info-item">
                <div className="payment-info-title">Всего оплачено:</div>
                <div className="payment-info-values">
                  {this.renderSummary("paid")}
                </div>
              </div>
            </div>
          </div>
          <div className="block-set__title-box">
            <div className="block-set__title animated">Приложения</div>
          </div>
          <div className="block-set__inner flex w100 animated">
            <div className="documents">
              {this.props.selectedItem.id !== 0 ? (
                <BudgetFiles />
              ) : (
                "Файлы приложения можно добавлять после первого сохранения данной статьи расходов"
              )}
            </div>
          </div>
          <div className="block-set__inner flex w100 animated --buttons">
            <div className="buttons__right flex animated">
              <button
                className="buttons__main button--save animated"
                type="button"
                onClick={() =>
                  this.props.dispatch(budgetItemViewActions.resetStateToNull())
                }
              >
                Отменить
              </button>
              <button
                className="buttons__main button--save animated"
                type="button"
                onClick={() =>
                  this.props.dispatch(budgetItemViewActions.updateItem())
                }
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
        {/* - On click show Add / Edit article form-- */}
        <div className="buttons__top flex w100 animated">
          <div className="buttons__right flex animated"/>
        </div>
      </div>
    );
  }
}

_BudgetSelectedItem.propTypes = {
  dispatch: PropTypes.func.isRequired,
  selectedItem: PropTypes.object,
  allExpenseCategories: PropTypes.arrayOf(PropTypes.object),
  allManifestations: PropTypes.arrayOf(PropTypes.object),
  allExpenseItems: PropTypes.arrayOf(PropTypes.object),
  allRestaurants: PropTypes.arrayOf(PropTypes.object)
};

function mapStateToProps(state) {
  return {
    selectedItem: state.budgetItemView,
    allExpenseCategories: state.expenseCategories.items,
    allManifestations: state.manifestations.items,
    allExpenseItems: state.expenseItems.items,
    allRestaurants: state.restaurants.items
  };
}

export const BudgetSelectedItem = connect(mapStateToProps)(_BudgetSelectedItem);
