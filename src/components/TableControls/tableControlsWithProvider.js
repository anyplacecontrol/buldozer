import React from "react";
import { connect } from "react-redux";
import { TableControls } from "./TableControls";

//----------------------------------------------------------------------------
export const tableControlsWithProvider = actionsProvider => {
  class HOC extends React.Component {

    render() {      

      return (
        <TableControls {...this.props} actionsProvider={actionsProvider} />
      );
    }
  }

  function mapStateToProps(state) {
    return {
      alert: state.ui.alert,
      isFilterVisible: state.ui.isFilterVisible,
      isAllowAddItem: actionsProvider.ALLOW_ADD_ITEM,
      filterItems: actionsProvider.getFilterItems(state),  
      wasFilterChanged: actionsProvider.getWasFilterChanged(state),  
    };
  }

  return connect(mapStateToProps)(HOC);
};
