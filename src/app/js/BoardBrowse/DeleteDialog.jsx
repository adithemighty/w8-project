import React from "react";
import { withRouter } from "react-router";

const DeleteDialog = props => {
  return (
    <div className="modal">
      <div className="modal-text">
        <p>
          Are you sure you want to delete this board? This action cannot be
          undone
        </p>
        <div className="action-btns">
          <button
            className="btn-confirm "
            onClick={() => {
              props.deleteBoard(props.match.params.boardId);
              props.openModal("delete");
            }}
          >
            Delete board
          </button>
          <button
            className="btn-cancel "
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
