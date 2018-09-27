import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import api from "../utils/api";

import { RIEInput, RIETextArea, RIESelect } from "riek";

class CardShowAndCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      new: false,
      title: "",
      blocker: false,
      ticketType: "",
      id: null,
      description: "",
      estimation: 0,
      ticketType: ""
      // ticketTypeFieldValue: { id: "2", text: "User Story" },
      // ticketTypeOptions: [
      //   { id: "1", text: "Bug" },
      //   { id: "2", text: "User Story" },
      //   { id: "3", text: "Action Item" }
      // ]
    };
  }

  render() {
    return (
      <div
        className="modal"
        onClick={event => this.handleModalQuitClick(event)}
      >
        <div className="card-details">
          {/* Here come the editable fields made with RIE */}
          <div className="editable-fields">
            <label>Title</label>
            <input
              type="text"
              onChange={e => this.handleInputChange(e.target.value)}
              value={this.state.title}
            />

            {/* action handlers for cancel and submit */}

            <div className="action-btns">
              <button onClick={this.handleInputSubmit} className="btn-confirm">
                {/* so that the user is not confused and I don't want to use any too generic button text */}
                {this.state.new ? "Create Issue" : "Save changes"}
              </button>
              <button
                className="btn-cancel"
                onClick={() => {
                  this.props.history.push(
                    `/b/${this.props.match.params.boardId}`
                  );
                }}
              >
                Back to board
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount = () => {
    console.log("hallo");
    if (this.props.match.path.indexOf("new") > 0) {
      this.setState((prevState, props) => {
        return { new: true, title: "" };
      });
    }
    const ticketId = this.props.match.params.ticketId;
    api.get(`/api/t/show/${ticketId}`).then(ticket => {
      const {
        title,
        blocker,
        ticketType,
        description,
        _id,
        estimation
      } = ticket;

      const newState = {
        id: _id,
        title,
        blocker,
        ticketType,
        description,
        estimation
      };

      //   make sure that all states in the field have some value because RIE cannot handle undefined as value

      this.setState((prevState, props) => {
        return newState;
      });
    });
  };

  handleModalQuitClick = e => {
    if (e.target.className === "modal") {
      this.props.history.push(`/b/${this.props.match.params.boardId}`);
    }
  };

  handleInputChange = value => {
    console.log(value);
    this.setState((prevState, props) => {
      return { title: value };
    });
  };

  handleInputSubmit = () => {
    const { title } = this.state;

    // const submitableFields = { title, description, estimation, blocker };
    // submitableFields["boardId"] = this.props.match.params.boardId;

    // submitableFields["ticketType"] = this.state.ticketType.text;
    if (!this.state.new) {
      api.post(`/api/t/update/${this.state.id}`, { title }).then(() => {
        this.props.ticketDetailViewOpenHandler();
        this.props.getBoardData();
        this.props.history.push(`/b/${this.props.match.params.boardId}`);
      });
    } else {
      api
        .post(`/api/t/new`, {
          title,
          boardId: this.props.match.params.boardId
        })
        .then(result => {
          this.props.getBoardData();
          this.props.history.push(`/b/${this.props.match.params.boardId}`);
        });
    }
  };
}

export default withRouter(CardShowAndCreate);
