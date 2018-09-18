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
        const { title, columns } = data[0];
        return { title, columns };
      });
    });
  }

  onDragEnd = result => {
    console.log("state", this.state.columns);
    console.log(result);
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
              return <Column key={column.title} columnInfo={column} />;
            })}
          </DragDropContext>
        </div>
      );
    }
  }
}

export default Board;
