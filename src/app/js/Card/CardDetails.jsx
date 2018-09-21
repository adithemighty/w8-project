import React, { Component } from "react";
import api from "../utils/api";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import { RIEInput, RIETextArea, RIESelect } from "riek";
import _ from "lodash";

class CardDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      blocker: false,
      ticketType: "",
      id: null,
      description: "",
      estimation: "",
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
                  Save changes
                </button>
                <button className="btn-cancel">
                  <Link
                    className="link"
                    to={`/b/${this.props.match.params.boardId}`}
                  >
                    Back to board
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  componentDidMount = () => {
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

    const updatedFields = { title, description, estimation, blocker };
    updatedFields["ticketType"] = this.state.ticketType.text;

    api.post(`/api/t/update/${this.state.id}`, updatedFields).then(() => {
      this.props.ticketDetailViewOpenHandler();
      this.props.setBoardChangeBoolean();
      this.props.history.push(`/b/${this.props.match.params.boardId}`);
    });
  };
}

export default withRouter(CardDetails);
