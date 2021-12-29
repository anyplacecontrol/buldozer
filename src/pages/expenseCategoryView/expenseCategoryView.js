import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as expenseCategoryViewRedux from "../../redux/modules/expenseCategoryViewRedux";
import {expenseCategoryViewActions } from "../../redux/modules/expenseCategoryViewRedux";
import { BaseView } from "../../components/BaseView/BaseView";
import { ExpenseCategoryGeneral } from "./ExpenseCategoryGeneral";

export class expenseCategoryView_ extends React.Component {

  onChangeName = newValue => {
    this.props.dispatch(expenseCategoryViewActions.changeName(newValue));
  };  
  
  render() {    

    return (
      <BaseView
        viewName="Обзор категории расходов"
        actionsProvider={expenseCategoryViewActions}
      >
        <ExpenseCategoryGeneral
          expenseCategory={this.props.expenseCategory}          
          onChangeName={this.onChangeName}                    
        />

      </BaseView>
    );
  }
}

expenseCategoryView_.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenseCategory:expenseCategoryViewRedux.IExpenseCategoryView
};

function mapStateToProps(state) {
  return {
   expenseCategory: state.expenseCategoryView
  };
}

export const expenseCategoryView = connect(mapStateToProps)(expenseCategoryView_);
