import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as serviceTypeViewRedux from "../../redux/modules/serviceTypeViewRedux";
import {serviceTypeViewActions } from "../../redux/modules/serviceTypeViewRedux";
import { BaseView } from "../../components/BaseView/BaseView";
import { ServiceTypeGeneral } from "./ServiceTypeGeneral";

export class serviceTypeView_ extends React.Component {

  onChangeName = newValue => {
    this.props.dispatch(serviceTypeViewActions.changeName(newValue));
  };  
  
  render() {    

    return (
      <BaseView
        viewName="Обзор вида услуг"
        actionsProvider={serviceTypeViewActions}
      >
        <ServiceTypeGeneral
          serviceType={this.props.serviceType}          
          onChangeName={this.onChangeName}                    
        />

      </BaseView>
    );
  }
}

serviceTypeView_.propTypes = {
  dispatch: PropTypes.func.isRequired,
  serviceType:serviceTypeViewRedux.IServiceTypeView
};

function mapStateToProps(state) {
  return {
   serviceType: state.serviceTypeView
  };
}

export const serviceTypeView = connect(mapStateToProps)(serviceTypeView_);
