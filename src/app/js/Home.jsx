import React from "react";
import { Redirect } from "react-router-dom";

const Home = props => {
  return (
    <div className="">
      {props.user && <Redirect to="/b" />}
      <div className="home-header">
        <h1 className="header-heading-primary">DragonDrop</h1>
        <h2 className="header-heading-secondary">teamwork made easy</h2>
      </div>
      <div className="home-features">
        <p>here be features</p>
      </div>
      <div className="home-footer">
        <p>Here be footer</p>
      </div>
    </div>
  );
};

export default Home;
