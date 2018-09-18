import React, { Component } from "react";
import api from "./utils/api";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state;
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidMount() {
    api.get("/b/data").then(data => {
      this.setState(function(prevState, props) {
        const newState = {
          title: "",
          columns: []
        };
        const { title, columns } = data[0];
        newState.title = title;

        newState.columns = columns.map(({ title, ticket, _id }) => {
          return {
            title,
            ticket,
            _id
          };
        });

        return { ...newState };
      });
    });
  }

  onDragEnd = result => {
    console.log("columns", this.state.columns);
    console.log("source", result.source.droppableId);
    console.log("destination", result.destination.droppableId);
    console.log("result", result);
  };

  render() {
    if (this.state == null) {
      console.log("it's null");
      return <div>Loading</div>;
    } else {
      return (
        <div>
          {this.state.title}

          <DragDropContext onDragEnd={this.onDragEnd}>
            {this.state.columns.map(column => {
              return (
                <Column
                  key={column.title}
                  title={column.title}
                  id={column._id}
                  tickets={column.ticket}
                />
              );
            })}
          </DragDropContext>
        </div>
      );
    }
  }
}

export default Board;
