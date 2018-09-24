import React, { Component } from "react";

class NewBoard extends Component {
  render() {
    return (
      <div className="modal">
        <div className="modal-text">
          <p>Here be create new board</p>
          <input type="text" />
        </div>
      </div>
    );
  }
}

export default NewBoard;
