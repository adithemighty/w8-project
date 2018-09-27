import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import Plus from "../assets/burger.svg";

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      screenWidth: window.innerWidth,
      menuClass: "side-menu",
      menuOpen: false
    };
  }

  updateSize = () => {
    this.setState((prevState, props) => {
      const newState = {};
      newState["screenWidth"] = window.innerWidth;
      return newState;
    });
  };

  openMenuHandler = () => {
    this.setState((prevState, props) => {
      const newState = {};
      if (this.state.menuOpen) {
        newState["menuClass"] = "side-menu ";
        newState["menuOpen"] = false;
      } else {
        newState["menuClass"] = "side-menu visible";
        newState["menuOpen"] = true;
      }
      return newState;
    });
  };

  clickHandler() {}

  render() {
    window.onresize = this.updateSize;
    window.onclick = this.clickHandler;

    const menuSmall = (
      <div>
        <button className="icon-button" onClick={this.openMenuHandler}>
          <img className="menu-icon " src={Plus} alt="" />
        </button>
        <div className={this.state.menuClass}>
          {/* {this.props.user && ( */}
          {this.props.user === null ? (
            <ul>
              <li>
                <Link
                  className="link nav-link"
                  to="/auth/sign-in"
                  onClick={this.openMenuHandler}
                >
                  Sign in
                </Link>
              </li>
              <li>
                <Link
                  className="link nav-link"
                  to="/auth/sign-up"
                  onClick={this.openMenuHandler}
                >
                  Sign up
                </Link>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link
                  className="link nav-link"
                  to="/profile"
                  onClick={this.openMenuHandler}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  className="link nav-link"
                  to="/b"
                  onClick={this.openMenuHandler}
                >
                  My boards
                </Link>
              </li>
              <li>
                <Link
                  className="link nav-link"
                  to="/auth/logout"
                  onClick={this.openMenuHandler}
                >
                  Logout
                </Link>
              </li>
            </ul>
          )}
        </div>
        <div />
      </div>
    );
    const menuBig = (
      <div>
        {this.props.user && (
          <span>
            &nbsp; &nbsp; &nbsp;
            <Link className="link nav-link" to="/profile">
              Profile
            </Link>
            &nbsp; &nbsp; &nbsp;
            <Link className="link nav-link" to="/b">
              My boards
            </Link>
          </span>
        )}
        {this.props.user ? (
          <Link className="link nav-link" to="/auth/logout">
            Logout
          </Link>
        ) : (
          <span>
            <Link className="link nav-link" to="/auth/sign-in">
              Sign in
            </Link>
            &nbsp; &nbsp; &nbsp;
            <Link className="link nav-link" to="/auth/sign-up">
              Sign up
            </Link>
          </span>
        )}
      </div>
    );

    return (
      <div className="navigation">
        <div className=" nav-content">
          <div className="nav-home">
            <Link className="" to="/">
              {/* Home */}
              <img className="logo" src={Logo} alt="" />
            </Link>
          </div>

          {this.state.screenWidth < 500 ? menuSmall : menuBig}
        </div>
      </div>
    );
  }
}

export default Navigation;
