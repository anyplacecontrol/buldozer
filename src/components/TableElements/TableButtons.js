import React from "react";
import PropTypes from "prop-types";

export class TableButtons extends React.Component {
  render() {
    return (     
      <div className="buttons__inner flex animated">
        {this.props.onEditClick && (
          <div
            className="buttons__item button__edit flex animated"
            onClick={() => this.props.onEditClick(this.props.dataItem)}
          >
            {this.props.onDeleteClick ? "Edit" : "View"}
          </div>
        )}

        {this.props.onDeleteClick && (
          <div
            className="buttons__item button__delete flex animated"
            onClick={() => this.props.onDeleteClick(this.props.dataItem)}
          >
            Delete
          </div>
        )}
      </div>     
    );
  }
}

TableButtons.propTypes = {
  dataItem: PropTypes.object.isRequired,
  onEditClick: PropTypes.func, //argument is dataItem
  onDeleteClick: PropTypes.func //argument is dataItem
};
