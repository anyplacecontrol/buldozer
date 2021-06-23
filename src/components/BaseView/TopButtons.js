import React from "react";
import PropTypes from "prop-types";

export class TopButtons extends React.Component {
  render() {
    return (
      <>
        {this.props.caption && (
          <div className="buttons__left flex animated">
            <button
              className="back animated"
              type="button"
              onClick={this.props.onCancelClick}
            />
            <div className="buttons__title animated">{this.props.caption}</div>
          </div>
        )}

        <div className="buttons__right flex animated">
          {this.props.onCancelClick && (
            <button
              className="buttons__main button--cancel animated"
              type="button"
              onClick={this.props.onCancelClick}
            >
              Cancel
            </button>
          )}
          {this.props.onSubmitClick && (
            <button
              className="buttons__main button--save animated"
              type="button"
              onClick={this.props.onSubmitClick}
            >
              Submit
            </button>
          )}
        </div>
      </>
    );
  }
}

TopButtons.propTypes = {
  onSubmitClick: PropTypes.func,
  onCancelClick: PropTypes.func,
  caption: PropTypes.string
};
