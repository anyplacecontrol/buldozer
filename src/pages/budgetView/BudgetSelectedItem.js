import React from "react";
import PropTypes from "prop-types";
import { getValueByCurrency } from "../../utils/dataFuncs";
import { connect } from "react-redux";
import { SelectBox } from "../../components/SelectBox/SelectBox";
import * as consts from "../../consts/constants";
import { budgetItemViewActions } from "./../../redux/modules/budgetItemViewRedux";

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
      this.props.selectedItem.expenseCategory != null
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
    if (this.props.selectedItem && this.props.selectedItem.expenseItem != null)
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
      this.props.selectedItem.manifestation != null
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
  render() {
    return (
      <div className="block-sets">
        <div className="block-set__box flex animated">
          <div className="block-set__title-box">
            <div className="block-set__title animated">Описание</div>
            <div className="buttons__right flex animated">
              <button
                className="buttons__main button--cancel animated"
                type="button"
              >
                Отменить
              </button>
              <button
                className="buttons__main button--save animated"
                type="button"
              >
                Сохранить
              </button>
            </div>
          </div>
          <div className="block-set__inner flex w100 animated">
            <div className="block-set__item flex animated">
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
            <div className="block-set__item flex animated">
              {/* -- ID -- */}
              {this.props.selectedItem.id != 0 ? (
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
              ) : null}

              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Комментарий
                </div>
                <div className="block-set__content flex w100 animated">
                  <textarea
                    placeholder=""
                    className="block-set__text-area animated"
                    type="text"
                    value={this.props.selectedItem.comment || ""}
                    onChange={e =>
                      this.props.dispatch(
                        budgetItemViewActions.changeComment(e.target.value)
                      )
                    }
                  />
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
                <div className="payment-grid-item">
                  <div className="brand-sub-title">Сумма *</div>
                  <div className="block-set-grid">
                    <div className="block-set-grid-inner">
                      <input
                        className="block-set__input animated"
                        type="text"
                        value="15 000"
                      ></input>
                      <div className="brand-value-text">ГРН</div>
                    </div>
                  </div>
                  <div className="block-set-grid">
                    <div className="block-set-grid-inner">
                      <input
                        className="block-set__input animated"
                        type="text"
                        value="5 000"
                      ></input>
                      <div className="brand-value-text">USD</div>
                    </div>
                  </div>
                  <div className="block-set-grid">
                    <div className="block-set-grid-inner">
                      <input
                        className="block-set__input animated"
                        type="text"
                        value="0"
                      ></input>
                      <div className="brand-value-text">EUR</div>
                    </div>
                  </div>
                  <div className="block-set-grid">
                    <div className="block-set-grid-inner">
                      <input
                        className="block-set__input animated"
                        type="text"
                        value="20 000"
                      ></input>
                      <div className="brand-value-text">ГРН (бартер)</div>
                    </div>
                  </div>
                </div>
                <div className="payment-grid-item">
                  <div className="brand-sub-title">Обновленная сумма</div>
                  <div className="block-set-grid">
                    <div className="block-set-grid-inner">
                      <input
                        className="block-set__input animated"
                        type="text"
                        value="20 000"
                      ></input>
                      <div className="brand-value-text">ГРН</div>
                    </div>
                  </div>
                  <div className="block-set-grid">
                    <div className="block-set-grid-inner">
                      <input
                        className="block-set__input animated"
                        type="text"
                        value="0 000"
                      ></input>
                      <div className="brand-value-text">USD</div>
                    </div>
                  </div>
                  <div className="block-set-grid">
                    <div className="block-set-grid-inner">
                      <input
                        className="block-set__input animated"
                        type="text"
                        value="0 000"
                      ></input>
                      <div className="brand-value-text">EUR</div>
                    </div>
                  </div>
                  <div className="block-set-grid">
                    <div className="block-set-grid-inner">
                      <input
                        className="block-set__input animated"
                        type="text"
                        value="30 000"
                      ></input>
                      <div className="brand-value-text">ГРН (бартер)</div>
                    </div>
                  </div>
                </div>
                <div className="payment-grid-item">
                  <div className="brand-sub-title">Дата обновления суммы</div>
                  <input
                    className="block-set__input animated"
                    type="text"
                    value="10 Окт, 2021, 14:38"
                  />
                  <input
                    className="block-set__input animated"
                    type="text"
                    value=""
                  />
                  <input
                    className="block-set__input animated"
                    type="text"
                    value=""
                  />
                  <input
                    className="block-set__input animated"
                    type="text"
                    value="10 Окт, 2021, 14:38"
                  />
                </div>
                <div className="payment-grid-item">
                  <div className="brand-sub-title">
                    Сотрудник утвердивший обновление
                  </div>
                  <input
                    className="block-set__input animated"
                    type="text"
                    value="Кучменко Д.М."
                  />
                  <input
                    className="block-set__input animated"
                    type="text"
                    value=""
                  />
                  <input
                    className="block-set__input animated"
                    type="text"
                    value=""
                  />
                  <input
                    className="block-set__input animated"
                    type="text"
                    value="Кучменко Д.М."
                  />
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
                    <div className="brand-sub-title">Оплаченная сумма</div>
                    <div className="block-set-grid">
                      <div className="block-set-grid-inner">
                        <input
                          className="block-set__input animated"
                          type="text"
                          value="10 000"
                        />
                        <div className="select animated" style={{ zIndex: 5 }}>
                          <div className="select__text animated">ГРН</div>
                          <div className="select__list animated">
                            <div className="select__list--item animated">
                              ГРН
                            </div>
                            <div className="select__list--item animated">
                              USD
                            </div>
                            <div className="select__list--item animated">
                              EUR
                            </div>
                            <div className="select__list--item animated">
                              ГРН (бартер)
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="block-set-grid">
                      <div className="block-set-grid-inner">
                        <input
                          className="block-set__input animated"
                          type="text"
                          value="3 000"
                        />
                        <div className="select animated" style={{ zIndex: 4 }}>
                          <div className="select__text animated">ГРН</div>
                          <div className="select__list animated">
                            <div className="select__list--item animated">
                              ГРН
                            </div>
                            <div className="select__list--item animated">
                              USD
                            </div>
                            <div className="select__list--item animated">
                              EUR
                            </div>
                            <div className="select__list--item animated">
                              ГРН (бартер)
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="payment-grid-item">
                    <div className="brand-sub-title">Тип оплаты</div>
                    <div className="select animated" style={{ zIndex: 3 }}>
                      <div className="select__text animated">Наличными</div>
                      <div className="select__list animated">
                        <div className="select__list--item animated">
                          Lorem ipsum.
                        </div>
                        <div className="select__list--item animated">
                          Incidunt, mollitia?
                        </div>
                        <div className="select__list--item animated">
                          Hic, quod?
                        </div>
                        <div className="select__list--item animated">
                          Tempora, unde.
                        </div>
                        <div className="select__list--item animated">
                          Nam, reprehenderit.
                        </div>
                        <div className="select__list--item animated">
                          Quisquam, totam.
                        </div>
                      </div>
                    </div>
                    <div className="select animated" style={{ zIndex: 2 }}>
                      <div className="select__text animated">Наличными</div>
                      <div className="select__list animated">
                        <div className="select__list--item animated">
                          Lorem ipsum.
                        </div>
                        <div className="select__list--item animated">
                          Incidunt, mollitia?
                        </div>
                        <div className="select__list--item animated">
                          Hic, quod?
                        </div>
                        <div className="select__list--item animated">
                          Tempora, unde.
                        </div>
                        <div className="select__list--item animated">
                          Nam, reprehenderit.
                        </div>
                        <div className="select__list--item animated">
                          Quisquam, totam.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="payment-grid-item">
                    <div className="brand-sub-title">Дата оплаты</div>
                    <input
                      className="block-set__input animated"
                      type="text"
                      value="10 Окт, 2021, 14:38"
                    />
                    <input
                      className="block-set__input animated"
                      type="text"
                      value="10 Окт, 2021, 14:38"
                    />
                  </div>
                  <div className="payment-grid-item">
                    <div className="brand-sub-title">
                      Сотрудник, получивший наличные
                    </div>
                    <input
                      className="block-set__input animated"
                      type="text"
                      value="Кучменко Д.М."
                    />
                    <input
                      className="block-set__input animated"
                      type="text"
                      value="Кучменко Д.М."
                    />
                  </div>
                </div>
              </div>
              <button className="btn-secondary" type="button">
                + Добавить оплату
              </button>
            </div>
          </div>
          <div className="block-set__inner flex w100 animated">
            <div className="payment-info-list">
              <div className="payment-info-item">
                <div className="payment-info-title">Осталось оплатить:</div>
                <div className="payment-info-values">
                  <div className="payment-info-value">₴5 000</div>
                  <div className="payment-info-value">$2 000</div>
                  <div className="payment-info-value">€0</div>
                  <div className="payment-info-value">₴20 000 (бартер)</div>
                </div>
              </div>
              <div className="payment-info-item">
                <div className="payment-info-title">Всего оплачено:</div>
                <div className="payment-info-values">
                  <div className="payment-info-value">₴10 000</div>
                  <div className="payment-info-value">$3 000</div>
                  <div className="payment-info-value">€0</div>
                  <div className="payment-info-value">₴10 000 (бартер)</div>
                </div>
              </div>
            </div>
          </div>
          <div className="block-set__title-box">
            <div className="block-set__title animated">Приложения</div>
          </div>
          <div className="block-set__inner flex w100 animated">
            <div className="documents">
              <div className="document-box">
                <button className="document-remove" type="button"></button>
                <div className="document-item">
                  <div className="document-buttons">
                    <button className="document-button" type="button">
                      Удалить
                    </button>
                    <button className="document-button" type="button">
                      Скачать
                    </button>
                  </div>
                  <div className="document-title">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Assumenda, soluta?
                  </div>
                </div>
              </div>
              <div className="document-box">
                <button className="document-remove" type="button"></button>
                <div className="document-item">
                  <div className="document-buttons">
                    <button className="document-button" type="button">
                      Удалить
                    </button>
                    <button className="document-button" type="button">
                      Скачать
                    </button>
                  </div>
                  <div className="document-title">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Possimus, unde.
                  </div>
                </div>
              </div>
              <div className="document-box">
                <input
                  className="document-add-input"
                  id="files"
                  type="file"
                  encType="multipart/form-data"
                  accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                />
                <label className="document-add" htmlFor="files">
                  <span className="document-add-icon"></span>
                  <span className="document-add-text">Загрузить</span>
                </label>
              </div>
            </div>
          </div>
          <div className="block-set__inner flex w100 animated --buttons">
            <div className="buttons__right flex animated">
              <button
                className="buttons__main button--cancel animated"
                type="button"
              >
                Отменить
              </button>
              <button
                className="buttons__main button--save animated"
                type="button"
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
        {/* - On click show Add / Edit article form-- */}
        <div className="buttons__top flex w100 animated">
          <div className="buttons__right flex animated"></div>
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
  allExpenseItems: PropTypes.arrayOf(PropTypes.object)
};

function mapStateToProps(state) {
  return {
    selectedItem: state.budgetItemView,
    allExpenseCategories: state.expenseCategories.items,
    allManifestations: state.manifestations.items,
    allExpenseItems: state.expenseItems.items
  };
}

export const BudgetSelectedItem = connect(mapStateToProps)(_BudgetSelectedItem);
