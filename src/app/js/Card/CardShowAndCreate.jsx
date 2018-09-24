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
      ticketType: "",
      ticketTypeFieldValue: { id: "2", text: "User Story" },
      ticketTypeOptions: [
        { id: "1", text: "Bug" },
        { id: "2", text: "User Story" },
        { id: "3", text: "Action Item" }
      ]
    };
  }

  render() {
    if (this.state.title.length < 0) {
      return <p>Loading</p>;
    } else {
      return (
        <div
          className="modal"
          onClick={event => this.handleModalQuitClick(event)}
        >
          <div className="card-details">
            {/* Here come the editable fields made with RIE */}
            <div className="editable-fields">
              <label>Title</label>
              <RIEInput
                className="input"
                value={this.state.title}
                change={this.handleInputChange}
                propName="title"
              />
              <label>Ticket type</label>
              <RIESelect
                className="select"
                value={this.state.ticketTypeFieldValue}
                options={this.state.ticketTypeOptions}
                change={this.handleInputChange}
                propName="ticketType"
              />
              <label>Estimation</label>
              <RIEInput
                className="input"
                value={this.state.estimation}
                change={this.handleInputChange}
                propName="estimation"
              />
              <label>Description</label>
              <RIETextArea
                className="text-area"
                value={this.state.description}
                change={this.handleInputChange}
                propName="description"
              />
              {/* action handlers for cancel and submit */}

              <div className="action-btns">
                <button
                  onClick={this.handleInputSubmit}
                  className="btn-confirm"
                >
                  {/* so that the user is not confused and I don't want to use any too generic button text */}
                  {this.state.new ? "Create Issue" : "Save changes"}
                </button>
                <button
                  onClick={() => {
                    this.props.history.push(
                      `/b/${this.props.match.params.boardId}`
                    );
                  }}
                  className="btn-cancel"
                >
                  Back to board
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  componentDidMount = () => {
    if (this.props.match.path.indexOf("new") > 0) {
      this.setState((prevState, props) => {
        return { new: true };
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

      const newState = {};

      //   make sure that all states in the field have some value because RIE cannot handle undefined as value

      newState["id"] = _id;
      newState["blocker"] = blocker;

      if (title) {
        newState["title"] = title;
      }

      if (estimation) {
        newState["estimation"] = estimation;
      }

      if (description) {
        newState["description"] = description;
      }

      if (ticketType === "Bug") {
        newState["ticketTypeFieldValue"] = { id: "1", text: "Bug" };
      } else if (ticketType === "User Story") {
        newState["ticketTypeFieldValue"] = { id: "2", text: "User Story" };
      } else if (ticketType === "Action Item") {
        newState["ticketTypeFieldValue"] = { id: "3", text: "Action Item" };
      }

      this.setState((prevState, props) => {
        return newState;
      });
    });
  };

  //if a user happens to click outside of modal, it closes
  handleModalQuitClick = e => {
    if (e.target.className === "modal") {
      this.props.history.push(`/b/${this.props.match.params.boardId}`);
    }
  };

  handleInputChange = field => {
    if (Object.keys(field)[0] === "ticketType") {
      field[""];
      this.setState((prevState, props) => {
        return {
          ticketTypeFieldValue: field.ticketType,
          ticketType: field.ticketType.text
        };
      });
    }
    this.setState((prevState, props) => {
      return field;
    });
  };

  handleInputSubmit = () => {
    const { title, description, estimation, blocker } = this.state;

    const submitableFields = { title, description, estimation, blocker };
    submitableFields["boardId"] = this.props.match.params.boardId;

    submitableFields["ticketType"] = this.state.ticketType.text;
    if (!this.state.new) {
      api.post(`/api/t/update/${this.state.id}`, submitableFields).then(() => {
        this.props.ticketDetailViewOpenHandler();
        this.props.getBoardData();
        this.props.history.push(`/b/${this.props.match.params.boardId}`);
      });
    } else {
      api
        .post(`/api/t/new`, {
          title: submitableFields.title,
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
