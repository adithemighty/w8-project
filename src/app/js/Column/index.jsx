import React, { Component } from "react";
import Card from "../Card";
import { Droppable } from "react-beautiful-dnd";

const Column = props => {
  const { title, tickets, id } = props;
  const ticketsList = tickets.map((ticket, ind) => {
    return <Card key={ind} index={ind} ticket={ticket} />;
  });
  return (
    <Droppable droppableId={title}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <p>{title}</p>
          {ticketsList}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Column;
