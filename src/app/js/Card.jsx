import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Card = props => {
  const { title, blocker, _id } = props.ticket;
  return (
    <Draggable key={_id} draggableId={_id} index={props.index}>
      {(provided, snapshot) => {
        return (
          <div
            className="card"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {title}
          </div>
        );
      }}
    </Draggable>
  );
};

export default Card;
