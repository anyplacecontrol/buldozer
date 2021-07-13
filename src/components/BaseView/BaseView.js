import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as uiRedux from "../../redux/modules/uiRedux";
import * as routing from "../../redux/modules/routingRedux";
import { BaseViewActions } from "../../redux/modules/baseViewRedux";
import { TopButtons } from "./TopButtons";
import { AlertPanel } from "../TableControls/AlertPanel";

export class BaseView_ extends React.Component {
  async componentDidMount() {
    if (!this.props.actionsProvider) return;

    //this.componentDidUpdate();

    await this.props.dispatch(this.props.actionsProvider.initializeView());
    //set previous values of some state fields
    await this.props.dispatch(this.props.actionsProvider.initializeView_end());
  }      

  componentWillUnmount = async () => {
    this._isUnmounted = true;

    if (!this.props.actionsProvider) return;

    let dispatch = this.props.dispatch;
    let actionsProvider = this.props.actionsProvider;
    await dispatch(actionsProvider.resetState());        
  };

  onSubmitClick = async () => {
    if (this.props.beforeOnSubmitClick) await this.props.beforeOnSubmitClick();
    await this.props.dispatch(uiRedux.HideAlert());
    this.props.dispatch(this.props.actionsProvider.updateItem());
  };

  onCancelClick = () => {
    this.props.dispatch(routing.goto_Back());
  };

  onAlertClose = () => {
    this.props.dispatch(uiRedux.HideAlert());
  };

  render() {
    if (this._isUnmounted) return null;

    let isSubmit = this.props.actionsProvider
      ? this.props.actionsProvider._TABLE_ACTIONS_PROVIDER.ALLOW_ADD_ITEM
      : false;

    let caption = this.props.viewName;        

    return (
      <>
        {/* -- Top Buttons-- */}
        <div className="buttons__top flex w100 animated" id="top">
          <TopButtons
            onCancelClick={this.onCancelClick}
            onSubmitClick={isSubmit ? this.onSubmitClick : null}
            caption={caption}
          />
        </div>

        {this.props.alert && this.props.alert.text && (
          <AlertPanel
            text={this.props.alert.text}
            kind={this.props.alert.kind}
            onClose={this.onAlertClose}
          />
        )}

        {this.props.children}

        {/* -- Bottom Buttons-- */}
        <div className="buttons__bottom flex w100 animated">
          <TopButtons
            hideCaption
            onCancelClick={this.onCancelClick}
            onSubmitClick={isSubmit ? this.onSubmitClick : null}
          />
        </div>
      </>
    );
  }
}

BaseView_.propTypes = {
  //passed from mapStateToProps
  dispatch: PropTypes.func.isRequired,  
  alert: uiRedux.IAlert,

  //Passed via props
  children: PropTypes.any,
  actionsProvider: PropTypes.instanceOf(BaseViewActions), //TODO: isRequired
  viewName: PropTypes.string.isRequired,
  beforeOnSubmitClick: PropTypes.func
};

function mapStateToProps(state) {
  return {
    alert: state.ui.alert,        
  };
}

export const BaseView = connect(mapStateToProps)(BaseView_);
