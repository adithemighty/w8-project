import React, { Component } from "react";
import api from "../utils/api";
import { withRouter } from "react-router";

class NewBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };

    console.log("new board props", this.props);
  }

  submitHandler = () => {
    api
      .post("/api/b/new", {
        title: this.state.title
      })
      .then(() => {
        this.props.getBoards();
        this.props.history.push("/b");
      });
  };

  inputHandler = (key, value) => {
    this.setState({
      [key]: value
    });
  };

  render() {
    return (
      <div className="modal">
        <div className="modal-text">
          <div className="editable-fields">
            <label htmlFor="title">Title</label>
            <input
              placeholder="New board title"
              id="title"
              onChange={e => this.inputHandler("title", e.target.value)}
              type="text"
              value={this.state.title}
            />
          </div>

          <div className="action-btns">
            <button
              className="btn-confirm column-create-button"
              onClick={this.submitHandler}
            >
              Create board
            </button>
            <button
              className="btn-cancel"
              onClick={() => {
                this.props.history.push("/b");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(NewBoard);
