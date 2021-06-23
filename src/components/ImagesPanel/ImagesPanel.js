import React from "react";
import PropTypes from "prop-types";

export const IImage = PropTypes.shape({
  id: PropTypes.string,
  src: PropTypes.string.isRequired
});

export class ImagesPanel extends React.Component {
  renderImages = () => {
    if (!this.props.images) return null;

    return this.props.images.map((image, index) => {
      return (
        <div key={index} className="image__box flex animated">
          <button
            className="image__cancel animated"
            type="button"
            onClick={() => this.props.onDeleteImage(index)}
          />
          <img
            className="image__item animated"
            src={image.src}
            alt="product image"
          />
        </div>
      );
    });
  };

  handleChangeImage = evt => {
    var self = this;
    var reader = new FileReader();
    var file = evt.target.files[0];

    reader.onload = function(upload) {
      self.props.onAddImage(upload.target.result);
    };

    reader.readAsDataURL(file);
  };

  render() {    
    return (
      <div className="block-set__box flex animated">
        <div
          className="block-set__title animated"
          style={!this.props.isError ? {} : { color: "#A90000" }}
        >
          {this.props.caption}
        </div>
        <div className="block-set__inner flex w100 animated">
          <div className="image__container flex animated">
            {this.renderImages()}

            {/* --Add Image button -- */}
            {(this.props.allowMultipleImages ||
              this.props.images.length == 0) && (
              <div className="image__box flex animated">
                <input
                  className="image__add--input animated"
                  id="files"
                  type="file"
                  encType="multipart/form-data"
                  accept="image/*"
                  onChange={this.handleChangeImage}
                />

                <label className="image__add flex animated" htmlFor="files">
                  <span className="image__add--icon animated" />

                  <span className="image__add--text animated">Add Image</span>
                </label>
              </div>
            )}

            {/* --Replace Image button -- */}
            {(!this.props.allowMultipleImages &&
              this.props.images.length > 0) && (
              <div className="image__box flex animated">
                <input
                  className="image__add--input animated"
                  id="files"
                  type="file"
                  encType="multipart/form-data"
                  accept="image/*"
                  onChange={this.handleChangeImage}
                />

                <label className="image__add flex animated" htmlFor="files">
                  <span className="image__add--icon animated"/>

                  <span className="image__add--text animated">Replace Image</span>
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

ImagesPanel.propTypes = {
  images: PropTypes.arrayOf(IImage).isRequired,
  caption: PropTypes.string,  
  isError: PropTypes.bool,
  allowMultipleImages: PropTypes.bool,
  onAddImage: PropTypes.func.isRequired,
  onDeleteImage: PropTypes.func.isRequired //argument is image index in array
};
