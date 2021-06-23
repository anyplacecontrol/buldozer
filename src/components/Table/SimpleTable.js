import React from "react";
import PropTypes from "prop-types";
import * as dataFuncs from "../../utils/dataFuncs";
import * as serviceFuncs from "../../utils/serviceFunctions";

export class SimpleTable extends React.Component {
  renderHeaders = () => {
    return this.props.columns.map((column, index) => {
      let innerElement;
      let headerClassName = column.headerClassName
        ? column.headerClassName + " "
        : "";

      if (serviceFuncs.isFunction(column.Header)) innerElement = column.Header();
      else innerElement = column.Header;

      return (
        <div key={index} className={headerClassName + " animated"}>
          {innerElement}
        </div>
      );
    });
  };

  renderCells = dataItem => {
    return this.props.columns.map((column, index) => {
      let innerElement;
      let cellStyle = column.cellStyle;
      if (!cellStyle)
        cellStyle = {};

      let cellClassName =
      column.cellClassName
        ? column.cellClassName + " "
        : "";

      let dataField = "";
      if (!column.Cell && column.accessor) {
        try {
          if (serviceFuncs.isFunction(column.accessor)) dataField = column.accessor(dataItem);
          else dataField = dataItem[column.accessor];          
        } catch (e) {
        
        }
      }

      if (column.Cell) {
        if (serviceFuncs.isFunction(column.Cell)) innerElement = column.Cell(dataItem);
        else innerElement = column.Cell;
      } else {
        innerElement = dataField;       
      }

      return (
        <div
          key={index}
          className={cellClassName + "flex animated"}
          style={cellStyle}
          onClick={e => this.props.onCellClick(column.id, e)}
        >
          <div className="table__td animated"> {innerElement}</div>
        </div>
      );
    });
  };

  renderRows = (sortedData) => {
    if (!sortedData) return null;
    let resultArr = [];    
    let itemsCount;

    if (!this.props.itemsPerPage) itemsCount = sortedData.length;
    else {
      itemsCount = Math.min(this.props.itemsPerPage, sortedData.length);
    }

    for (let dataIndex = 0; dataIndex < itemsCount; dataIndex++) {
      let dataItem = sortedData[dataIndex];

      let rowCls;
      if (this.props.getRowClassName)
        rowCls = this.props.getRowClassName(dataItem);
      if (!rowCls) rowCls = "";
      else rowCls = rowCls + " ";

      let jsx = (
        <div
          key={dataIndex}
          className={rowCls + "table__tr flex animated"}
          onClick={e => this.props.onRowClick(dataItem, e)}
        >
          {this.renderCells(dataItem)}
        </div>
      );

      resultArr.push(jsx);
    }

    return resultArr;
  };
  

  render() { 
    let sortedData = dataFuncs.sortObjArray(this.props.data, this.props.accessorSort, this.props.sortOrder);
        
    let tableCls = "table animated";
    if (this.props.tableClassName) 
      tableCls = tableCls + " " + this.props.tableClassName;

    return (
      <div className={tableCls}>
       
        <div className="table__inner flex animated">
          {/* --Table Header -- */}
          <div className="table__thead animated">
            {/* -- add class ".main" for this ".table__tr" not add class ".active"-- */}
            <div className="table__tr main flex animated">
              {this.renderHeaders()}
            </div>
          </div>

          <div className="table__tbody animated">
            {/* -- Table Row with data -- */}
            {this.renderRows(sortedData)}
          </div>

          {this.props.totals &&
          <div className="table__tfoot v2 flex animated">
            {this.renderRows([this.props.totals])}
          </div>
          }

          {/* --Table Footer -- */}
          {this.props.renderFooter &&
          <div className="table__tfoot flex animated">            
            {this.props.renderFooter()}
          </div>
          }

        </div>
      </div>
    );
  }
}

SimpleTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  totals: PropTypes.object,
  itemsPerPage: PropTypes.number,  
  getRowClassName: PropTypes.func,
  onRowClick: PropTypes.func, //arguments are: (dataItem, event)
  onCellClick: PropTypes.func, //argument are: (id, event)
  onResize: PropTypes.func, //argument are: (width, height)
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      headerClassName: PropTypes.string,
      cellClassName: PropTypes.string,
      cellStyle: PropTypes.object, 
      Header: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),        
      accessor: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
      id: PropTypes.string,
      Cell: PropTypes.func
    })
  ).isRequired,
  accessorSort: PropTypes.oneOfType([PropTypes.func, PropTypes.string]), //if null -  do not sort. otherwise use data item accessor to sort data
  sortOrder: PropTypes.string,
  renderFooter: PropTypes.func,
  tableClassName: PropTypes.string,  
};
