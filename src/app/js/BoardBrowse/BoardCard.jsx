import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import DeleteIcon from "../../assets/trash.svg";
import EditIcon from "../../assets/edit.svg";
import { withRouter } from "react-router";

class BoardCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createDeleteButton = boardId => {
    return (
      <button
        className="icon-button"
        onClick={() => {
          this.props.history.push(`/b/${boardId}/delete`);

          this.props.openModal("delete");
        }}
      >
        <img className="icon" src={DeleteIcon} alt="" />
      </button>
    );
  };

  createEditButton = boardId => {
    return (
      <button
        onClick={() => {
          this.props.history.push(`/b/${boardId}/edit`);
          this.props.openModal("edit");
        }}
        className="icon-button marg-left-md"
      >
        <img className="icon" src={EditIcon} alt="" />
      </button>
    );
  };

  render() {
    return (
      <div>
        <div className="link board-card" key={this.props.ind}>
          <button
            onClick={() => {
              this.props.history.push(`/b/${this.props.boardId}`);
            }}
            className="board-card-title"
          >
            {this.props.title}
          </button>

          {this.createDeleteButton(this.props.boardId)}

          {this.createEditButton(this.props.boardId)}
        </div>
      </div>
    );
  }
}

export default withRouter(BoardCard);
