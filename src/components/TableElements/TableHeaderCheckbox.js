import React from "react";
import PropTypes from "prop-types";

export class TableHeaderCheckbox extends React.Component {
  render() {
    return (
      <div id="main_ch" onClick={this.props.onSelectAllItems}>
        <input
          className="checkbox__input animated"
          type="checkbox"
          readOnly
          checked={this.props.isAllItemsChecked}
        />
        <label
          className={this.props.getHeaderCheckboxCls(
            this.props.isAllItemsChecked
          )}
        />
      </div>
    );
  }
}

TableHeaderCheckbox.propTypes = {
    onSelectAllItems: PropTypes.func.isRequired,
    getHeaderCheckboxCls: PropTypes.func.isRequired,
    isAllItemsChecked: PropTypes.bool.isRequired,  
};
