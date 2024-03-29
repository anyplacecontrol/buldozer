import React from "react";
import PropTypes from "prop-types";
import * as dataFuncs from "../../utils/dataFuncs";

export class TopButtons extends React.Component {
  render() {
    let userRole = dataFuncs.getUserRole();

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
              Отменить
            </button>
          )}
          {this.props.onSubmitClick && userRole != "recipient" && (
            <button
              className="buttons__main button--save animated"
              type="button"
              onClick={this.props.onSubmitClick}
            >
              Применить
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
