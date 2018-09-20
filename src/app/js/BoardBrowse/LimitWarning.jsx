import React from "react";

const LimitWarning = props => {
  return (
    <div className="modal">
      <div className="modal-text">
        <p>
          You are breaking the limit of the {props.destinationColumn} column. To
          move something into this column - finish a ticket that is already in
          this column.
        </p>
        <p>The card will stay in the original column</p>
        <button className="btn-cancel" onClick={props.limitWarningHandler}>
          Back to board
        </button>
      </div>
    </div>
  );
};

export default LimitWarning;
