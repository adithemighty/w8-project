import React, { Component } from "react";
import api from "../utils/api";
import Board from "./Board";
import BoardCard from "./BoardCard";
import Modal from "../Component/Modal";
import CreateEditBoard from "./CreateEditBoard";
import DeleteDialog from "./DeleteDialog";
import { withRouter } from "react-router";

import { Route, Switch } from "react-router-dom";

import PlusIcon from "../../assets/plus.svg";

class BoardBrowse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: [],
      editModalOpen: false,
      deleteModalOpen: false,
      addModalOpen: false
    };
  }

  componentDidMount() {
    this.getBoards();
  }

  openModal = type => {
    this.setState((prevState, props) => {
      const newStatus = {};
      newStatus[`${type}ModalOpen`] = !prevState[`${type}ModalOpen`];
      return newStatus;
    });
  };

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
          this.openModal("add");
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
        <BoardCard
          openModal={this.openModal}
          title={board.title}
          key={ind}
          boardId={board._id}
          ind={ind}
        />
      );
    });

    if (!this.props.user) return <Redirect to="/auth/sign-in" />; // this is actually the protection

    return (
      <div>
        <Switch>
          <Route
            exact
            path="/b/new"
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
                  {this.state.addModalOpen ? (
                    <Modal>
                      <CreateEditBoard
                        user={this.props.user}
                        getBoards={this.getBoards}
                        openModal={this.openModal}
                      />
                    </Modal>
                  ) : null}
                </div>
              );
            }}
          />

          <Route
            exact
            path="/b/:boardId/delete"
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
                  {this.state.deleteModalOpen ? (
                    <Modal>
                      <DeleteDialog
                        openModal={this.openModal}
                        deleteBoard={this.deleteBoard}
                      />
                    </Modal>
                  ) : null}
                </div>
              );
            }}
          />
          <Route
            exact
            path="/b/:boardId/edit"
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
                  {this.state.editModalOpen ? (
                    <Modal>
                      <CreateEditBoard
                        user={this.props.user}
                        getBoards={this.getBoards}
                        edit={true}
                        openModal={this.openModal}
                      />
                    </Modal>
                  ) : null}
                </div>
              );
            }}
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
