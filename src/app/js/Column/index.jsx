import React, { Component } from "react";
import Card from "../Card";
import DeleteColumnButton from "./DeleteColumnButton";
import { Droppable } from "react-beautiful-dnd";

const Column = props => {
  const { title, tickets, id, boardId, columns } = props;

  const ticketsList = tickets.map((ticket, ind) => {
    return <Card key={ind} index={ind} ticket={ticket} />;
  });

  return (
    <div className="column">
      <p className="title">{title}</p>
      <DeleteColumnButton
        sourceColumnId={id}
        columnHasTickets={tickets.length > 0 ? true : false}
        getBoardData={props.getBoardData}
        boardId={boardId}
        columns={columns}
      />
      <Droppable droppableId={title}>
        {(provided, snapshot) => (
          <div
            className="column-container"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div className="column-tickets">
              {ticketsList}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
