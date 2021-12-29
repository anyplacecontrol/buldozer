import React from "react";
import PropTypes from "prop-types";
import { IExpenseItemView } from "../../redux/modules/expenseItemViewRedux";
import { IExpenseCategoryView } from "../../redux/modules/expenseCategoryViewRedux";
import * as dataFuncs from "../../utils/dataFuncs";
import * as consts from "../../consts/constants";
import { SelectBox } from "../../components/SelectBox/SelectBox";

export class ExpenseItemGeneral extends React.Component {
  renderExpenseCategoriesSelectBox = () => {
    let nullItem = {
      text: consts.noStr,
      onClick: () => this.props.onChangeExpenseCategory(null)
    };

    let itemsArr = this.props.allExpenseCategories.map(
      (expenseCategory, index) => {
        return {
          text: expenseCategory.name,
          onClick: () => this.props.onChangeExpenseCategory(expenseCategory)
        };
      }
    );

    let currentText;
    if (this.props.expenseItem.expenseCategory != null)
      currentText = this.props.expenseItem.expenseCategory.name;
    else currentText = consts.chooseStr;

    return (
      <SelectBox
        style={{ zIndex: 0 }}
        className="w100"
        text={currentText}
        items={[nullItem, ...itemsArr]}
      />
    );
  };

  render() {
    let isEditExisting = this.props.expenseItem.id != 0;

    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">Общее</div>
        <div className="block-set__inner flex w100 animated">
          {/*------- Left panel-------- */}
          <div className="block-set__item flex animated">
            {/* Id */}
            {isEditExisting ? (
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Id
                </div>
                <div className="block-set__content flex w100 animated">
                  <div className="block-set__info flex animated">
                    <div className="block-set__info--title animated">
                      {this.props.expenseItem.id}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Название */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Название*
              </div>
              <div className="block-set__content flex w100 animated">
                <input
                  className={
                    !this.props.expenseItem.isValidated ||
                    this.props.expenseItem.name != ""
                      ? "block-set__input animated"
                      : "block-set__input animated  is--error"
                  }
                  value={this.props.expenseItem.name}
                  onChange={e => this.props.onChangeName(e.target.value)}
                />
              </div>
            </div>

            {/* Дата добавления */}
            {isEditExisting ? (
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Дата добавления
                </div>
                <div className="block-set__content flex w100 animated">
                  {dataFuncs.truncateDate(this.props.expenseItem.createdDate)}
                </div>
              </div>
            ) : null}
          </div>

          {/*------- Right panel-------- */}
          <div className="block-set__item flex animated">
            {/* -- Категория расходов -- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Категория расходов*
              </div>
              <div className="block-set__content flex w100 animated">
                {this.renderExpenseCategoriesSelectBox()}
              </div>
            </div>

            {/* Кем добавлено */}
            {isEditExisting ? (
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Кем добавлено
                </div>
                <div className="block-set__content flex w100 animated">
                  <div className="block-set__info flex animated">
                    <div className="block-set__info--title animated">
                      {this.props.expenseItem.createdUser
                        ? this.props.expenseItem.createdUser.name
                        : "-"}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

ExpenseItemGeneral.propTypes = {
  expenseItem: IExpenseItemView,
  allExpenseCategories: PropTypes.arrayOf(IExpenseCategoryView).isRequired,
  onChangeName: PropTypes.func.isRequired,
  onChangeExpenseCategory: PropTypes.func.isRequired
};
