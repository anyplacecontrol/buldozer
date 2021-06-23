import React from "react";
import PropTypes from "prop-types";
import { FunctionalTable } from "../../components/Table/FunctionalTable";
import { IColumn } from "../../consts/tableColumns";

export class TablePanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sortBy: this.props.sortBy,
      sortOrder: this.props.sortOrder || "descending",
    };
  }

  onSortClick = columnObj => {
    if (!columnObj.accessorSort) return;

    let currentSortColumn = this.state.sortBy;
    let newSortOrder = "descending";

    //if clicked to the same column - just change sort order mode
    if (currentSortColumn.accessorSort === columnObj.accessorSort) {
      if (this.state.sortOrder === "descending") newSortOrder = "ascending";
      else newSortOrder = "descending";
    }

    this.setState({
      sortBy: columnObj,
      sortOrder: newSortOrder
    });

    if (this.props.onSortClick)
      this.props.onSortClick(columnObj)
  };

  render() {
    return (
      <div className="block-set__box flex animated" id="table">
        {this.props.caption && (
          <div className="block-set__title animated">
            {this.props.caption}
          </div>
        )}
        {/* -- add class ".no-padding"-- */}
        <div className="block-set__inner flex w100 no-padding animated">
          <FunctionalTable
            data={this.props.items}
            totals={this.props.totals}
            columns={this.props.columns}
            sortBy={this.state.sortBy}
            sortOrder={this.state.sortOrder}
            itemsPerPage={0}
            onSortClick={this.onSortClick}
            onRowClick={this.props.onRowClick}
            noTopMargin={true}
          />
        </div>
      </div>
    );
  }
}

TablePanel.propTypes = {
  caption: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  totals: PropTypes.object,
  sortBy: IColumn.isRequired,
  sortOrder: PropTypes.string,
  columns: PropTypes.arrayOf(IColumn).isRequired,
  onRowClick: PropTypes.func, //argument: item
  onSortClick: PropTypes.func, //argument: column
};
