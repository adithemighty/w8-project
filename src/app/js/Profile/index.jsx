import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Profile extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   dailyDate: moment(),
    //   currentTime: moment()
    // };
  }

  // handleChange = date => {
  //   console.log("date", date);
  //   // const field = `${f}Date`;
  //   this.setState({
  //     currentTime: date
  //   });
  // };

  // handleChangeRaw = date => {
  //   console.log(typeof date);
  //   let formattedDate;
  //   if (date.indexOf("PM") !== -1) {
  //     moment(date);
  //     console.log(date);
  //     const hour = date.split(":")[0];
  //     const minute = date.split(":")[1].split(" ")[0];
  //     formattedDate = moment({ hour: Number(hour) + 12, minute: minute });
  //     console.log(formattedDate);
  //   }
  //   console.log(formattedDate.isValid());
  //   this.setState({
  //     dailyDate: formattedDate
  //   });
  // };

  // countingSecond = () => {
  //   this.setState({
  //     currentTime: moment()
  //   });
  // };

  // componentWillMount() {
  //   api.get("/api/b/data/5babcebc698cfe1849c12600").then(board => {
  //     this.setState({ dailyDate: moment(board.dailyTime) });
  //     if (
  //       Math.abs(
  //         this.state.currentTime.hours() - this.state.dailyDate.hours()
  //       ) > 1
  //     ) {
  //       console.log(
  //         "hallo",
  //         Math.abs(
  //           this.state.currentTime.hours() - this.state.dailyDate.hours()
  //         )
  //       );
  //       this.interval = setInterval(this.countingSecond, 3600000);
  //     } else if (
  //       Math.abs(
  //         this.state.dailyDate.minutes() - this.state.currentTime.minutes()
  //       ) > 10
  //     ) {
  //       this.interval = setInterval(this.countingSecond, 600000);
  //     } else {
  //       this.interval = setInterval(this.countingSecond, 1000);
  //       if (
  //         `${this.state.currentTime.hours()}:${this.state.currentTime.minutes()}` ===
  //         `${this.state.dailyDate.hours()}:${this.state.dailyDate.minutes()}`
  //       ) {
  //         console.log(typeof this.state.dailyDate);
  //         this.setState((prevState, props) => {});
  //       }
  //     }
  //   });
  // }

  // componentDidMount() {}

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  // handleSubmit = a => {
  //   api
  //     .post("/api/b/edit", {
  //       id: "5babcebc698cfe1849c12600",
  //       dailyTime: this.state.dailyDate
  //     })
  //     .then(() => {
  //       console.log("success");
  //     });
  // };

  render() {
    if (!this.props.user) return <Redirect to="/auth/sign-in" />; // this is actually the protection

    return (
      <div className="container">
        {/* <p>
          <span>{this.state.currentTime.hours()}</span>:
          <span>{this.state.currentTime.minutes()}</span>
        </p>
        {`${this.state.currentTime.hours()}:${this.state.currentTime.minutes()}` ===
        `${this.state.dailyDate.hours()}:${this.state.dailyDate.minutes()}`
          ? "Time for daily!"
          : ""}

        <br />
        <DatePicker
          selected={this.state.currentTime}
          onChange={e => {
            this.handleChange(e);
          }}
          onChangeRaw={event => this.handleChangeRaw(event.target.value)}
          showTimeSelect
          showTimeSelectOnly
          //in case i want to change the interval
          // timeIntervals={30}
          dateFormat="LT"
          timeCaption="Time"
        />

        <br />
        <br />
        <button onClick={this.handleSubmit}>submit</button>
        <br />
        <br /> */}
        <img
          src={this.props.user.profilePicture}
          alt=""
          className="profile-picture"
        />
        {this.props.user.email}
      </div>
    );
  }
}

export default Profile;
