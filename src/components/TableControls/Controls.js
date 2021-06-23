import React from "react";
import PropTypes from "prop-types";
import {SelectBox} from "../SelectBox/SelectBox";

export class Controls extends React.Component {
  render() {
    let filterBtnCls = this.props.isFilterVisible
      ? "filter__button flex active animated"
      : "filter__button flex animated";

    return (
      <>
        {/* -- Nav before table-- */}
        <div className="main-nav flex w100 animated">
          {(this.props.onDeleteSelectedItems) &&
          <div className="main-nav__left flex animated">
            <div className="filter__select animated">
              <SelectBox
                text="Действия"
                items={[
                  this.props.onDeleteSelectedItems ?
                    {text: "Удалить", onClick: this.props.onDeleteSelectedItems} : null,                
                ]}
              />
            </div>

            <div className="filter__count animated">
              {this.props.count} записей найдено ({this.props.selectedItemsQty} выбрано)
            </div>

          </div>
          }

          <div className="main-nav__right flex animated">
            <button className="main-nav__refresh animated" onClick={this.props.onRefreshClick}/>
            {/* -- click ".filter__button" -- toggle class "active" and toggle class "hidden" for .filter__body--
            -- added class ".flex"--
            -- changed structure-- */}
            {this.props.onFilterClick &&
            <div className={filterBtnCls} onClick={this.props.onFilterClick}>
              <div className="filter__button--icon animated"/>
              <div className="filter__button--text animated">Фильтр</div>
            </div>
            }

            {this.props.onAddItemClick && (
              <button
                className="add animated"
                onClick={this.props.onAddItemClick}
              >
                Добавить
              </button>
            )}


          </div>
        </div>
      </>
    );
  }
}

Controls.propTypes = {
  onFilterClick: PropTypes.func,
  onAddItemClick: PropTypes.func,
  onDeleteSelectedItems: PropTypes.func,  
  onRefreshClick: PropTypes.func,
  isFilterVisible: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired,
  selectedItemsQty: PropTypes.number.isRequired
};
