import React, { Component } from "react";
import Card from "../Card";
import DeleteColumn from "./DeleteColumn";
import { Droppable } from "react-beautiful-dnd";

const Column = props => {
  const { title, tickets, id, boardId } = props;
  const ticketsList = tickets.map((ticket, ind) => {
    return <Card key={ind} index={ind} ticket={ticket} />;
  });
  const deleteButton =
    tickets.length === 0 ? (
      <DeleteColumn
        sourceColumnId={id}
        columnHasTickets={tickets.length > 0 ? true : false}
        getBoardData={props.getBoardData}
        boardId={boardId}
      />
    ) : (
      ""
    );
  return (
    <Droppable droppableId={title}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <p>{title}</p>
          {deleteButton}
          {ticketsList}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Column;
