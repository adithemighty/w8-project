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
    console.log("date", date);
    this.setState({
      currentTime: date
    });
  };

  createTimer = () => {
    const counterTime = 900000;

    return (
      <Countdown
        date={Date.now() + counterTime}
        renderer={({ hours, minutes, seconds, completed }) => {
          if (completed) {
            // Render a completed state
            return <Completionist />;
          } else {
            // Render a countdown
            return (
              <span>
                {minutes}:{seconds}
              </span>
            );
          }
        }}
      />
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
    api
      .post("/api/b/edit", {
        id: this.props.boardId,
        dailyTime: this.state.dailyTime
      })
      .then(() => {
        console.log("success");
      });
  };

  render() {
    return (
      <div className="modal">
        <div className="modal-text">
          {`${this.state.currentTime.hours()}:${this.state.currentTime.minutes()}` ===
          `${this.state.dailyTime.hours()}:${this.state.dailyTime.minutes()}`
            ? "Time for daily!"
            : ""}

          {this.state.timerRunning ? this.createTimer() : null}

          <button
            onClick={() => {
              this.props.openModal("daily");
              this.toggleTimer();
            }}
          >
            Dismiss
          </button>
          <button onClick={this.toggleTimer}>Start Daily</button>
        </div>
      </div>
    );
  }
}

export default DailyAlarm;
