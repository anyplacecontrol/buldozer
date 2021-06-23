import React from "react";
import PropTypes from "prop-types";
import { OutsideClickHandler } from "../OutsideClickHandler/OutsideClickHandler";

export class SelectBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isListVisible: false };
  }

  onSelectClick = () => {
    this.setState({ isListVisible: !this.state.isListVisible });
  };

  onOutsideClick = () => {
    if (this.state.isListVisible) {
      this.setState({ isListVisible: false });
    }
  };

  onItemClick = (e, item) => {
    e.stopPropagation();
    if (!this.props.isCheckboxItems) {
      this.setState({isListVisible: false});
    }
    item.onClick();
  };

  renderCheckBoxItem = item => {
    let cls = "checkbox__label-2 flex animated";
    if (item.isChecked) {
      cls = "checkbox__label-2 flex checked animated";
    }
    return (
      <div className="checkbox animated">
        <input
          className="checkbox__input animated"          
          type="checkbox"
        />
        <label
          className={cls}
        >
          <span className="checkbox__label-2--icon animated" />
          <span className="checkbox__label-2--text">{item.text}</span>
        </label>
      </div>
    );
  };

  renderItems = () => {
    return this.props.items.map((item, index) => {
      if (!item) return null;
      return (
        <div
          key={index}
          className="select__list--item animated is--error"
          onClick={e => this.onItemClick(e, item)}
        >

          {!this.props.renderItem && !this.props.isCheckboxItems && (
            <>{item.text}</>
          )}

          {!this.props.renderItem && this.props.isCheckboxItems && (
            <>{this.renderCheckBoxItem(item)}</>
          )}

          {this.props.renderItem && <>{this.props.renderItem(item)}</>}
        </div>
      );
    });
  };

  render() {
    /* -- click ".select" -- toggle class "active"-- */

    let clsName = this.state.isListVisible
      ? "select active animated"
      : "select animated";

    return (
      <OutsideClickHandler
        onOutsideClick={this.onOutsideClick}
        className={this.props.className}
      >
        <div
          className={clsName}
          onClick={this.onSelectClick}
          style={this.props.style}
        >
          {this.props.text && (
            <div className="select__text animated">{this.props.text}</div>
          )}
          <div className="select__list animated">{this.renderItems()}</div>
        </div>
      </OutsideClickHandler>
    );
  }
}

SelectBox.propTypes = {
  text: PropTypes.string,
  isCheckboxItems: PropTypes.bool,
  renderItem: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      isChecked: PropTypes.bool,
      onClick: PropTypes.func.isRequired
    })
  ).isRequired
};
