//Component is used either for all table pages
//or for panels like "credit cards" for Customer View
//It contains Columns Chooser, CheckBoxes to select multiple rows,
//Sorting for columns and Buttons "Edit"/"Delete" for each row

import React from "react";
import PropTypes from "prop-types";
import { SimpleTable } from "../../components/Table/SimpleTable";
import { TableHeaderCheckbox } from "../../components/TableElements/TableHeaderCheckbox";
import { TableCellCheckbox } from "../../components/TableElements/TableCellCheckbox";
import { TableButtons } from "../../components/TableElements/TableButtons";
import { TableColumnsChooser } from "../../components/TableElements/TableColumnsChooser";
import * as tableColumns from "../../consts/tableColumns";
import ReactResizeDetector from "react-resize-detector";

export class FunctionalTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableWidth: 0
    };
  }

  //HANDLE COMMANDS-------------------------------------------------------------

  //For CheckBoxes

  onCellClick = (id, e) => {
    //Prevent onRowClick if checkbox was clicked
    if (id === "checkbox" || id === "buttons") e.stopPropagation();
  };

  onSelectAllItems = () => {
    if (this.props.onSelectAllItems) this.props.onSelectAllItems();
  };

  onSelectItem = item => {
    if (this.props.onSelectItem) this.props.onSelectItem(item);
  };

  //For Items in Table

  onRowClick = item => {
    if (this.props.onRowClick) this.props.onRowClick(item);
  };

  //For Columns Chooser

  onTriggerColumn = columnObj => {
    if (this.props.onTriggerColumn) this.props.onTriggerColumn(columnObj);
  };

  onResetColumns = () => {
    if (this.props.onResetColumns) this.props.onResetColumns();
  };

  //For table Header

  onSortClick = column => {
    if (!column.accessorSort) return;
    if (this.props.onSortClick) this.props.onSortClick(column);
  };

  //RENDERING--------------------------------------------------------------------

  onTableResize = (width, height) => {
    this.setState({ tableWidth: width });
  };

  getButtonsPosition = () => {
    let left = this.state.tableWidth - 208 - 40;

    if (!this.props.onDeleteClick) left = this.state.tableWidth - 98 - 40;

    if (left < 0) return 0;
    return left;
  };

  //CheckBoxes Rendering

  getCellCheckboxCls = isChecked => {
    if (isChecked) return "checkbox__label checked animated";
    else return "checkbox__label animated";
  };

  getHeaderCheckboxCls = isChecked => {
    if (isChecked) return "checkbox__label main checked animated";
    else return "checkbox__label main animated";
  };

  //Row Rendering

  getRowCls = dataItem => {
    if (dataItem.isChecked) return "active";
    else return "";
  };

  //Columns and Cells Rendering

  getColumnsTemplate = () => {
    let result = [];

    if (this.props.onRowClick || this.props.onDeleteClick)
    result.push(
      //Edit, Delete Buttons
      {
        cellClassName: "buttons",
        cellStyle: { left: this.getButtonsPosition() },
        headerClassName: "hidden",
        id: "buttons",
        Cell: dataItem => (
          <TableButtons
            dataItem={dataItem}
            onDeleteClick={
              (this.props.onDeleteClick && !this.isMultipleItemsSelected)
                ? () => this.props.onDeleteClick(dataItem)
                : null
            }
            onEditClick={
              this.props.onRowClick ? () => this.onRowClick(dataItem) : null
            }
          />
        )
      });

    //Columns Chooser
    if (this.props.onTriggerColumn) {
      result.push({
        cellClassName: "hidden",
        headerClassName: "table__filter",
        Header: () => (
          <TableColumnsChooser
            columns={this.props.columns}
            onTriggerColumn={this.onTriggerColumn}
            onResetColumns={this.onResetColumns}
          />
        )
      });
    }

    //CheckBox
    if (this.props.onSelectItem) {
      let tableObj = {
        cellClassName: "checkbox__box",
        headerClassName: "checkbox__box",
        id: "checkbox",
      };

      // show checkboxes only for item with ID field
      if (this.props.data.length && this.props.data[0].id) {
        tableObj.Header = () => (
          <TableHeaderCheckbox
            isAllItemsChecked={this.props.isAllItemsChecked}
            onSelectAllItems={this.onSelectAllItems}
            getHeaderCheckboxCls={this.getHeaderCheckboxCls}
          />
        );
        tableObj.Cell = dataItem => (
          <TableCellCheckbox
            onSelectItem={this.onSelectItem}
            getCellCheckboxCls={this.getCellCheckboxCls}
            dataItem={dataItem}
          />
        )
      }

      result.push(tableObj);
    }

    for (let i = 0; i < this.props.columns.length; i++) {
      let column = this.props.columns[i];
      if (column.isVisible) {
        //Class for sort arrow
        let sortCls = "sort";
        if (column.accessorSort) {
          sortCls = "sort sortable";
          if (this.props.sortBy.accessorSort === column.accessorSort) {
            if (this.props.sortOrder === "descending")
              sortCls = "sort sortable active sort-down";
            else sortCls = "sort sortable active sort-up";
          }
        }

        result.push({
          Header: () => (
            <div
              onClick={() => this.onSortClick(column)}
              className={sortCls + " flex animated"}
            >
              {column.text}
            </div>
          ),
          accessor: column.accessor,
          cellClassName: column.className,
          headerClassName: column.className
        });
      }
    }

    return result;
  };

  //-----------------------------------------------------------------------------
  render() {
    let accessorSort = this.props.sortBy.accessorSort;
    let sortOrder = this.props.sortOrder;

    //if there is pagination - do not use native sorting
    if (this.props.itemsPerPage > 0) {
      accessorSort = null;
      sortOrder = "";
    }

    let tableCls = this.props.noTopMargin ? "no_top_margin ": "";

    tableCls = tableCls + "column-" + this.props.columns.filter(column => column.isVisible).length;

    //Check if more than 2 items are selected
    let selectedItemsCnt = 0;
    for (let i=0; i<this.props.data.length; i++) {
      if (this.props.data[i].isChecked)
        selectedItemsCnt = selectedItemsCnt + 1;
      if (selectedItemsCnt>1) break;
    }
    this.isMultipleItemsSelected = (selectedItemsCnt>1);

    return (
      <>
        <ReactResizeDetector handleWidth onResize={this.onTableResize} />

        <SimpleTable
          data={this.props.data}
          totals={this.props.totals}
          columns={[...this.getColumnsTemplate()]}
          accessorSort={accessorSort}
          sortOrder={sortOrder}
          onResize={this.onTableResize}
          onCellClick={this.onCellClick}
          onRowClick={this.onRowClick}
          itemsPerPage={this.props.itemsPerPage}
          getRowClassName={dataItem => this.getRowCls(dataItem)}
          renderFooter={this.props.renderFooter}
          tableClassName={tableCls}
        />
      </>
    );
  }
}

FunctionalTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  totals: PropTypes.object,
  itemsPerPage: PropTypes.number.isRequired,
  isAllItemsChecked: PropTypes.bool,
  columns: PropTypes.arrayOf(tableColumns.IColumn).isRequired,
  sortBy: tableColumns.IColumn.isRequired,
  sortOrder: PropTypes.string,
  noTopMargin: PropTypes.bool,

  renderFooter: PropTypes.func,
  onRowClick: PropTypes.func, //argument: item
  onDeleteClick: PropTypes.func, //argument: item
  onSelectItem: PropTypes.func, //argument: item
  onSelectAllItems: PropTypes.func,
  onTriggerColumn: PropTypes.func, //argument: columnObj
  onResetColumns: PropTypes.func,
  onSortClick: PropTypes.func //argument: column
};
