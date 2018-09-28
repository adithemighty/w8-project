import React from "react";
import { withRouter } from "react-router";

const RetroModal = props => {
  return (
    <div className="modal">
      <div className="modal-text modal-md">
        <p>Retrospectives are an important tool to improve team performances</p>
        <br />

        <p>
          There are hundreds of different formats <br />
          <a target="_blank" href="https://retromat.org/en">
            Click here to get a random retrospective
          </a>
        </p>

        <div className="marg-top-md action-btns">
          <button
            className="btn-lg text-btn confirm "
            onClick={() => {
              props.openModal("retro");

              props.history.push(`/b/${props.match.params.id}/t/new`);
            }}
          >
            Create new action item
          </button>
          <button
            className="btn-lg text-btn neutral marg-left-md"
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
