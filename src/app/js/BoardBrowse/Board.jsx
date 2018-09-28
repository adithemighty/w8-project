import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { withRouter } from "react-router";
import { Route, Switch } from "react-router-dom";
import moment from "moment";

import api from "../utils/api";
import PlusIcon from "../../assets/plus.svg";
import ClockIcon from "../../assets/clock.svg";
import RetroIcon from "../../assets/idea.svg";

import Column from "../Column";
import LimitWarning from "./LimitWarning";
import ColumnCreate from "../Column/ColumnCreate";
import CardShowAndCreate from "../Card/CardShowAndCreate";
import Modal from "../Component/Modal";
import DailyAlarm from "./DailyAlarm";
import RetroModal from "./RetroModal";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      columns: {},
      limitWarningOpen: false,
      ticketDetailViewOpen: false,
      currentTicket: "",
      sortedColumnIds: [],
      dailyModalOpen: false,
      retroModalOpen: false
    };
  }

  openModal = type => {
    this.setState((prevState, props) => {
      const newStatus = {};
      newStatus[`${type}ModalOpen`] = !prevState[`${type}ModalOpen`];
      return newStatus;
    });
  };

  render() {
    const numberOfColumns = Object.keys(this.state.columns).length;
    const columns = Object.keys(this.state.columns).map(columnName => {
      const column = this.state.columns;
      const { title, ind, id, limit, tickets } = column[columnName];
      let first = ind === 0;
      let last = numberOfColumns === ind + 1;

      return (
        <Column
          first={first}
          last={last}
          columns={column}
          key={ind}
          title={title}
          id={id}
          ind={ind}
          limit={limit}
          getBoardData={this.getBoardData}
          boardId={this.state.id}
          tickets={tickets}
          ticketDetailViewOpenHandler={this.ticketDetailViewOpenHandler}
          columnMoveHandler={this.columnMoveHandler}
        />
      );
    });

    if (this.state.id === "") {
      return <div>Loading</div>;
    } else {
      return (
        <div className="board">
          <Switch>
            <Route
              exact
              path="/b/:boardId/t/new"
              render={() => (
                <CardShowAndCreate
                  ticket={this.state.currentTicket}
                  ticketDetailViewOpenHandler={this.ticketDetailViewOpenHandler}
                  getBoardData={this.getBoardData}
                />
              )}
            />
            <Route
              exact
              path="/b/:boardId/t/:ticketId"
              render={() => (
                <CardShowAndCreate
                  getBoardData={this.getBoardData}
                  ticket={this.state.currentTicket}
                  ticketDetailViewOpenHandler={this.ticketDetailViewOpenHandler}
                />
              )}
            />
          </Switch>

          {/* modal that pops up when limit of a column is reached */}
          {this.state.limitWarningOpen ? (
            <LimitWarning
              limitWarningHandler={this.limitWarningHandler}
              destinationColumn={this.state.destinationColumn}
            />
          ) : null}

          {/* Board header with title and add ticket btn */}
          <div className="board-header">
            {this.state.dailyModalOpen ? (
              <Modal>
                <DailyAlarm
                  openModal={this.openModal}
                  boardId={this.state.id}
                  dailyTime={this.state.dailyTime}
                />
              </Modal>
            ) : null}

            {this.state.retroModalOpen ? (
              <Modal>
                <RetroModal
                  openModal={this.openModal}
                  boardId={this.state.id}
                />
              </Modal>
            ) : // <p>hallo</p>
            null}

            <p className="title">{this.state.title}</p>

            <button
              disabled={numberOfColumns === 0}
              className="icon-text-btn btn-md marg-left-md confirm"
              onClick={() => {
                this.props.history.push(
                  `/b/${this.props.match.params.id}/t/new`
                );
              }}
            >
              <p>Create new issue</p>
              <img className="marg-left-md  add-icon" src={PlusIcon} alt="" />
            </button>

            <button
              className=" marg-left-md btn-md icon-text-btn neutral"
              onClick={() => {
                this.openModal("daily");
              }}
            >
              Start daily
              <img className="marg-left-md add-icon" src={ClockIcon} alt="" />
            </button>

            <button
              className=" marg-left-md btn-md icon-text-btn neutral"
              onClick={() => {
                this.openModal("retro");
              }}
            >
              Start retrospective
              <img className="marg-left-md add-icon" src={RetroIcon} alt="" />
            </button>
          </div>

          {/* Columns of the board */}
          <div className="board-container">
            <DragDropContext onDragEnd={this.onDragEnd}>
              {columns}
            </DragDropContext>

            {/* Additional add column element that is stylised like a column */}
            <ColumnCreate
              columns={this.state.columns}
              boardId={this.state.id}
              getBoardData={this.getBoardData}
            />
          </div>
        </div>
      );
    }
  }

  countingSecond = () => {
    this.setState({
      currentTime: moment()
    });
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidMount() {
    this.getBoardData();
  }

  boardChangedHandler = () => {
    // update the columns
    const columns = Object.keys(this.state.columns);
    const columnIds = [];
    columns.forEach((columnName, ind) => {
      const column = this.state.columns[columnName];
      columnIds.push(column.id);
      api.post("/api/c/update", {
        title: column.title,
        id: column.id,
        tickets: column.tickets,
        destinationColumn: null
      });
    });

    this.getBoardData();
  };

  columnMoveHandler = (direction, ind) => {
    const sortedColumnIds = this.state.sortedColumnIds;
    const movedColumnId = sortedColumnIds[ind];
    sortedColumnIds.splice(ind, 1);
    if (direction === "right") {
      sortedColumnIds.splice(ind + 1, 0, movedColumnId);
    } else if (direction === "left") {
      sortedColumnIds.splice(ind - 1, 0, movedColumnId);
    }

    api
      .post("/api/b/updateColumns", {
        columnIds: sortedColumnIds,
        boardId: this.state.id
      })
      .then(() => {
        this.boardChangedHandler();
        this.getBoardData();
      });
    this.boardChangedHandler();
    this.getBoardData();
  };

  limitWarningHandler = destinationColumn => {
    this.setState((prevState, props) => {
      return {
        limitWarningOpen: !prevState.limitWarningOpen,
        destinationColumn: destinationColumn
      };
    });
  };

  ticketDetailViewOpenHandler = ticketId => {
    this.setState((prevState, props) => {
      return {
        ticketDetailViewOpen: !prevState.ticketDetailViewOpen,
        currentTicket: ticketId
      };
    });
  };

  getBoardData = () => {
    const { id } = this.props.match.params;
    //this function is needed for updating the board on every change
    api.get(`/api/b/data/${id}`).then(board => {
      this.setState(function(prevState, props) {
        const { title, columns } = board;
        const newState = {
          title: title,
          columns: {},
          id: id,
          sortedColumnIds: []
        };

        columns.forEach(({ title, ticket, _id, limit }, ind) => {
          newState.sortedColumnIds.push(_id);
          newState.columns[title] = {
            tickets: ticket,
            id: _id,
            title: title,
            limit: limit,
            ind: ind
          };
        });

        return newState;
      });
    });
  };

  reorder = ({ listName, list, oldPos, newPos }) => {
    var movingElement = list[oldPos];
    if (oldPos >= 0) {
      //delete element from old position
      list.splice(oldPos, 1);
    }
    //add copy of element to array in the new position
    list.splice(newPos, 0, movingElement);

    //refresh state
    this.setState(function(prevState, props) {
      const newState = prevState;
      newState.columns[listName].tickets = list;
      return newState;
    });
    this.boardChangedHandler();
  };

  addToList = ({ listName, list, pos, element }) => {
    list.splice(pos, 0, element);
    this.setState(function(prevState, props) {
      const newState = prevState;

      newState.columns[listName].tickets = list;
      return newState;
    });
    this.boardChangedHandler();
  };

  removeFromList = ({ listName, list, element }) => {
    //find element in array
    const pos = list.indexOf(element);
    //remove element from array
    list.splice(pos, 1);
    this.setState(function(prevState, props) {
      const newState = prevState;

      newState.columns[listName].tickets = list;
      return newState;
    });
    this.boardChangedHandler();
  };

  onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    const startColumn = result.source.droppableId;
    const endColumn = result.destination.droppableId;
    const initIndex = result.source.index;
    const endIndex = result.destination.index;

    const destinationColumnLimit = this.state.columns[endColumn].limit;
    const destinationColumnTickets = this.state.columns[endColumn].tickets
      .length;

    //DnD inside of one column
    if (startColumn === endColumn) {
      this.reorder({
        listName: startColumn,
        list: this.state.columns[startColumn].tickets,
        oldPos: initIndex,
        newPos: endIndex
      });
    } else if (
      //DnD from one column into another
      //check if WiP limit is being broken
      destinationColumnTickets < destinationColumnLimit ||
      typeof destinationColumnLimit === "undefined"
    ) {
      this.addToList({
        listName: endColumn,
        list: this.state.columns[endColumn].tickets,
        pos: endIndex,
        element: this.state.columns[startColumn].tickets[initIndex]
      });
      this.removeFromList({
        listName: startColumn,
        list: this.state.columns[startColumn].tickets,
        element: this.state.columns[startColumn].tickets[initIndex]
      });
    } else {
      this.limitWarningHandler(endColumn);
    }
  };
}

export default withRouter(Board);
