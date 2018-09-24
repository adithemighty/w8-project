import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { withRouter } from "react-router";
import EditIcon from "../../assets/edit.svg";

import { Link, Route, Switch } from "react-router-dom";

const Card = props => {
  const { title, blocker, _id } = props.ticket;
  return (
    <div>
      <Draggable key={_id} draggableId={_id} index={props.index}>
        {(provided, snapshot) => {
          return (
            <div
              className="card"
              onClick={() => props.ticketDetailViewOpenHandler(_id)}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              {/* <Link to={`${props.match.url}/t/${_id}`}>{title}</Link> */}
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
