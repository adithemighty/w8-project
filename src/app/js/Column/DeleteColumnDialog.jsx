import React, { Component } from "react";
import api from "../utils/api";
import Tooltip from "../Component/Tooltip";
import Button from "../Component/Button";

class DeleteColumnDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      destinationColumnId: ""
    };
  }

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleSelection = event => {
    const destinationColumnId = event.target.id;
    this.setState((prevState, props) => {
      return { destinationColumnId };
    });
  };

  handleDelete = () => {
    const { sourceColumnId, boardId } = this.props;
    const destinationColumnId = this.state.destinationColumnId;

    if (destinationColumnId.length === 0) {
      api.post("/api/c/delete", { sourceColumnId, boardId }).then(() => {
        this.props.getBoardData();
      });
    } else {
      api
        .post("/api/c/delete", {
          sourceColumnId,
          boardId,
          destinationColumnId
        })
        .then(() => {
          this.props.getBoardData();
        });
    }
  };

  render() {
    let disabledStatus = true;
    if (
      this.state.destinationColumnId.length > 0 &&
      this.props.columnHasTickets
    ) {
      disabledStatus = false;
    } else if (!this.props.columnHasTickets) {
      disabledStatus = false;
    }

    const deleteBtn = (
      <Button
        callBack={() => {
          this.handleDelete();
          this.props.openModal("delete");
        }}
        type="text-btn"
        color="cancel"
        size="btn-md"
        text="Delete column"
        disabled={disabledStatus}
      />
    );

    const destinationColumnIdOptions = Object.keys(this.props.columns).map(
      (el, ind) => {
        const column = this.props.columns[el];
        if (column.id === this.props.sourceColumnId) {
          //origin column can't be destination column because it will be removed
          return;
        }

        return (
          <button
            key={ind}
            id={column.id}
            className={`options ${
              column.id === this.state.destinationColumnId ? `active` : ``
            }`}
            onClick={e => this.handleSelection(e)}
          >
            {column.title}
          </button>
        );
      }
    );

    return (
      <div className="modal">
        <div className="modal-text modal-md-short">
          <p className="marg-bottom-md">
            This action cannot be undone.{" "}
            {this.props.columnHasTickets
              ? `This column has tickets. Move them to:`
              : null}
          </p>

          {this.props.columnHasTickets ? (
            <div className="scrolling-box">{destinationColumnIdOptions}</div>
          ) : null}

          <div className="action-btns marg-top-md">
            {this.props.columnHasTickets &&
            this.state.destinationColumnId.length === 0 ? (
              <Tooltip
                tooltipText="Select destination column"
                element={deleteBtn}
              />
            ) : (
              deleteBtn
            )}

            <Button
              callBackOption="delete"
              callBack={() => this.props.openModal("delete")}
              type="text-btn"
              color="neutral"
              size="btn-md"
              text="Cancel"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default DeleteColumnDialog;
