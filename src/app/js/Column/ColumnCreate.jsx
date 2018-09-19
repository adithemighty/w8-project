import React, { Component } from "react";
import api from "../utils/api";

class ColumnCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnTitle: "",
      boardId: this.props.boardId
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
      .post("/c/new", {
        boardId: this.state.boardId,
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
          type="text"
          onKeyPress={e => this.handleEnter(e)}
        />
        <button type="submit" onClick={e => this.handleSubmit(e)}>
          Create new column
        </button>
      </div>
    );
  }
}

export default ColumnCreate;
