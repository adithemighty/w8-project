import React, { Component } from "react";
import api from "../utils/api";
import Board from "./Board";
import CreateEditBoard from "./CreateEditBoard";
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
      this.setState((prevState, props) => {
        const newState = prevState;
        newState.boards = data;
        return newState;
      });
    });
  };

  deleteBoard = id => {
    api.post("/api/b/delete", { id }).then(() => {
      this.getBoards();
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
        <p>Create new board</p>
        <img className="add-icon" src={PlusIcon} alt="" />
      </button>
    );

    const boardCards = this.state.boards.map((board, ind) => {
      return (
        // <div></div>

        <Link className="link board-card" key={ind} to={`/b`}>
          <p>{board.title}</p>
          {/* Delete button */}
          <button
            className="icon-button"
            onClick={() => {
              this.deleteBoard(board._id);
              this.getBoards();
            }}
          >
            <img className="icon" src={DeleteIcon} alt="" />
          </button>
          {/* Edit button */}
          <Link to={`/b/${board._id}/edit`}>
            <button className="icon-button">
              <img className="icon" src={EditIcon} alt="" />
            </button>
          </Link>
        </Link>
      );
    });
    if (!this.props.user) return <Redirect to="/auth/sign-in" />; // this is actually the protection
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/b/new"
            render={() => (
              <CreateEditBoard
                user={this.props.user}
                getBoards={this.getBoards}
              />
            )}
          />
          <Route
            exact
            path="/b/:boardId/edit"
            render={() => (
              <CreateEditBoard
                user={this.props.user}
                getBoards={this.getBoards}
                edit={true}
              />
            )}
          />
          <Route path="/b/:id" render={() => <Board />} />
          <Route
            render={() => {
              return (
                <div className="board-browse">
                  {addBoardBtn}
                  {this.state.boards.length > 0 ? (
                    <div>{boardCards}</div>
                  ) : (
                    <div className="marg-top-md">
                      You don't have any boards yet.
                    </div>
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
