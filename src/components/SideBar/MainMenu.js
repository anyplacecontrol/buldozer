import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import * as routeNames from "../../consts/routeNames";

export class MainMenu extends React.Component {
  onClick = path => {
    this.props.onItemClick(path);
  };

  isItemActive = item => {
    //if item does not contain subitems

    if (item.path === this.props.currentPath) {
      return true;
    } else if (!item.items) {
      return false;
    }

    let isSubItemActive = false;
    for (let j = 0; j < item.items.length; j++) {
      if (item.items[j].path === this.props.currentPath) {
        isSubItemActive = true;
        break;
      }
    }

    return isSubItemActive;
  };

  isAnyVisibleSubitems = subitems => {
    let result = false;
    for (let i = 0; i < subitems.length; i++) {
      let subitem = subitems[i];
      if (!subitem.isHidden) {
        result = true;
      }
    }
    return result;
  };

  getLiClassName = item => {
    return this.isItemActive(item)
      ? "main-menu__item animated active " + item.cssCls
      : "main-menu__item animated " + item.cssCls;
  };

  getSubLiClassName = itemPath => {
    return itemPath === this.props.currentPath
      ? "main-menu__sub--item animated active"
      : "main-menu__sub--item animated";
  };

  getLiWithSubitemsClassName = item => {
    if (this.isAnyVisibleSubitems(item.items)) {
      return this.isItemActive(item)
        ? "main-menu__item " + item.cssCls + " sub animated active"
        : "main-menu__item " + item.cssCls + " sub animated";
    }
    //if all subitems are hidden
    else {
      return this.isItemActive(item)
        ? "main-menu__item animated active " + item.cssCls
        : "main-menu__item animated " + item.cssCls;
    }
  };

  getLinkClassName = item => {
    return this.isItemActive(item)
      ? "main-menu__link animated active"
      : "main-menu__link animated";
  };

  getSubLinkClassName = itemPath => {
    return itemPath === this.props.currentPath
      ? "main-menu__sub--link animated active"
      : "main-menu__sub--link animated";
  };

  renderItems = () => {
    let jsxArr = [];
    let userRole = "Guest";
    if (window.myUser && window.myUser.role) {
      userRole = window.myUser.role.name;
    }

    for (let i = 0; i < this.props.items.length; i++) {
      let item = this.props.items[i];

      if (
        userRole !== "SuperAdmin" &&
        item.path === routeNames.ROUTE_NAMES.statusesProducts
      ) {
        continue;
      }

      let hiddenMenuItems = [];
      let hiddenMenuSubItems = [];

      if (userRole === "manager") {
        hiddenMenuItems = [
          routeNames.ROUTE_NAMES.reportOrders,
          routeNames.ROUTE_NAMES.reportInventoryByStore,
          routeNames.ROUTE_NAMES.reportProductsByPopularity,
          routeNames.ROUTE_NAMES.reportInventoryByProduct,
          routeNames.ROUTE_NAMES.customers,
          routeNames.ROUTE_NAMES.customerView,
          routeNames.ROUTE_NAMES.orders,
          routeNames.ROUTE_NAMES.orderView,
          routeNames.ROUTE_NAMES.mobileOrders,
          routeNames.ROUTE_NAMES.mobileOrderView
        ];
      } else if (userRole === "tester") {
        hiddenMenuItems = [
          routeNames.ROUTE_NAMES.dashboard,
          routeNames.ROUTE_NAMES.customers,
          routeNames.ROUTE_NAMES.cookingTips,
          routeNames.ROUTE_NAMES.emails,
          routeNames.ROUTE_NAMES.users
        ];

        hiddenMenuSubItems = [
          routeNames.ROUTE_NAMES.tags,
          routeNames.ROUTE_NAMES.taxView,
          routeNames.ROUTE_NAMES.bundleView
        ];
      } else if (userRole === "mobile") {
        hiddenMenuItems = [
          routeNames.ROUTE_NAMES.dashboard,
          routeNames.ROUTE_NAMES.cookingTips,
          routeNames.ROUTE_NAMES.emails,
          routeNames.ROUTE_NAMES.users
        ];

        hiddenMenuSubItems = [
          routeNames.ROUTE_NAMES.tags,
          routeNames.ROUTE_NAMES.taxView,
          routeNames.ROUTE_NAMES.bundleView
        ];
      }

      if (hiddenMenuItems.includes(item.path)) {
        continue;
      }

      //if item does not contain sub-items
      if (!item.items && !item.isHidden) {
        jsxArr.push(
          <li key={"item_" + i} className={this.getLiClassName(item)}>
            <div
              onClick={() => this.onClick(item.path)}
              className={this.getLinkClassName(item)}
            >
              {item.name}
            </div>
          </li>
        );
        continue;
      }

      //if item contains sub-items
      let innerJsxArr = [];

      //subitems
      //if (this.isItemActive(item))
      {
        for (let index = 0; index < item.items.length; index++) {
          let subitem = item.items[index];

          if (!subitem.isHidden && !hiddenMenuSubItems.includes(subitem.path)) {
            innerJsxArr.push(
              <li
                key={"subitem_" + index}
                className={this.getSubLiClassName(subitem.path)}
              >
                <div
                  onClick={() => this.onClick(subitem.path)}
                  className={this.getSubLinkClassName(subitem.path)}
                >
                  {subitem.name}
                </div>
              </li>
            );
          }
        }
      }

      //item that contains subitems
      jsxArr.push(
        <li key={"item_" + i} className={this.getLiWithSubitemsClassName(item)}>
          {/* item */}
          <div
            onClick={() => this.onClick(item.path)}
            className={this.getLinkClassName(item)}
          >
            {item.name}
          </div>

          {/* subitems */}
          {innerJsxArr.length>0 ? (
            <ul className="main-menu__sub animated">{innerJsxArr}</ul>
          ) : null}
        </li>
      );
    }

    return <ul className="main-menu animated">{jsxArr}</ul>;
  };

  render() {
    return <>{this.renderItems()}</>;
  }
}

MainMenu.propTypes = {
  currentPath: PropTypes.string.isRequired,
  onItemClick: PropTypes.func.isRequired, //argument is path
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      cssCls: PropTypes.string.isRequired,
      path: PropTypes.string,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          path: PropTypes.string.isRequired
        })
      )
    })
  )
};
