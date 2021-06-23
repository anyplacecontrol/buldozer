import React from "react";
import PropTypes from "prop-types";

export class Panel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">
          {this.props.caption}
        </div>
        <div className="block-set__inner flex w100 animated">
          {this.props.children}
        </div>
      </div>
    );
  }
}

Panel.propTypes = {
  caption: PropTypes.string,
  children: PropTypes.any
};
