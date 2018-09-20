import React from "react";

const LimitWarning = props => {
  return (
    <div className="modal">
      <p>You are breaking the limit of the " "-column</p>
      <button onClick={props.limitWarningHandler}>Cancel</button>
    </div>
  );
};

export default LimitWarning;
