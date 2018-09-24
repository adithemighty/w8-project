import React, { Component } from "react";
import { withRouter } from "react-router";

import api from "../utils/api";

class NewBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      githubRepoLink: "",
      title: ""
    };
  }

  handleInputChange = (key, value) => {
    this.setState(() => {
      return { [key]: value };
    });
  };

  handleSubmit = () => {
    api.post("/api/b/new", this.state).then(() => {
      this.props.getAllBoards();
      this.props.history.push(`/b`);
    });
  };

  //if a user happens to click outside of modal, it closes
  handleModalQuitClick = e => {
    if (e.target.className === "modal") {
      this.props.history.push(`/b/${this.props.match.params.boardId}`);
    }
  };

  render() {
    return (
      <div
        className="modal"
        onClick={() => {
          this.props.history.push(`/b`);
        }}
      >
        <div className="card-details">
          <label htmlFor="title">Board title</label>
          <input
            value={this.state.title}
            type="text"
            id="title"
            onChange={event => {
              this.handleInputChange("title", event.target.value);
            }}
          />

          <label htmlFor="githubRepoLink">Link board to GitHub repo</label>
          <input
            value={this.state.githubRepoLink}
            type="text"
            id="githubRepoLink"
            onChange={event => {
              this.handleInputChange("githubRepoLink", event.target.value);
            }}
          />
          <button onClick={this.handleSubmit} className="btn-confirm">
            Create board
          </button>
          <button
            onClick={() => {
              this.props.history.push(`/b`);
            }}
            className="btn-cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(NewBoard);
