import React from "react";
import PropTypes from "prop-types";
import { IExpenseCategoryView } from "../../redux/modules/expenseCategoryViewRedux";
import * as dataFuncs from "../../utils/dataFuncs";

export class ExpenseCategoryGeneral extends React.Component {
  render() {
    let isEditExisting = this.props.expenseCategory.id != 0;

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
                      {this.props.expenseCategory.id}
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
                    !this.props.expenseCategory.isValidated ||
                    this.props.expenseCategory.name != ""
                      ? "block-set__input animated"
                      : "block-set__input animated  is--error"
                  }
                  value={this.props.expenseCategory.name}
                  onChange={e => this.props.onChangeName(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/*------- Right panel-------- */}
          <div className="block-set__item flex animated">
            {/* Дата добавления */}
            {isEditExisting ? (
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Дата добавления
                </div>
                <div className="block-set__content flex w100 animated">
                  {dataFuncs.truncateDate(this.props.expenseCategory.createdDate)}
                </div>
              </div>
            ) : null}

            {/* Кем добавлено */}
            {isEditExisting ? (
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Кем добавлено
                </div>
                <div className="block-set__content flex w100 animated">
                  <div className="block-set__info flex animated">
                    <div className="block-set__info--title animated">
                      {this.props.expenseCategory.createdUser
                        ? this.props.expenseCategory.createdUser.name
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

ExpenseCategoryGeneral.propTypes = {
  expenseCategory:IExpenseCategoryView,
  onChangeName: PropTypes.func.isRequired
};
