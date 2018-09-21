import React, { Component } from "react";
import api from "../utils/api";

class CardDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      insideClick: true
    };
  }

  componentDidMount = () => {
    api.get(`/api/t/show/${this.props.ticket}`).then(ticket => {
      this.setState((prevState, props) => {
        return { title: ticket.title };
      });
    });
  };

  handleClick = e => {
    console.log(e.target.className);
    if (e.target.className === "modal") {
      this.props.ticketDetailViewOpenHandler();
    }
  };

  render() {
    return (
      <div className="modal" onClick={event => this.handleClick(event)}>
        <div className="modal-text">
          <p>{this.state.title}</p>
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

export default CardDetails;
