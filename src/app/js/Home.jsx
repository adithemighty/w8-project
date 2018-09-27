import React from "react";
import { Redirect } from "react-router-dom";

const Home = props => {
  {
    props.user && <Redirect to="/b" />;
  }
  return (
    <React.Fragment>
      <div className="home-header">
        <h1 className="header-heading-primary">DragonDrop</h1>
        <h2 className="header-heading-secondary">teamwork made easy</h2>
      </div>
      <div className="home-features">
        <p className="home-features-heading">DnD features</p>
        <div className="features-container">
          <div className="home-features-box one">
            <p className="box-heading">Embrace absolute focus</p>
            <p className="box-text">with the power of column limits</p>
          </div>
          <div className="home-features-box two">
            <p className="box-heading">Complete transparency</p>
            <p className="box-text">with a light-weight ticketing system </p>
          </div>
          <div className="home-features-box three">
            <p className="box-heading">Continuous improvement</p>
            <p className="box-text">with the retrospectives helper</p>
          </div>
        </div>
      </div>
      <div className="home-footer">
        <p>
          Created with 💖 by Adiya Mohr 🙋🏻‍♀️ with gradients 🌈 from{" "}
          <a href="https://cssgradient.io">cssgradient </a> and icons 🦄 from{" "}
          <a href="www.flaticon.com ">flaticon</a>
        </p>
      </div>
    </React.Fragment>
  );
};

export default Home;
