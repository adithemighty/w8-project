import React from "react";

const Home = props => {
  return (
    <div className="container">
      <h1>Hello, {props.user ? props.user.email : "Stranger"}!</h1>
      <div className="home-header">
        <p>here be header</p>
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
