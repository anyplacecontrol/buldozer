import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as expenseItemViewRedux from "../../redux/modules/expenseItemViewRedux";
import {expenseItemViewActions } from "../../redux/modules/expenseItemViewRedux";
import { BaseView } from "../../components/BaseView/BaseView";
import { ExpenseItemGeneral } from "./ExpenseItemGeneral";
import { IExpenseCategoryView } from "../../redux/modules/expenseCategoryViewRedux";
import { expenseCategoriesActions } from "../../redux/modules/expenseCategoriesRedux";

export class expenseItemView_ extends React.Component {

  onChangeName = newValue => {
    this.props.dispatch(expenseItemViewActions.changeName(newValue));
  };  
  
  onChangeExpenseCategory = newValue => {
    this.props.dispatch(expenseItemViewActions.changeExpenseCategory(newValue));
  };

  render() {    

    return (
      <BaseView
        viewName="Обзор статьи расходов"
        actionsProvider={expenseItemViewActions}
      >
        <ExpenseItemGeneral
          expenseItem={this.props.expenseItem}          
          onChangeName={this.onChangeName}   
          onChangeExpenseCategory={this.onChangeExpenseCategory}
          allExpenseCategories={this.props.allExpenseCategories}                 
        />

      </BaseView>
    );
  }
}

expenseItemView_.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenseItem:expenseItemViewRedux.IExpenseItemView,
  allExpenseCategories: PropTypes.arrayOf(IExpenseCategoryView).isRequired,
};

function mapStateToProps(state) {
  return {
   expenseItem: state.expenseItemView,
   allExpenseCategories: expenseCategoriesActions.getItems(state),
  };
}

export const expenseItemView = connect(mapStateToProps)(expenseItemView_);
