import React, { Component } from "react";
import api from "../utils/api";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";

class DeleteDialog extends React.Component {
  handleListItemClick = value => {};

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;

    return (
      <Dialog
        onClose={this.props.onClose}
        aria-labelledby="simple-dialog-title"
        {...other}
      >
        <DialogTitle id="simple-dialog-title">Choose a column</DialogTitle>
        <div>
          <List>
            {Object.keys(this.props.columns).map(column => {
              console.log("map colum", this.props.columns[column]);
              return (
                <ListItem
                  button
                  onClick={() =>
                    this.handleListItemClick(this.props.columns[column].id)
                  }
                  key={column}
                  id={this.props.columns[column].id}
                >
                  <ListItemText primary={column} />
                </ListItem>
              );
            })}
          </List>
          <DialogActions>
            <Button onClick={this.props.onClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleOk} color="primary">
              Ok
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    );
  }
}

class DeleteColumnButton extends Component {
  constructor(props) {
    super(props);
    console.log("DeleteColumnButton props", this.props);
    this.state = {
      open: false,
      selectedValue: ""
    };
  }

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleDelete = () => {
    const { sourceColumnId, boardId } = this.props;
    const destinationColumnId = this.state.selectedValue;

    if (destinationColumnId.length === 0) {
      api.post("/c/delete", { sourceColumnId, boardId }).then(() => {
        this.props.getBoardData();
      });
    }
  };

  handleClose = value => {
    this.setState((prevState, props) => {
      return { open: false };
    });
  };

  render() {
    return (
      <div>
        <br />
        <Button
          onClick={
            this.props.columnHasTickets
              ? this.handleClickOpen
              : this.handleDelete
          }
        >
          Delete
        </Button>
        <DeleteDialog
          columns={this.props.columns}
          selectedValue={this.state.selectedValue}
          open={this.state.open}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

// sourceColumnId
// destinationColumnId
// boardId

export default DeleteColumnButton;
