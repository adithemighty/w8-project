import React, { Component } from "react";
import api from "../utils/api";
import Button from "@material-ui/core/Button";

class ColumnCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnTitle: ""
    };
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput = (key, value) => {
    this.setState((prevState, props) => {
      return { [key]: value };
    });
  };

  handleEnter = e => {
    if (e.key === "Enter") {
      this.handleSubmit();
    }
  };

  handleSubmit = e => {
    api
      .post("/api/c/new", {
        boardId: this.props.boardId,
        columnTitle: this.state.columnTitle
      })
      .then(result => {
        this.setState((prevState, props) => {
          return { columnTitle: "" };
        });
        this.props.getBoardData();
      });
  };

  render() {
    return (
      <div className="column">
        <input
          value={this.state.columnTitle}
          onChange={event =>
            this.handleInput("columnTitle", event.target.value)
          }
          placeholder="New column name"
          className="column-create-input"
          type="text"
          onKeyPress={e => this.handleEnter(e)}
        />
        <button
          type="submit"
          className="column-create-button"
          onClick={e => this.handleSubmit(e)}
        >
          Create new column
        </button>
      </div>
    );
  }
}

export default ColumnCreate;
