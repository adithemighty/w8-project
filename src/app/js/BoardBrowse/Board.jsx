import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { withRouter } from "react-router";
import { Route, Link, Switch } from "react-router-dom";

import api from "../utils/api";

import Column from "../Column";
import LimitWarning from "./LimitWarning";
import ColumnCreate from "../Column/ColumnCreate";
import CardDetails from "../Card/CardDetails";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      columns: {},
      limitWarningOpen: false,
      ticketDetailViewOpen: false,
      currentTicket: ""
    };
  }

  render() {
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
                <CardDetails
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
                <CardDetails
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

          {/* Board header with title */}
          <div className="board-header">
            <p className="title">{this.state.title}</p>
            <Link to={`/b/${this.props.match.params.id}/t/new`}>
              Create new issue
            </Link>
          </div>

          {/* Columns of the board */}
          <div className="board-container">
            <DragDropContext onDragEnd={this.onDragEnd}>
              {Object.keys(this.state.columns).map((columnName, ind) => {
                const column = this.state.columns;

                const { title, id, limit, tickets } = column[columnName];
                return (
                  <Column
                    columns={column}
                    key={ind}
                    title={title}
                    id={id}
                    limit={limit}
                    getBoardData={this.getBoardData}
                    boardId={this.state.id}
                    tickets={tickets}
                    ticketDetailViewOpenHandler={
                      this.ticketDetailViewOpenHandler
                    }
                  />
                );
              })}
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

  componentDidMount() {
    const intervalId = setInterval(this.boardChangedHandler, 30000);
    // store intervalId in the state so it can be accessed later:
    this.setState({ intervalId: intervalId });

    this.getBoardData();
  }

  componentWillUnmount() {
    // use intervalId from the state to clear the interval
    clearInterval(this.state.intervalId);
  }

  boardChangedHandler = () => {
    //check if board changed
    // if (this.state.changed) {
    // update the columns
    const columns = Object.keys(this.state.columns);
    columns.forEach((columnName, ind) => {
      const column = this.state.columns[columnName];
      //if yes, send data to BE
      api.post("/api/c/update", {
        title: column.title,
        id: column.id,
        tickets: column.tickets,
        destinationColumn: null
      });
    });

    this.getBoardData();
    // }
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
          id: id
        };

        columns.forEach(({ title, ticket, _id, limit }) => {
          newState.columns[title] = {
            tickets: ticket,
            id: _id,
            title: title,
            limit: limit
          };
        });
        return { ...newState };
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
