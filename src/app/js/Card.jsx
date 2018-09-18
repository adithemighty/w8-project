import React from "react";
import { Draggable } from "react-beautiful-dnd";

const style = {
  border: "1px solid grey",
  margin: "5px",
  width: "300px",
  height: "50px"
};

const Card = props => {
  const { title, blocker, _id } = props.ticket;
  return (
    <Draggable key={_id} draggableId={_id} index={props.index}>
      {(provided, snapshot) => {
        return (
          <div
            style={style}
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
