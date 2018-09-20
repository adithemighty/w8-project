import React, { Component } from "react";
import api from "../utils/api";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const theme = createMuiTheme({
  typography: {
    fontSize: "1.3rem"
  }
});

const style = {
  backgroundImage:
    "linear-gradient(to right, #FF512F 0%, #DD2476 51%, #FF512F 100%)",
  color: "white"
};

class DeleteDialog extends React.Component {
  handleListItemClick = value => {
    this.props.onSelect(value);
  };

  render() {
    const { classes, onClose, selectedValue, onDelete, ...other } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <Dialog
          onClose={this.props.onClose}
          aria-labelledby="simple-dialog-title"
          {...other}
        >
          <DialogTitle id="simple-dialog-title">Column not empty</DialogTitle>
          <Typography variant="subheading">
            Where should the tickets be moved?
          </Typography>
          <div>
            <List>
              {Object.keys(this.props.columns).map(column => {
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
              <Button onClick={this.props.onDelete} color="primary">
                Ok
              </Button>
            </DialogActions>
          </div>
        </Dialog>
      </MuiThemeProvider>
    );
  }
}

class DeleteColumnButton extends Component {
  constructor(props) {
    super(props);

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

  handleClose = () => {
    this.setState((prevState, props) => {
      return { open: false };
    });
  };

  handleSelection = value => {
    this.setState((prevState, props) => {
      return { selectedValue: value };
    });
  };

  handleDelete = () => {
    const { sourceColumnId, boardId } = this.props;
    const destinationColumnId = this.state.selectedValue;

    if (destinationColumnId.length === 0) {
      api.post("/c/delete", { sourceColumnId, boardId }).then(() => {
        this.props.getBoardData();
      });
    } else {
      api
        .post("/c/delete", { sourceColumnId, boardId, destinationColumnId })
        .then(() => {
          this.props.getBoardData();
        });
    }
  };

  render() {
    return (
      <div>
        <IconButton
          aria-label="Delete"
          onClick={
            this.props.columnHasTickets
              ? this.handleClickOpen
              : this.handleDelete
          }
        >
          <DeleteIcon fontSize="small" />
        </IconButton>

        <DeleteDialog
          columns={this.props.columns}
          selectedValue={this.state.selectedValue}
          open={this.state.open}
          onClose={this.handleClose}
          onSelect={this.handleSelection}
          onDelete={this.handleDelete}
        />
      </div>
    );
  }
}

// sourceColumnId
// destinationColumnId
// boardId

export default DeleteColumnButton;
