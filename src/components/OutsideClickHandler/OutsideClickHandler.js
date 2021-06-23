import React from "react";
import PropTypes from "prop-types";

export class OutsideClickHandler extends React.Component {
  componentDidMount() {
    let mainContainer = document.getElementById("main");
    if (mainContainer)
      mainContainer.addEventListener(
        "click",
        this.onOuterContainerClick,
        false
      );
  }

  componentWillUnmount() {
    let mainContainer = document.getElementById("main");
    if (mainContainer)
      mainContainer.removeEventListener(
        "click",
        this.onOuterContainerClick,
        false
      );
  }

  onOuterContainerClick = event => {
    //if clicked inside of this children - do not handle it here
    if (this.childComponent.contains(event.target)) return;

    //if clicked outside of this children
    if (this.props.onOutsideClick) {
        this.props.onOutsideClick();
    }
  }; 

  render() {
    let clsName= "";
    if (this.props.className)
    clsName = this.props.className;
    return (
      <div ref={c => (this.childComponent = c)} className={clsName}>             
        {this.props.children}
      </div>
    );
  }
}

OutsideClickHandler.propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    onOutsideClick: PropTypes.func.isRequired
};
