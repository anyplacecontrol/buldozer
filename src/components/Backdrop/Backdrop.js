import React from 'react';

export class Backdrop extends React.Component {
  render() {
    return (
      <div className="backdrop-container">
        <div className="backdrop-flex">
          <div className="lds-dual-ring"></div>
        </div>
      </div>
    );
  }
}
