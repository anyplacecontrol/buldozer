import React from "react";
import PropTypes from "prop-types";
import * as uiConsts from "../../redux/modules/uiRedux";

export class AlertPanel extends React.Component {
  render() {
    let cls = "primary";

    switch (this.props.kind) {
      case uiConsts.ALERT_ERROR:
        cls = "danger"
        break;
    
      case uiConsts.ALERT_SUCCESS:
        cls = "success"
        break;

      case uiConsts.ALERT_WARNING:
        cls = "warning"
        break;
    }

    return (
      <div className="alert animated">
        <div className={"alert__item flex animated " + cls}>
          {/* -- click ".alert__cancel" remove this parent-- */}
          <div className="alert__cancel animated" onClick={this.props.onClose} />
          <div className="alert__text animated">
            {this.props.text}
          </div>
        </div>
      </div>
    );
  }
}

AlertPanel.propTypes = {
  text: PropTypes.string.isRequired,
  kind: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};
