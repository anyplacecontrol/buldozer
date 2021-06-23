import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as uiActions from "../../redux/modules/uiRedux";
import { OutsideClickHandler } from "../OutsideClickHandler/OutsideClickHandler";
import { IColumn } from "../../consts/tableColumns";

export class TableColumnsChooser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: false };
  }

  onTriggerVisible = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  onCancelClick = () => {
    this.setState({ isVisible: false });
  };

  onCheckboxClick = (item) => {
    this.props.onTriggerColumn(item);
  }

  onResetClick = () => {
    this.props.onResetColumns();    
  }

  renderItems = () => {
    return this.props.columns.map((item, index) => {
      let className = "checkbox__label-2 flex animated";

      if (item.isVisible) {
        className = "checkbox__label-2 flex animated checked";
      }

      return (
        <div key={index} className="table__filter--checkbox flex animated">
          <div className="checkbox animated">
            <input
              onClick={() => {                
                this.onCheckboxClick(item);
              }}
              className="checkbox__input animated"
              id={"columns-"+index}
              type="checkbox"
            />
            <label className={className} htmlFor={"columns-"+index}>
              <span className="checkbox__label-2--icon animated" />
              <span className="checkbox__label-2--text">{item.text}</span>
            </label>
          </div>
        </div>
      );
    });
  };

  render() {
    let cls = "table__filter--icon animated";
    if (this.state.isVisible) cls = "table__filter--icon active animated";

    return (
      <OutsideClickHandler
        className="table__filter--inner animated"
        onOutsideClick={this.onCancelClick}
      >
        {/* -- click ".table__filter--icon" -- add class "active"-- */}
        <div className={cls} onClick={this.onTriggerVisible} />
        <div className="table__filter--body flex animated">
          {/* <div className="table__filter--counter animated">
            1 out of 11 visible
          </div> */}
          <div className="table__filter--checkboxes flex animated">
            {this.renderItems()}
          </div>
          <div className="table__filter--buttons flex animated">
            <div className="table__filter--button table__filter--reset flex animated"
            onClick = {this.onResetClick}>
              Reset
            </div>
            {/* -- click ".table__filter--cancel" remove class "active" for ".table__filter--icon"-- */}
            <div
              className="table__filter--button table__filter--cancel flex animated"
              onClick={this.onCancelClick}
            >
              Close
            </div>
          </div>
        </div>
      </OutsideClickHandler>
    );
  }
}

TableColumnsChooser.propTypes = {
  columns: PropTypes.arrayOf(IColumn).isRequired,
  onTriggerColumn: PropTypes.func.isRequired, //argument = column object
  onResetColumns: PropTypes.func.isRequired
};
