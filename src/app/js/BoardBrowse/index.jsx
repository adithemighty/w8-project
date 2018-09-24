import React, { Component } from "react";
import api from "../utils/api";
import Board from "./Board";
import NewBoard from "./NewBoard";
import { Link, Route, Switch } from "react-router-dom";
import DeleteIcon from "../../assets/trash.svg";
import EditIcon from "../../assets/edit.svg";

class BoardBrowse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: []
    };
  }

  componentDidMount() {
    this.getBoards();
  }

  getBoards = () => {
    api.get(`/api/b/data/all/${this.props.user._id}`).then(data => {
      console.log(this.props);
      const boards = data.map((board, ind) => {
        console.log(board);
        return (
          <Link className="link" key={ind} to={`/b/${board._id}`}>
            <div key={ind} className="board-card">
              {" "}
              <p>{board.title}</p>
              <button
                className="icon-button"
                onClick={
                  this.props.columnHasTickets
                    ? this.handleClickOpen
                    : this.handleDelete
                }
              >
                <img className="icon" src={DeleteIcon} alt="" />
              </button>
              <button
                className="icon-button"
                onClick={
                  this.props.columnHasTickets
                    ? this.handleClickOpen
                    : this.handleDelete
                }
              >
                <img className="icon" src={EditIcon} alt="" />
              </button>
            </div>
          </Link>
        );
      });
      this.setState((prevState, props) => {
        const newState = prevState;
        newState.boards = boards;
        return newState;
      });
    });
  };

  render() {
    if (!this.props.user) return <Redirect to="/auth/sign-in" />; // this is actually the protection
    if (this.state.boards.length === 0) {
      return (
        <div>
          <p>Browse boards view</p>
        </div>
      );
    } else {
      return (
        <div>
          <Switch>
            <Route
              exact
              path="/b/new"
              render={() => (
                <NewBoard user={this.props.user} getBoards={this.getBoards} />
              )}
            />
            <Route path="/b/:id" render={() => <Board />} />
            <Route
              render={() => (
                <div className="board-browse">{this.state.boards}</div>
              )}
            />
          </Switch>
        </div>
      );
    }
  }
}

export default BoardBrowse;
