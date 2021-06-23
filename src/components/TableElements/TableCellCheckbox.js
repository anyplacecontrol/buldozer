import React from "react";
import PropTypes from "prop-types";

export class TableCellCheckbox extends React.Component {
  render() {
    return (
        <div
        id={"checkbox-" + this.props.dataItem.id}
        onClick={() => {
          this.props.onSelectItem( this.props.dataItem);
        }}
      >
        <input
          className="checkbox__input animated"
          type="checkbox"
          readOnly
          checked={ this.props.dataItem.isChecked}
        />
        <label
          className={this.props.getCellCheckboxCls(
            this.props.dataItem.isChecked
          )}
        />
      </div>
    );
  }
}

TableCellCheckbox.propTypes = {
    onSelectItem: PropTypes.func.isRequired, //argument is item object
    getCellCheckboxCls: PropTypes.func.isRequired, //argument is isChecked 
    dataItem: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]
        ).isRequired,
      isChecked: PropTypes.bool.isRequired,
    })    
};
