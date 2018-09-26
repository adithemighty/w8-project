import React, { Component } from "react";
import api from "../utils/api";
// import Button from "@material-ui/core/Button";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemText from "@material-ui/core/ListItemText";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import Typography from "@material-ui/core/Typography";
// import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import DeleteIcon from "../../assets/trash.svg";
import { link } from "fs";

class DeleteColumnButton extends Component {
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
    // console.log(event.target.id);
    const destinationColumnId = event.target.id;
    this.setState((prevState, props) => {
      return { destinationColumnId };
    });
  };

  handleDelete = () => {
    const { sourceColumnId, boardId } = this.props;
    const destinationColumnId = this.state.destinationColumnId;
    console.log(sourceColumnId, boardId, destinationColumnId);

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
      // }
    }
  };

  render() {
    const destinationColumnIdOptions = Object.keys(this.props.columns).map(
      (el, ind) => {
        const column = this.props.columns[el];
        console.log(this.props.columns[el]);
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
        <div className="modal-text">
          {console.log(this.props)}
          <p>This action cannot be undone</p>
          {destinationColumnIdOptions}
          {this.props.columnHasTickets ? (
            <p>Column has tickets</p>
          ) : (
            <p>NO TICKETS</p>
          )}
          <div className="action-btns">
            <button
              className="btn-confirm "
              onClick={() => {
                this.handleDelete();
                this.props.openModal("delete");
              }}
            >
              Delete column
            </button>
            <button
              className="btn-cancel "
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

export default DeleteColumnButton;
