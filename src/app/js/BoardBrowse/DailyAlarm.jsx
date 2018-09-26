import React, { Component } from "react";
import Moment from "react-moment";
import moment from "moment";
import DatePicker from "react-datepicker";
import api from "../utils/api";
import "react-datepicker/dist/react-datepicker.css";

class DailyAlarm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dailyTime: moment(),
      currentTime: moment()
    };
  }

  handleChange = date => {
    console.log("date", date);
    // const field = `${f}Date`;
    this.setState({
      currentTime: date
    });
  };

  handleChangeRaw = date => {
    console.log(typeof date);
    let formattedDate;
    if (date.indexOf("PM") !== -1) {
      moment(date);
      console.log(date);
      const hour = date.split(":")[0];
      const minute = date.split(":")[1].split(" ")[0];
      formattedDate = moment({ hour: Number(hour) + 12, minute: minute });
      console.log(formattedDate);
    }
    console.log(formattedDate.isValid());
    this.setState({
      dailyTime: formattedDate
    });
  };

  //   countingSecond = () => {
  //     this.setState({
  //       currentTime: moment()
  //     });
  //   };

  componentWillMount() {
    this.setState({ dailyTime: moment(this.props.dailyTime) });
    // if (
    //   Math.abs(this.state.currentTime.hours() - this.state.dailyTime.hours()) >
    //   1
    // ) {
    //   console.log(
    //     "hallo",
    //     Math.abs(this.state.currentTime.hours() - this.state.dailyTime.hours())
    //   );
    //   this.interval = setInterval(this.countingSecond, 3600000);
    // } else if (
    //   Math.abs(
    //     this.state.dailyTime.minutes() - this.state.currentTime.minutes()
    //   ) > 10
    // ) {
    //   this.interval = setInterval(this.countingSecond, 600000);
    // } else {
    //   this.interval = setInterval(this.countingSecond, 1000);
    //   if (
    //     `${this.state.currentTime.hours()}:${this.state.currentTime.minutes()}` ===
    //     `${this.state.dailyTime.hours()}:${this.state.dailyTime.minutes()}`
    //   ) {
    //     console.log(typeof this.state.dailyTime);
    //     this.setState((prevState, props) => {});
    //   }
    // }
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
          <p>
            <span>{this.state.currentTime.hours()}</span>:
            <span>{this.state.currentTime.minutes()}</span>
          </p>
          {`${this.state.currentTime.hours()}:${this.state.currentTime.minutes()}` ===
          `${this.state.dailyTime.hours()}:${this.state.dailyTime.minutes()}`
            ? "Time for daily!"
            : ""}

          <DatePicker
            selected={this.state.currentTime}
            onChange={e => {
              this.handleChange(e);
            }}
            onChangeRaw={event => this.handleChangeRaw(event.target.value)}
            showTimeSelect
            showTimeSelectOnly
            //in case i want to change the interval later:
            // timeIntervals={30}
            dateFormat="LT"
            timeCaption="Time"
          />
          <button onClick={() => this.props.openModal("daily")}>Dismiss</button>
          <button onClick={this.handleSubmit}>submit</button>
        </div>
      </div>
    );
  }
}

export default DailyAlarm;
