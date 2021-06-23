import React from "react";
import PropTypes from "prop-types";
import Pagination from "react-js-pagination";
import { OutsideClickHandler } from "../../components/OutsideClickHandler/OutsideClickHandler";

export const ITableFooter = {
  topRowNumber: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  pageItemsQty: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired
};

export class TableFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isItemsPerPageVisible: false };
  }

  onPaginationChange = pageNumber => {
    if (this.props.onPaginationChange)
      this.props.onPaginationChange(pageNumber);
  };

  onItemsPerPageClick = () => {
    this.setState({
      isItemsPerPageVisible: !this.state.isItemsPerPageVisible
    });
  };

  hideItemsPerPage = () => {
    this.setState({
      isItemsPerPageVisible: false
    });
  };

  onExportCSV = () => {
    if (this.props.onExportCSV) this.props.onExportCSV();
  };

  onItemsPerPageChange = quantity => {
    this.props.onItemsPerPageChange(quantity);
  };

  render() {
    return (
      <>
        {this.props.count > 0 && (
          <>
            <div
              className="export-list animated pointer"
              onClick={() => this.onExportCSV()}
            >
              Export CSV
            </div>

            {this.props.usePagination && (
              <Pagination
                innerClass="pagination flex animated"
                activePage={
                  Math.floor(
                    this.props.topRowNumber / this.props.itemsPerPage
                  ) + 1
                }
                itemsCountPerPage={this.props.itemsPerPage}
                totalItemsCount={this.props.count}
                pageRangeDisplayed={5}
                onChange={this.onPaginationChange}
                activeClass="active"
                itemClass="pagination__item animated"
                itemClassFirst="pagination__item animated itemFirst"
                itemClassPrev="pagination__item animated itemPrev"
                itemClassNext="pagination__item animated itemNext"
                itemClassLast="pagination__item animated itemLast"
                linkClass="link animated"
                activeLinkClass="activeLink"
              />
            )}

            {this.props.usePagination && (
              <OutsideClickHandler onOutsideClick={this.hideItemsPerPage}>
                <div
                  className="table__tfoot--right flex animated"
                  onClick={this.onItemsPerPageClick}
                >
                  <div
                    className={
                      this.state.isItemsPerPageVisible
                        ? "select is--top z-index-10 animated active"
                        : "select is--top z-index-10 animated"
                    }
                  >
                    <div className="select__text animated">
                      {this.props.itemsPerPage}
                    </div>
                    <div className="select__list animated">
                      <div
                        className="select__list--item animated"
                        onClick={() => this.onItemsPerPageChange(30)}
                      >
                        30
                      </div>
                      <div
                        className="select__list--item animated"
                        onClick={() => this.onItemsPerPageChange(50)}
                      >
                        50
                      </div>
                      <div
                        className="select__list--item animated"
                        onClick={() => this.onItemsPerPageChange(100)}
                      >
                        100
                      </div>
                      <div
                        className="select__list--item animated"
                        onClick={() => this.onItemsPerPageChange(250)}
                      >
                        250
                      </div>
                      <div
                        className="select__list--item animated"
                        onClick={() => this.onItemsPerPageChange(500)}
                      >
                        500
                      </div>
                    </div>
                  </div>

                  <div className="quantity animated">
                    {this.props.topRowNumber + 1} -{" "}
                    {this.props.topRowNumber + this.props.pageItemsQty} of{" "}
                    {this.props.count} items
                  </div>
                </div>
              </OutsideClickHandler>
            )}
          </>
        )}
      </>
    );
  }
}

TableFooter.propTypes = {
  ...ITableFooter,
  usePagination: PropTypes.bool.isRequired,
  onPaginationChange: PropTypes.func,
  onExportCSV: PropTypes.func,
  onItemsPerPageChange: PropTypes.func //argument is quantity
};
