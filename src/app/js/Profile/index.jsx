import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.user) return <Redirect to="/auth/sign-in" />; // this is actually the protection

    return (
      <div className="container">
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
