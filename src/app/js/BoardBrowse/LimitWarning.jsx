import React from "react";

const LimitWarning = props => {
  return (
    <div className="modal">
      <div className="modal-text">
        <p>
          You are breaking the limit of the {props.destinationColumn} column.{" "}
          <br /> <br /> <br /> To move something into this column - finish a
          ticket that is already in this column.
        </p>
        <br /> <br />
        <p>The card will stay in the original column</p>
        <br /> <br />
        <button
          className="text-btn  btn-md neutral"
          onClick={props.limitWarningHandler}
        >
          Back to board
        </button>
      </div>
    </div>
  );
};

export default LimitWarning;
