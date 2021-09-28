import React from "react";
import { connect } from "react-redux";
import  {TablePage} from "./TablePage";
import * as routing from "../../redux/modules/routingRedux";

//----------------------------------------------------------------------------
export const tablePageWithProvider = (actionsProvider) => {

  class HOC extends React.Component {           

    render() {       
        return <TablePage {...this.props} actionsProvider={actionsProvider}/>
    }
  }

  function mapStateToProps(state) {
    return {      
      itemsPerPage: actionsProvider.getItemsPerPage(state),
      isAllItemsChecked: actionsProvider.isAllItemsChecked(state),    
      items: actionsProvider.getItems(state),            
      totals: actionsProvider.getTotals(state),
      columns: actionsProvider.getColumns(state), 
      tableName: routing.getHeader(state).name,
      
      sortBy: actionsProvider.getSortBy(state),
      sortOrder: actionsProvider.getSortOrder(state),

      topRowNumber: actionsProvider.getTopRowNumber(state),
      count: actionsProvider.getCount(state),
      pageItemsQty: actionsProvider.getItems(state).length,
      selectedItemsQty: actionsProvider.getSelectedItemsQty(state),
    };
  }

  return connect(mapStateToProps)(HOC);
};
