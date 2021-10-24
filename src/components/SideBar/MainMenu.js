import React from "react";
import PropTypes from "prop-types";
import * as routeNames from "../../consts/routeNames";
import * as dataFuncs from "../../utils/dataFuncs";

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

    let userRole = dataFuncs.getUserRole();

    for (let i = 0; i < this.props.items.length; i++) {
      let item = this.props.items[i];

      //Прячем разделы меню, которые не разрешены обычным пользователям
      if (!(userRole==="admin") && item.path === routeNames.ROUTE_NAMES.users) continue;
      if (userRole==="recipient" && 
          item.path != routeNames.ROUTE_NAMES.cards &&
          item.path != routeNames.ROUTE_NAMES.cardView &&
          item.path != routeNames.ROUTE_NAMES.cardView ) continue;

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

          if (!subitem.isHidden) {
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
          {innerJsxArr.length > 0 ? (
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
