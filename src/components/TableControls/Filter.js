import React from "react";
import PropTypes from "prop-types";
import {SelectBox} from "../SelectBox/SelectBox";
import {IFilterItems} from "../../consts/tableFilters";
import * as dataFuncs from "../../utils/dataFuncs";
import * as serviceFuncs from "../../utils/serviceFunctions";
import {DateRangeBox} from "../DateRangeBox/DateRangeBox";
import {SliderRange} from "../SliderRange/SliderRange";

export class Filter extends React.Component {
  componentDidMount() {
  }

  onValueChange = (filterItem, newValue) => {
    this.props.onChangeFilterValue(filterItem, newValue);
  };

  getSelectBoxItems = filterItem => {
    return filterItem.items.map((item, index) => {
      return {
        isChecked: serviceFuncs.isItemInArray(item, filterItem.value),
        text: filterItem.accessorText(item),
        onClick: () => this.onValueChange(filterItem, item)
      };
    });
  };

  renderFilterItems = () => {
    return this.props.filterItems.map((filterItem, index) => {
      let element;

      switch (filterItem.type) {
        case "input":
        case "arrayInput":
          element = (
            <input
              className="filter__input animated"
              type="text"
              placeholder="Введите..."
              value={filterItem.value}
              onChange={event =>
                this.onValueChange(filterItem, event.target.value)
              }
            />
          );
          break;

        case "numberInput":
          element = (
            <input
              className="filter__input animated"
              type="number"
              placeholder="Введите..."
              value={filterItem.value}
              onChange={event =>
                this.onValueChange(filterItem, event.target.value)
              }
            />
          );
          break;

        case "dateRange":
          element = (
            <DateRangeBox
              filterItem={filterItem}
              onValueChange={this.onValueChange}
              className="filter__calendar w100r animated"
            />
          );
          break;

        case "advancedDateRange":
          element = (
            <DateRangeBox
              useAdvancedInterface
              filterItem={filterItem}
              onValueChange={this.onValueChange}
              className="filter__calendar w100r animated"
            />
          );
          break;

        case "sliderRange":
          element = (
            <SliderRange
              className="sliderRange w100r animated"
              min={0}
              max={100}
              rangeObject={filterItem}
              onValueChange={this.onValueChange}
            />
          );
          break;

        case "selectBox":
          element = (
            <SelectBox
              text={dataFuncs.getFilterText(filterItem)}
              items={this.getSelectBoxItems(filterItem)}
            />
          );
          break;

        case "multiSelectBox":
          element = (
            <SelectBox
              text={dataFuncs.getFilterText(filterItem)}
              items={this.getSelectBoxItems(filterItem)}
              isCheckboxItems={true}
            />
          );
          break;

        default:
          return null;
      }

      const filterTitle = this.renderFilterTitle(filterItem);

      return (
        <div
          key={index}
          className="filter__body--item animated"
          style={{zIndex: this.props.filterItems.length - index}}
        >
          {filterTitle}
          {element}
        </div>
      );

    });
  };

  renderFilterTitle = filterItem => {
    const tooltipText = dataFuncs.getFilterTooltipText(filterItem);

    if (tooltipText) {
      return (
        <div className="filter__title--with-tooltip animated">
          <div className="filter__title animated">
            {filterItem.labelText}
          </div>
          <div className="filter__tooltip">
            <div className="filter__tooltip--icon"></div>
            <div className="filter__tooltip--box">
              {tooltipText}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="filter__title animated">
        {filterItem.labelText}
      </div>
    );
  };

  getClsName = () => {
    let result = "filter__body--box flex animated";

    let filterItemLength = this.props.filterItems;
    if (
      (filterItemLength % 4 === 0 || filterItemLength % 4 >= 3) &&
      filterItemLength > 3 &&
      filterItemLength % 5 !== 0
    ) {
      result = result + " v2";
    } else if (
      (filterItemLength % 5 === 0 || filterItemLength % 5 >= 3) &&
      filterItemLength > 4
    ) {
      result = result + " v3";
    }
    return result;
  };

  render() {
    let cls = this.getClsName();

    return (
      // -- Main Filter--
      <div className="filter__body animated ">
        <div className={cls}>{this.renderFilterItems()}</div>

        <div className="filter__body--buttons flex animated">
          {this.props.onCancelFilterClick && (
            <div
              className="filter__cancel animated"
              onClick={this.props.onCancelFilterClick}
            >
              Отменить
            </div>
          )}
          <div
            className="filter__submit animated"
            onClick={this.props.onApplyFilterClick}
          >
            {this.props.buttonText ? this.props.buttonText : "Применить"}
          </div>
        </div>
      </div>
    );
  }
}

Filter.propTypes = {
  filterItems: IFilterItems.isRequired,
  buttonText: PropTypes.string,
  tooltipText: PropTypes.string,
  onCancelFilterClick: PropTypes.func,
  onApplyFilterClick: PropTypes.func.isRequired,
  onChangeFilterValue: PropTypes.func.isRequired //arguments filterItem, newValue
};
