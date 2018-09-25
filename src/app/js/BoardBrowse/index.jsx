import React, { Component } from "react";
import api from "../utils/api";
import Board from "./Board";
import NewBoard from "./NewBoard";
import { withRouter } from "react-router";

import { Link, Route, Switch } from "react-router-dom";

import DeleteIcon from "../../assets/trash.svg";
import EditIcon from "../../assets/edit.svg";
import PlusIcon from "../../assets/plus.svg";

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
      const boards = data.map((board, ind) => {
        return (
          <Link className="link" key={ind} to={`/b/${board._id}`}>
            <div key={ind} className="board-card">
              {" "}
              <p>{board.title}</p>
              {/* Delete button */}
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
              {/* Edit button */}
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
    const addBoardBtn = (
      <button
        className="add-btn marg-top-md"
        onClick={() => {
          this.props.history.push(`/b/new`);
          this.getBoards();
        }}
      >
        <p>Create new issue</p>
        <img className="add-icon" src={PlusIcon} alt="" />
      </button>
    );
    if (!this.props.user) return <Redirect to="/auth/sign-in" />; // this is actually the protection

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
            render={() => {
              return (
                <div className="board-browse">
                  {addBoardBtn}
                  {this.state.boards.length > 0 ? (
                    <div>{this.state.boards}</div>
                  ) : (
                    <p>You don't have any boards yet.</p>
                  )}
                </div>
              );
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(BoardBrowse);
