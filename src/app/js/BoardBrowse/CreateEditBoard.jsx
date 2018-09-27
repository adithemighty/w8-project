import React, { Component } from "react";
import api from "../utils/api";
import { withRouter } from "react-router";

class CreateEditBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      userId: "",
      edit: false
    };
  }

  submitHandler = () => {
    const { title, userId } = this.state;
    const boardId = this.props.match.params.boardId;
    if (this.state.edit) {
      api
        .post("/api/b/edit", {
          title,
          id: boardId
        })
        .then(() => {
          this.props.getBoards();
          this.props.history.push("/b");
        });
    } else {
      api
        .post("/api/b/new", {
          title,
          userId
        })
        .then(() => {
          this.props.getBoards();
          this.props.history.push("/b");
        });
    }
  };

  inputHandler = (key, value) => {
    this.setState({
      [key]: value
    });
  };

  componentDidMount = () => {
    this.setState({ userId: this.props.user._id, edit: this.props.edit });
  };

  render() {
    return (
      <div className="modal">
        <div className="modal-text">
          <label htmlFor="title">Title</label>
          <input
            className="active-input input"
            placeholder="New board title"
            id="title"
            onChange={e => this.inputHandler("title", e.target.value)}
            type="text"
            value={this.state.title}
          />

          <div className="action-btns">
            <button
              className="btn-confirm marg-left-md"
              onClick={() => {
                const type = this.state.edit ? "edit" : "add";
                this.props.openModal(type);
                this.submitHandler();
              }}
            >
              {this.state.edit ? "Edit board" : "Create board"}
            </button>
            <button
              className="btn-cancel"
              onClick={() => {
                const type = this.state.edit ? "edit" : "add";
                this.props.openModal(type);
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

export default withRouter(CreateEditBoard);
