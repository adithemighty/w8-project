import React, { Component } from "react";
import api from "../utils/api";
import {
  RIEToggle,
  RIEInput,
  RIETextArea,
  RIENumber,
  RIETags,
  RIESelect
} from "riek";
import _ from "lodash";

class CardDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      blocker: false,
      ticketType: { id: "2", text: "User Story" },
      id: null,
      description: "",
      estimation: "",
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
                value={this.state.ticketType}
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
            </div>

            {/* action handlers for cancel and submit */}
            <div className="action-btns">
              <button onClick={this.handleInputSubmit} className="btn-confirm">
                Save changes
              </button>
              <button
                className="btn-cancel"
                onClick={this.props.ticketDetailViewOpenHandler}
              >
                Back to board
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  componentDidMount = () => {
    api.get(`/api/t/show/${this.props.ticket}`).then(ticket => {
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
        newState["ticketType"] = { id: "1", text: "Bug" };
      } else if (ticketType === "User Story") {
        newState["ticketType"] = { id: "2", text: "User Story" };
      } else if (ticketType === "Action Item") {
        newState["ticketType"] = { id: "3", text: "Action Item" };
      }

      this.setState((prevState, props) => {
        return newState;
      });
    });
  };

  handleModalQuitClick = e => {
    if (e.target.className === "modal") {
      this.props.ticketDetailViewOpenHandler();
    }
  };

  handleInputChange = field => {
    if (Object.keys(field)[0] === "ticketType") {
      this.setState((prevState, props) => {
        return field.ticketType;
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
      this.props.setBoardChangeBoolean();
      this.props.ticketDetailViewOpenHandler();
    });
  };
}

export default CardDetails;
