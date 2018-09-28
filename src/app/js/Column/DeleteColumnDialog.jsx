import React, { Component } from "react";
import api from "../utils/api";

import DeleteIcon from "../../assets/trash.svg";
import { link } from "fs";

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
    const destinationColumnIdOptions = Object.keys(this.props.columns).map(
      (el, ind) => {
        const column = this.props.columns[el];
        if (column.id === this.props.sourceColumnId) {
          //origin column can't be destination column because it will be moved
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
            <button
              className="text-btn  btn-md cancel"
              onClick={() => {
                this.handleDelete();
                this.props.openModal("delete");
              }}
            >
              Delete column
            </button>
            <button
              className="text-btn marg-left-md btn-md neutral"
              onClick={() => {
                this.props.openModal("delete");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default DeleteColumnDialog;
