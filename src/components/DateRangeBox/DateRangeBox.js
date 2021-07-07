import React from "react";
import PropTypes from "prop-types";
import {OutsideClickHandler} from "../OutsideClickHandler/OutsideClickHandler";
import {DateRange, DateRangePicker} from "react-date-range";
import {ru} from "react-date-range/src/locale";
import * as dataFuncs from "../../utils/dataFuncs";

export class DateRangeBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isCalendarVisible: false,
    };
  }

  onInputClick = () => {
    this.setState({
      isCalendarVisible: !this.state.isCalendarVisible,
    });
  };

  onOutsideClick = () => {
    if (this.state.isCalendarVisible) {
      this.setState({
        isCalendarVisible: false,
      });
    }
  };

  onResetClick = () => {
    this.onOutsideClick();
    this.props.onValueChange(
      this.props.filterItem,
      {
        startDate: null,
        endDate: null,
      }
    );
  };

  render() {
    let Component = DateRange;
    if (this.props.useAdvancedInterface) {
      Component = DateRangePicker;
    }

    return (
      <OutsideClickHandler
        onOutsideClick={this.onOutsideClick}
        className={this.props.className}
      >
        <input
          className="filter__input calendar animated"
          onClick={this.onInputClick}
          type="text"
          placeholder="Кликните..."
          value={dataFuncs.getFilterText(this.props.filterItem)}
          readOnly
        />

        <button
          className="filter__delete animated"
          type="button"
          onClick={this.onResetClick}
        />

        {this.state.isCalendarVisible && (
          <div>
            <Component
            locale={ru}
              ranges={[
                {
                  startDate: this.props.filterItem.value.startDate || new Date(),
                  endDate: this.props.filterItem.value.endDate || new Date(),
                  key: "selection"
                }
              ]}
              onChange={ranges => {
                this.props.onValueChange(
                  this.props.filterItem,
                  ranges.selection
                );
              }}
            />
          </div>
        )}
      </OutsideClickHandler>
    );
  }
}

DateRangeBox.propTypes = {
  useAdvancedInterface: PropTypes.bool,
  onValueChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  filterItem: PropTypes.shape({
    value: PropTypes.shape({
      startDate: PropTypes.date,
      endDate: PropTypes.date,
    })
  })
};
