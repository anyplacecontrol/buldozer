import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as manifestationViewRedux from "../../redux/modules/manifestationViewRedux";
import {manifestationViewActions } from "../../redux/modules/manifestationViewRedux";
import { BaseView } from "../../components/BaseView/BaseView";
import { ManifestationGeneral } from "./ManifestationGeneral";

export class manifestationView_ extends React.Component {

  onChangeName = newValue => {
    this.props.dispatch(manifestationViewActions.changeName(newValue));
  };  
  
  render() {    

    return (
      <BaseView
        viewName="Обзор проявления"
        actionsProvider={manifestationViewActions}
      >
        <ManifestationGeneral
          manifestation={this.props.manifestation}          
          onChangeName={this.onChangeName}                    
        />

      </BaseView>
    );
  }
}

manifestationView_.propTypes = {
  dispatch: PropTypes.func.isRequired,
  manifestation:manifestationViewRedux.IManifestationView
};

function mapStateToProps(state) {
  return {
   manifestation: state.manifestationView
  };
}

export const manifestationView = connect(mapStateToProps)(manifestationView_);
