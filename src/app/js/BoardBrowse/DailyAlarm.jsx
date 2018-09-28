import React, { Component } from "react";
import moment from "moment";
import api from "../utils/api";
import "react-datepicker/dist/react-datepicker.css";
import Countdown from "react-countdown-now";

class DailyAlarm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dailyTime: moment(),
      currentTime: moment(),
      timerRunning: false
    };
  }

  handleChange = date => {
    this.setState({
      currentTime: date
    });
  };

  createTimer = () => {
    const counterTime = 900000;

    return (
      <div>
        <div className="countdown" />
        <Countdown
          date={Date.now() + counterTime}
          renderer={({ hours, minutes, seconds, completed }) => {
            if (completed) {
              // Render a completed state
              return <Completionist />;
            } else {
              // Render a countdown
              return (
                <span className="text">
                  {minutes}:{seconds}
                </span>
              );
            }
          }}
        />
      </div>
    );
  };

  toggleTimer = () => {
    this.setState((prevState, props) => {
      return { timerRunning: !prevState.timerRunning };
    });
  };

  componentWillMount() {
    this.setState({ dailyTime: moment(this.props.dailyTime) });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleSubmit = () => {
    api.post("/api/b/edit", {
      id: this.props.boardId,
      dailyTime: this.state.dailyTime
    });
  };

  render() {
    return (
      <div className="modal ">
        <div className="modal-text modal-lg">
          <div className="wrapper">
            {this.state.timerRunning ? (
              this.createTimer()
            ) : (
              <div className="text">
                <h2>The goal of the daily:</h2>
                <br />
                <div className="text-list">
                  <li>Raise blockers</li>
                  <li>Make a plan for the day</li>
                  <li>No small talk</li>
                </div>
              </div>
            )}
          </div>
          {/* So that the buttons are clickable they have 
          a countdown-action-btns with higher z-inder than timer */}

          <div className=" countdown-action-btns">
            <button
              className=""
              onClick={() => {
                this.props.openModal("daily");
                this.toggleTimer();
              }}
            >
              Dismiss
            </button>
            <button className="marg-left-md" onClick={this.toggleTimer}>
              {this.state.timerRunning ? "Reset timer" : "Start Daily"}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default DailyAlarm;
