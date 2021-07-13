import React from "react";
import PropTypes from "prop-types";
import { tableControlsWithProvider } from "../../components/TableControls/tableControlsWithProvider";
import { FunctionalTable } from "../../components/Table/FunctionalTable";
import { IColumn } from "../../consts/tableColumns";
import { BaseTableActions } from "../../redux/modules/baseTableRedux";
import {
  TableFooter,
  ITableFooter
} from "../../components/TableElements/TableFooter";
import { CSVLink } from "react-csv";
import {
  ShowAlert,
  ALERT_ERROR,
  changeItemsPerPage
} from "../../redux/modules/uiRedux";

export class TablePage extends React.Component {
  constructor(props) {
    super(props);

    this.exportButton = null;
    this.state = {
      csvData: null
    };
  }

  async componentDidMount() {
    //do clean fetch with zero filters only if needed
    await this.props.dispatch(this.props.actionsProvider.cleanFetch());
  }

  onApplyFilterClick = () => {
    //logic is called inside of TableControls component
    this.setState({ csvData: null });
  };
  //HANDLE COMMANDS-------------------------------------------------------------

  //For CheckBoxes

  onSelectAllItems = () => {
    this.props.dispatch(this.props.actionsProvider.selectAllItems());
  };

  onSelectItem = item => {
    this.props.dispatch(this.props.actionsProvider.selectItem(item));
  };

  //For Items in Table

  onRowClick = item => {
    this.props.dispatch(this.props.actionsProvider.goto_editItem(item.id));
  };

  onDeleteClick = item => {
    if (confirm("Вы уверены, что хотите удалить эту запись?")) {
      this.props.dispatch(this.props.actionsProvider.deleteItem(item));
      this.setState({ csvData: null });
    }
  };

  //*For Columns Chooser

  onTriggerColumn = columnObj => {
    this.props.dispatch(this.props.actionsProvider.triggerColumn(columnObj));
    this.setState({ csvData: null });
  };

  onResetColumns = () => {
    this.props.dispatch(this.props.actionsProvider.resetColumns());
    this.setState({ csvData: null });
  };

  //For Table Footer

  onPaginationChange = pageNumber => {
    this.props.dispatch(
      this.props.actionsProvider.fetchByPageNumber(pageNumber)
    );
    this.setState({ csvData: null });
  };

  onItemsPerPageChange = async quantity => {
    await this.props.dispatch(changeItemsPerPage(quantity));
    this.props.dispatch(this.props.actionsProvider.fetchItems(0));
  };

  onExportCSV = async () => {
    if (this.state.csvData && this.exportButton) this.exportButton.click();
    else {
      try {
        let data = await this.props.dispatch(
          this.props.actionsProvider.fetchCsv()
        );
        this.setState({ csvData: data });
        setTimeout(() => {
          this.exportButton.click();
        }, 300);
      } catch (e) {
        this.props.dispatch(ShowAlert(e.message, ALERT_ERROR));
      }
    }
  };

  simulateExportCsvClick = e => {
    if (e) {
      this.exportButton = e.link;
      //e.link.click();
    }
  };

  //*For table Header

  onSortClick = column => {
    if (!column.accessorSort) return;
    this.props.dispatch(this.props.actionsProvider.sortItemsBy(column));
    this.setState({ csvData: null });
  };

  renderFooter = () => (
    <TableFooter
      usePagination={this.props.itemsPerPage > 0}
      topRowNumber={this.props.topRowNumber}
      count={this.props.count}
      pageItemsQty={this.props.pageItemsQty}
      itemsPerPage={this.props.itemsPerPage}
      onPaginationChange={this.onPaginationChange}
      onExportCSV={this.onExportCSV}
      onItemsPerPageChange={this.onItemsPerPageChange}
    />
  );

  //-----------------------------------------------------------------------------
  render() {
    const TableControls = tableControlsWithProvider(this.props.actionsProvider);

    let tableCls =
      "column-" + this.props.columns.filter(column => column.isVisible).length;

    return (
      <div>
        <TableControls
          count={this.props.count}
          selectedItemsQty={this.props.selectedItemsQty}
          onApplyFilterClick={this.onApplyFilterClick}
        />

        <FunctionalTable
          data={this.props.items}
          columns={this.props.columns}
          sortBy={this.props.sortBy}
          sortOrder={this.props.sortOrder}
          tableClassName={tableCls}
          itemsPerPage={this.props.itemsPerPage}
          isAllItemsChecked={this.props.isAllItemsChecked}
          renderFooter={this.renderFooter}
          onSortClick={this.onSortClick}
          onTriggerColumn={this.onTriggerColumn}
          onResetColumns={this.onResetColumns}
          onSelectItem={
            this.props.actionsProvider.ALLOW_DELETE_ITEM
              ? this.onSelectItem
              : null
          }
          onSelectAllItems={this.onSelectAllItems}
          onRowClick={this.props.actionsProvider.ALLOW_DELETE_ITEM ? this.onRowClick : null}
          onDeleteClick={
            this.props.actionsProvider.ALLOW_DELETE_ITEM
              ? this.onDeleteClick
              : null
          }
        />

        {/* --Hidden Export CSV component -- */}
        {this.state.csvData && (
          <CSVLink
            ref={this.simulateExportCsvClick}
            filename={
              this.props.tableName + " (" + new Date().toString() + ").csv"
            }
            data={this.state.csvData}
          />
        )}
      </div>
    );
  }
}

TablePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  tableName: PropTypes.string,
  isAllItemsChecked: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(IColumn).isRequired,
  sortBy: IColumn.isRequired,
  sortOrder: PropTypes.string.isRequired,
  actionsProvider: PropTypes.instanceOf(BaseTableActions).isRequired,
  ...ITableFooter,
  selectedItemsQty: PropTypes.number.isRequired
};
