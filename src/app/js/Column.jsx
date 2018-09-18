import React, { Component } from "react";
import Card from "./Card";
import { Droppable } from "react-beautiful-dnd";

class Column extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: this.props.columnInfo.ticket
    };
  }

  render() {
    const { title, _id } = this.props.columnInfo;
    console.log(_id);
    const tickets = this.state.tickets.map((ticket, ind) => {
      return <Card key={ind} index={ind} ticket={ticket} />;
    });
    return (
      <Droppable droppableId={title}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <p>{title}</p>
            {tickets}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }
}

export default Column;
