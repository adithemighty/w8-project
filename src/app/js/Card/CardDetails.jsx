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
      _id: "",
      description: "Multiline example text value",
      insideClick: true,
      estimation: "0",
      ticketTypeOptions: [
        { id: "1", text: "Bug" },
        { id: "2", text: "User Story" },
        { id: "3", text: "Action Item" }
      ]
    };
  }

  componentDidMount = () => {
    api.get(`/api/t/show/${this.props.ticket}`).then(ticket => {
      console.log(ticket);
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
        this.setState((prevState, props) => {
          return { id: "2", text: "User Story" };
        });
      } else if (ticketType === "Action Item") {
        this.setState((prevState, props) => {
          return { id: "3", text: "Action Item" };
        });
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
    console.log(this.state);
    if (Object.keys(field)[0] === "ticketType") {
      this.setState((prevState, props) => {
        return field.ticketType;
      });
    }
    this.setState((prevState, props) => {
      return field;
    });
  };

  handleInputSubmit = () => {};

  render() {
    if (this.state.title.length < 0) {
      return <p>Loading</p>;
    } else {
      return (
        <div
          className="modal"
          onClick={event => this.handleModalQuitClick(event)}
        >
          <div className="card-details-card">
            {/* Here come the editable fields made with RIE */}
            <div className="editable-fields">
              <label>Title</label>
              <RIEInput
                value={this.state.title}
                change={this.handleInputChange}
                propName="title"
              />

              <label>Estimation</label>
              <RIEInput
                value={this.state.estimation}
                change={this.handleInputChange}
                propName="estimation"
              />

              <label>Description</label>
              <RIETextArea
                value={this.state.description}
                change={this.handleInputChange}
                propName="description"
              />

              <label>Ticket type</label>
              <RIESelect
                value={this.state.ticketType}
                options={this.state.ticketTypeOptions}
                change={this.handleInputChange}
                propName="ticketType"
              />
            </div>

            {/* action handlers for cancel and submit */}
            <button className="btn-confirm">Save changes</button>
            <button
              className="btn-cancel"
              onClick={this.props.ticketDetailViewOpenHandler}
            >
              Back to board
            </button>
          </div>
        </div>
      );
    }
  }
}

export default CardDetails;
