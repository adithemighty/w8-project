import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Moment from "react-moment";
import moment from "moment";
import DatePicker from "react-datepicker";
import api from "../utils/api";
import "react-datepicker/dist/react-datepicker.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dailyDate: "18:16",
      currentTime: moment(),
      dayOfTheTime: false
    };
  }

  handleChange = date => {
    console.log("date", date);
    // const field = `${f}Date`;
    this.setState({
      currentTime: date
    });
    if (this.state.dailyDate === `${date.hours()}:${date.minutes()}`) {
      console.log("Same");
    }
  };

  countingSecond = () => {
    this.setState({
      currentTime: moment()
    });
  };

  componentWillMount() {
    const currentTime = moment();
    const currentTimeHours = Number(this.state.dailyDate.split(":")[0]);
    const currentTimeMinutes =
      this.state.dailyDate.split(":")[1] === "00"
        ? 60
        : Number(this.state.dailyDate.split(":")[1]);

    if (Math.abs(currentTime.hours() - currentTimeHours) > 1) {
      this.interval = setInterval(this.countingSecond, 3600000);
    } else if (Math.abs(currentTimeMinutes - currentTime.minutes()) > 10) {
      this.interval = setInterval(this.countingSecond, 600000);
    } else {
      this.interval = setInterval(this.countingSecond, 1000);
      if (
        `${currentTime.hours()}:${currentTime.minutes()}` ===
        this.state.dailyDate
      ) {
        this.setState((prevState, props) => {
          return { dayOfTheTime: true };
        });
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleSubmit = a => {};

  render() {
    if (!this.props.user) return <Redirect to="/auth/sign-in" />; // this is actually the protection

    return (
      <div className="container">
        <p>
          <span>{this.state.currentTime.hours()}</span>:
          <span>{this.state.currentTime.minutes()}</span>
        </p>
        {`${this.state.currentTime.hours()}:${this.state.currentTime.minutes()}` ===
        this.state.dailyDate
          ? "Time for daily!"
          : ""}
        <img
          src={this.props.user.profilePicture}
          alt=""
          className="profile-picture"
        />
        <br />
        <DatePicker
          selected={this.state.currentTime}
          onChange={e => {
            this.handleChange(e);
          }}
          onChangeRaw={event => this.handleChangeRaw(event.target.value)}
          showTimeSelect
          showTimeSelectOnly
          // timeIntervals={30}
          dateFormat="LT"
          timeCaption="Time"
        />

        <br />
        <br />
        <button onClick={this.handleSubmit}>submit</button>
        <br />
        <br />

        {this.props.user.email}
      </div>
    );
  }
}

export default Profile;
