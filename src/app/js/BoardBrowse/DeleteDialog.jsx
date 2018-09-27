import React from "react";
import { withRouter } from "react-router";

const DeleteDialog = props => {
  return (
    <div className="modal">
      <div className="modal-text modal-sm">
        <p>
          Are you sure you want to delete this board? This action cannot be
          undone
        </p>
        <div className="marg-top-md action-btns">
          <button
            className="cancel btn-md text-btn"
            onClick={() => {
              props.deleteBoard(props.match.params.boardId);
              props.openModal("delete");
            }}
          >
            Delete board
          </button>
          <button
            className="neutral  marg-left-md btn-md text-btn"
            onClick={() => {
              props.history.push(`/b`);
              props.openModal("delete");
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(DeleteDialog);
