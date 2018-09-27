import React from "react";
import { withRouter } from "react-router";

const RetroModal = props => {
  return (
    <div className="modal">
      <div className="modal-text ">
        <p>Here be retro modal</p>
        <div className="marg-top-md action-btns">
          <a
            target="_blank"
            href="https://retromat.org/en"
            className="btn-md text-btn confirm "
          >
            Show me a retro format!
          </a>
          <button
            className="btn-md text-btn neutral marg-left-md"
            onClick={() => {
              //   const type = this.state.edit ? "edit" : "add";
              props.openModal("retro");
              props.history.push(`/b/${props.match.params.id}`);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(RetroModal);
