import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { withRouter } from "react-router";
import EditIcon from "../../assets/edit.svg";

const Card = props => {
  const { title, blocker, _id, ticketType } = props.ticket;
  return (
    <div>
      <Draggable key={_id} draggableId={_id} index={props.index}>
        {(provided, snapshot) => {
          const ticketColor = ticketType
            .toLowerCase()
            .split(" ")
            .join("-");
          const className = `card ${ticketColor}`;
          return (
            <div
              className={className}
              onClick={() => props.ticketDetailViewOpenHandler(_id)}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              {title}
              <button
                className="icon-button"
                onClick={() => {
                  props.history.push(`${props.match.url}/t/${_id}`);
                }}
              >
                <img className="icon" src={EditIcon} alt="" />
              </button>
            </div>
          );
        }}
      </Draggable>
    </div>
  );
};

export default withRouter(Card);
