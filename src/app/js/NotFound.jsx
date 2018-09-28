import React from "react";
import unicorn from "../assets/unicorn.jpg";

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>Page not found</h1>
      <div>
        <img src={unicorn} alt="" />
      </div>
    </div>
  );
};

export default NotFound;
