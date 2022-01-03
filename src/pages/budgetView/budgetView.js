import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { budgetTableActions } from "./../../redux/modules/budgetTableRedux";
import { Filter } from "../../components/TableControls/Filter";
import * as uiActions from "../../redux/modules/uiRedux";
import { AlertPanel } from "../../components/TableControls/AlertPanel";
import * as routing from "../../redux/modules/routingRedux";
import { BudgetViewSection } from "./BudgetViewSection";
import { BudgetSelectedItem } from "./BudgetSelectedItem";

export class _budgetView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expandedSection: null };
  }

  async componentDidMount() {
    await this.props.dispatch(budgetTableActions.cleanFetch());
  }

  onApplyFilterClick = () => {};

  //HANDLE COMMANDS-------------------------------------------------------------

  //*For table Header

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

  onCancelClick = () => {
    this.props.dispatch(routing.goto_Back());
  };

  onItemClick = item => {
    this.props.dispatch(budgetTableActions.selectItem(item));
  };

  //-----------------------------------------------------------------------------
  renderSections = () => {
    if (!this.props.sections) return null;
    let JSXArr = [];
    this.props.sections.map((section, index1) => {
      let total = section.total;
      let items = section.items;
      items.map((item, index2) => {
        if (!this.props.selectedItem || item.id != this.props.selectedItem.id)
          JSXArr.push(
            <BudgetViewSection
              key={index1 + "-" + index2}
              item={item}
              total={total}
              onItemClick={() => this.onItemClick(item)}
            />
          );
      });
    });
    return JSXArr;
  };

  //-----------------------------------------------------------------------------

  render() {
    return (
      <div>
        <div className="buttons__left flex animated">
          <button
            className="back animated"
            type="button"
            onClick={this.onCancelClick}
          />
          <div className="buttons__title animated">Бюджет ресторана</div>
        </div>

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

        <button
          style={{ float: "left", marginTop: 25, marginBottom: 25 }}
          className="add animated"
          onClick={()=>this.onItemClick(null)}
        >
          Создать новую статью
        </button>

        {/* ---Выбранная Секция --- */}
        <BudgetSelectedItem/>

        {/* ---Секции --- */}
        <div className="expenses-articles">{this.renderSections()}</div>
      </div>
    );
  }
}

_budgetView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  sections: PropTypes.arrayOf(PropTypes.object).isRequired,
  filterItems: PropTypes.arrayOf(PropTypes.object),
  selectedItem: PropTypes.object,
  alert: uiActions.IAlert
};

function mapStateToProps(state) {
  return {
    sections: state.budgetTable.sections,
    selectedItem: state.budgetTable.selectedItem,
    alert: state.ui.alert,
    filterItems: budgetTableActions.getFilterItems(state)
  };
}

export const budgetView = connect(mapStateToProps)(_budgetView);
