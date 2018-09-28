import React from "react";

const LimitWarning = props => {
  return (
    <div className="modal">
      <div className="modal-text modal-md">
        <h2>{props.destinationColumn} column reached its limit.</h2>
        <br />
        <p>
          To move something into this column - finish a ticket that is already
          in this column.
        </p>
        <br />
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
