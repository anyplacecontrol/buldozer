import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { budgetItemViewActions } from "./../../redux/modules/budgetItemViewRedux";

export class _BudgetFiles extends React.Component {
  //-------------------------------------------------------------------------------------
  onLoadClick = event => {
    this.props.dispatch(budgetItemViewActions.addFile(event));
  };

  onDeleteClick = fileId => {
    this.props.dispatch(budgetItemViewActions.deleteFile(fileId));
  };

  renderFiles = () => {
    if (!this.props.selectedItem.files) return null;
    return this.props.selectedItem.files.map((file, index) => {
      return (
        <div key={"file" + index} className="document-box">
          <button className="document-remove" type="button"></button>
          <div className="document-item">
            <div className="document-buttons">
              <button
                className="document-button"
                type="button"
                onClick={() => this.onDeleteClick(file.id)}
              >
                Удалить
              </button>
              <a href={file.url} className="document-button" type="button">
                Скачать
              </a>
            </div>
            <div className="document-title">{file.originalName}</div>
          </div>
        </div>
      );
    });
  };

  render() {
    if (!this.props.selectedItem) return null;
    return (
      <>
        {this.renderFiles()}
        <div className="document-box">
          <input
            className="document-add-input"
            id="files"
            type="file"
            encType="multipart/form-data"
            // accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={this.onLoadClick}
          />
          <label className="document-add" htmlFor="files">
            <span className="document-add-icon"></span>
            <span className="document-add-text">Загрузить</span>
          </label>
        </div>
        <div style={{marginTop:"20px"}}>Максимальный размер файла - 10 МБ</div>
      </>
    );
  }
}

_BudgetFiles.propTypes = {
  dispatch: PropTypes.func.isRequired,
  selectedItem: PropTypes.object
};

function mapStateToProps(state) {
  return {
    selectedItem: state.budgetItemView
  };
}

export const BudgetFiles = connect(mapStateToProps)(_BudgetFiles);
