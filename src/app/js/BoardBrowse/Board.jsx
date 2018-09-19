import React, { Component } from "react";
import api from "../utils/api";
import Column from "../Column";
import ColumnCreate from "../Column/ColumnCreate";
import { DragDropContext } from "react-beautiful-dnd";
import { withRouter } from "react-router";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state;
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidMount() {
    this.getBoardData();
  }

  getBoardData = () => {
    const { id } = this.props.match.params;
    //get this.props.match.params.id
    api.get(`/b/data/${id}`).then(board => {
      this.setState(function(prevState, props) {
        const { title, columns } = board;
        const newState = {
          title: "",
          columns: {},
          id: id
        };
        newState.title = title;

        columns.forEach(({ title, ticket, _id }) => {
          newState.columns[title] = {
            tickets: ticket,
            id: _id,
            title: title
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
  };

  addToList = ({ listName, list, pos, element }) => {
    list.splice(pos, 0, element);
    this.setState(function(prevState, props) {
      const newState = prevState;
      newState.columns[listName].tickets = list;
      return newState;
    });
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
  };

  onDragEnd = result => {
    const startColumn = result.source.droppableId;
    const endColumn = result.destination.droppableId;
    const initIndex = result.source.index;
    const endIndex = result.destination.index;

    //DnD inside of one column
    if (startColumn === endColumn) {
      this.reorder({
        listName: startColumn,
        list: this.state.columns[startColumn].tickets,
        oldPos: initIndex,
        newPos: endIndex
      });
    } else {
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
    }
  };

  render() {
    if (this.state == null) {
      return <div>Loading</div>;
    } else {
      return (
        <div className="board">
          <p className="title">{this.state.title}</p>

          <div className="board-container">
            <DragDropContext onDragEnd={this.onDragEnd}>
              {Object.keys(this.state.columns).map(columnName => {
                const column = this.state.columns;
                return (
                  <Column
                    columns={this.state.columns}
                    key={column[columnName].title}
                    title={column[columnName].title}
                    id={column[columnName].id}
                    getBoardData={this.getBoardData}
                    boardId={this.state.id}
                    tickets={column[columnName].tickets}
                  />
                );
              })}
            </DragDropContext>
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
}

export default withRouter(Board);
