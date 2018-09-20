import React, { Component } from "react";
import Card from "../Card";
import DeleteColumnButton from "./DeleteColumnButton";
import { Droppable } from "react-beautiful-dnd";

const Column = props => {
  const { title, tickets, id, boardId, columns } = props;
  console.log("props", props);

  const ticketsList = tickets.map((ticket, ind) => {
    return <Card key={ind} index={ind} ticket={ticket} />;
  });

  return (
    <div className="column">
      <div className="column-header">
        {/* column header with title and delete button */}
        <p className="column-title">{title}</p>
        <p>{props.limit ? props.limit : ""}</p>

        <DeleteColumnButton
          sourceColumnId={id}
          columnHasTickets={tickets.length > 0 ? true : false}
          getBoardData={props.getBoardData}
          boardId={boardId}
          columns={columns}
        />
      </div>

      <Droppable droppableId={title}>
        {/* this is necessary for the drag and drop to work so that after dnd we know which is the source and destination column */}
        {(provided, snapshot) => (
          <div
            className="column-container"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div className="column-tickets">
              {ticketsList}
              {/* the placeholder is there so that the space from which a card is dragged  doesn't collapse */}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
