import React from "react";
import api from "../utils/api";

const DeleteColumn = props => {
  console.log(props);
  const { sourceColumnId, boardId } = props;

  const columnHasTicketsHandler = () => {
    console.log("column has tickets");
  };
  const columnDoesntHaveTicketsHandler = () => {
    api
      .post("/c/delete", {
        sourceColumnId,
        boardId
      })
      .then(() => {
        props.getBoardData();
      });
    console.log("column doesn't have tickets");
    console.log("this is the id", props.sourceColumnId);
  };
  return (
    <div>
      <button
        onClick={
          props.columnHasTickets
            ? columnHasTicketsHandler
            : columnDoesntHaveTicketsHandler
        }
      >
        Delete column
      </button>
    </div>
  );
};

// sourceColumnId
// destinationColumnId
// boardId

export default DeleteColumn;
