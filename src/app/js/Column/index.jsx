import React from "react";
import Card from "../Card";
import DeleteColumnButton from "./DeleteColumnButton";
import { Droppable } from "react-beautiful-dnd";
import { Link, Route, Switch } from "react-router-dom";

const Column = props => {
  const { title, tickets, id, boardId, columns } = props;
  console.log(props);

  const ticketsList = tickets.map((ticket, ind) => {
    return <Card key={ind} index={ind} ticket={ticket} />;
  });

  return (
    <div className="column">
      {/* column header with title and delete button */}
      <div className="column-header">
        <p className="column-title">{title}</p>
        <p>{props.limit ? `${props.tickets.length}/${props.limit}` : null}</p>

        <DeleteColumnButton
          sourceColumnId={id}
          columnHasTickets={tickets.length > 0 ? true : false}
          getBoardData={props.getBoardData}
          boardId={boardId}
          columns={columns}
        />
      </div>

      {/* this is necessary for the drag and drop to work so that after dnd we know which is the source and destination column */}
      <Droppable droppableId={title}>
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
