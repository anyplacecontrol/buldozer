import React from "react";
import PropTypes from "prop-types";
import { Filter } from "./Filter";
import { Controls } from "./Controls";
import { AlertPanel } from "./AlertPanel";
import * as uiActions from "../../redux/modules/uiRedux";
import { BaseTableActions } from "../../redux/modules/baseTableRedux";
import { IFilterItems } from "../../consts/tableFilters";

export class TableControls extends React.Component {
  constructor(props) {
    super(props);
  }

  onDeleteSelectedItems = () => {
    if (this.props.selectedItemsQty === 0) {
      alert("Записи не выбраны!");
      return;
    }

    if (
      confirm(
        "Вы уверены, что хотите УДАЛИТЬ " +
          this.props.selectedItemsQty +
          " запись(и/ей)?"
      )
    ) {
      this.props.dispatch(this.props.actionsProvider.deleteSelectedItems());
    }
  };


  onFilterClick = async () => {
    if (this.props.isFilterVisible && this.props.wasFilterChanged) {
      await this.props.dispatch(this.props.actionsProvider.loadFilterItems());
      await this.props.dispatch(this.props.actionsProvider.fetchItems());
    }
    this.props.dispatch(uiActions.toggleFilterVisibility());
  };

  onRefreshClick = async () => {
    await this.props.dispatch(this.props.actionsProvider.fetchItems());
  };

  onCancelFilterClick = () => {
    this.onFilterClick();
  };

  onApplyFilterClick = () => {
    this.props.dispatch(this.props.actionsProvider.fetchItems());
    if (this.props.onApplyFilterClick) this.props.onApplyFilterClick();
  };

  onAlertClose = () => {
    this.props.dispatch(uiActions.HideAlert());
  };

  //For Table Controls

  onAddItemClick = () => {
    this.props.dispatch(this.props.actionsProvider.goto_addItem());
  };

  getAddItemHandler = () => {
    if (this.props.isAllowAddItem) return this.onAddItemClick;
    else return null;
  };

  onImportClick = () => {
    this.props.dispatch(this.props.actionsProvider.importCSV());
  }

  getImportHandler = () => {
    if (this.props.actionsProvider.importCSV) return this.onImportClick;
    else return null;
  };  

  onChangeFilterValue = (filterItem, newValue) => {
    this.props.dispatch(
      this.props.actionsProvider.changeFilterValue(filterItem, newValue)
    );
  };

  render() {
    let onFilterClick = null;
    if (this.props.filterItems && this.props.filterItems.length > 0)
      onFilterClick = this.onFilterClick;

    return (
      <>
        <Controls
          count={this.props.count}
          selectedItemsQty={this.props.selectedItemsQty}
          isFilterVisible={
            this.props.wasFilterChanged || this.props.isFilterVisible
          }
          onFilterClick={onFilterClick}
          onRefreshClick={this.onRefreshClick}
          onAddItemClick={this.getAddItemHandler()}
          onImportClick={this.getImportHandler()}
          onDeleteSelectedItems={
            this.props.actionsProvider.ALLOW_DELETE_ITEM
              ? this.onDeleteSelectedItems
              : null
          }
          onDisableSelectedItems={
            this.props.actionsProvider.ALLOW_DISABLE_ITEM
              ? this.onDisableSelectedItems
              : null
          }
          onEnableSelectedItems={
            this.props.actionsProvider.ALLOW_DISABLE_ITEM
              ? this.onEnableSelectedItems
              : null
          }
        />

        {this.props.alert && this.props.alert.text && (
          <AlertPanel
            text={this.props.alert.text}
            kind={this.props.alert.kind}
            onClose={this.onAlertClose}
          />
        )}

        {(this.props.wasFilterChanged || this.props.isFilterVisible) &&
          this.props.filterItems &&
          this.props.filterItems.length > 0 && (
            <Filter
              filterItems={this.props.filterItems}
              onCancelFilterClick={this.onCancelFilterClick}
              onApplyFilterClick={this.onApplyFilterClick}
              onChangeFilterValue={this.onChangeFilterValue}
            />
          )}
      </>
    );
  }
}

TableControls.propTypes = {
  dispatch: PropTypes.func.isRequired,
  alert: uiActions.IAlert,
  isFilterVisible: PropTypes.bool.isRequired,
  isAllowAddItem: PropTypes.bool.isRequired,
  wasFilterChanged: PropTypes.bool.isRequired,
  filterItems: IFilterItems.isRequired,
  actionsProvider: PropTypes.instanceOf(BaseTableActions).isRequired,
  count: PropTypes.number.isRequired,
  selectedItemsQty: PropTypes.number.isRequired,
  onApplyFilterClick: PropTypes.func
};
