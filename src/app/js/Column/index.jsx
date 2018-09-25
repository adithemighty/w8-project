import React from "react";
import Card from "../Card";
import DeleteColumnButton from "./DeleteColumnButton";
import ArrowLeft from "../../assets/arrLeft.svg";
import ArrowRight from "../../assets/arrRight.svg";
import { Droppable } from "react-beautiful-dnd";

const Column = props => {
  const { title, tickets, id, boardId, columns } = props;

  const ticketsList = tickets.map((ticket, ind) => {
    return (
      <Card
        ticketDetailViewOpenHandler={props.ticketDetailViewOpenHandler}
        key={ind}
        index={ind}
        ticket={ticket}
      />
    );
  });

  return (
    <div className="column">
      {/* column header with title and delete button */}
      <div className="column-header">
        {props.first ? null : (
          <button
            onClick={() => props.columnMoveHandler("left", props.ind)}
            className="icon-button"
          >
            <img className="icon" src={ArrowLeft} alt="" />
          </button>
        )}
        <p className="column-title">{title}</p>
        <p>{props.limit ? `${props.tickets.length}/${props.limit}` : null}</p>

        <DeleteColumnButton
          sourceColumnId={id}
          columnHasTickets={tickets.length > 0 ? true : false}
          getBoardData={props.getBoardData}
          boardId={boardId}
          columns={columns}
        />
        {props.last ? null : (
          <button
            onClick={() => props.columnMoveHandler("right", props.ind)}
            className="icon-button"
          >
            <img className="icon" src={ArrowRight} alt="" />
          </button>
        )}
      </div>

      {/* this is necessary for the drag and drop to work so that after dnd we know which is the source and destination column. KEY IS IMPORTANT! DON'T DELETE, MOVE OR WHATEVER! OTHERWISE DRAG AND FUCKING DROP WILL NOT FUCKING MOVE! */}
      <Droppable key={id} droppableId={title}>
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
