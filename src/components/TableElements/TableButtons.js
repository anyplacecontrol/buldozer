import React from "react";
import PropTypes from "prop-types";
import * as dataFuncs from "../../utils/dataFuncs";

export class TableButtons extends React.Component {
  render() {
    let userRole = dataFuncs.getUserRole();

    return (     
      <div className="buttons__inner flex animated">
        {this.props.onEditClick && (
          <div
            className="buttons__item button__edit flex animated"
            onClick={() => this.props.onEditClick(this.props.dataItem)}
          >
            {this.props.onDeleteClick ? "Просмотр" : "Просмотр"}
          </div>
        )}

        {this.props.onDeleteClick && userRole != "recipient" && (
          <div
            className="buttons__item button__delete flex animated"
            onClick={() => this.props.onDeleteClick(this.props.dataItem)}
          >
            Удалить
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
