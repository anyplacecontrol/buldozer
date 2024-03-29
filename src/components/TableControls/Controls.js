import React from "react";
import PropTypes from "prop-types";
import { SelectBox } from "../SelectBox/SelectBox";
import * as dataFuncs from "../../utils/dataFuncs";

export class Controls extends React.Component {
  render() {
    let userRole = dataFuncs.getUserRole();

    let filterBtnCls = this.props.isFilterVisible
      ? "filter__button flex active animated"
      : "filter__button flex animated";

    return (
      <>
        {/* -- Nav before table-- */}
        <div className="main-nav flex w100 animated">
          {(this.props.onDeleteSelectedItems && userRole != "recipient") && (
            <div className="main-nav__left flex animated">
              <div className="filter__select animated">
                <SelectBox
                  text="Действия"
                  items={[
                    this.props.onDeleteSelectedItems
                      ? {
                          text: "Удалить",
                          onClick: this.props.onDeleteSelectedItems
                        }
                      : null
                  ]}
                />
              </div>

              <div className="filter__count animated">
                {this.props.count} записей найдено (
                {this.props.selectedItemsQty} выбрано)
              </div>
            </div>
          )}

          <div className="main-nav__right flex animated">
            <button
              className="main-nav__refresh animated"
              onClick={this.props.onRefreshClick}
            />
            {/* -- click ".filter__button" -- toggle class "active" and toggle class "hidden" for .filter__body--
            -- added class ".flex"--
            -- changed structure-- */}
            {this.props.onFilterClick && (
              <div className={filterBtnCls} onClick={this.props.onFilterClick}>
                <div className="filter__button--icon animated" />
                <div className="filter__button--text animated">Фильтр</div>
              </div>
            )}

            {this.props.onAddItemClick && userRole != "recipient" && (
              <button
                className="add animated"
                onClick={this.props.onAddItemClick}
              >
                Добавить
              </button>
            )}

            {this.props.onImportClick && userRole != "recipient" && (
              <>                  
                <div className="import__button flex animated">
                <input
                  style={{width: 0, height: 0}}
                  id="files"
                  type="file"
                  encType="multipart/form-data"                  
                  onChange={this.props.onImportClick}
                />
                <div className="import__button--icon animated"></div>
                <label className="import__button--text" htmlFor="files">                 
                  <span className="image__add--text animated"> Импорт CSV</span>
                </label>
              </div>
              </>
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
  selectedItemsQty: PropTypes.number.isRequired,

  onImportClick: PropTypes.func,  
};
