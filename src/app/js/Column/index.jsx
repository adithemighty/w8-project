import React, { Component } from "react";
import Card from "../Card";
import DeleteColumnButton from "./DeleteColumnButton";
import ArrowLeft from "../../assets/arrLeft.svg";
import ArrowRight from "../../assets/arrRight.svg";
import { Droppable } from "react-beautiful-dnd";
import { RIEInput } from "riek";
import api from "../utils/api";

class Column extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: ""
    };
  }

  handleInputChange = field => {
    field.limit = Number(field.limit);
    api
      .post("/api/c/update", { id: this.props.id, limit: field.limit })
      .then(() => {
        this.props.getBoardData();
      });
  };

  render() {
    const { title, tickets, id, boardId, columns } = this.props;

    const ticketsList = tickets.map((ticket, ind) => {
      return (
        <Card
          ticketDetailViewOpenHandler={this.props.ticketDetailViewOpenHandler}
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
          <div className="limit">
            <label htmlFor="">Column limit: </label>
            <RIEInput
              className="limit"
              value={this.state.limit}
              change={this.handleInputChange}
              propName="limit"
            />
          </div>

          {this.props.first ? null : (
            <button
              onClick={() =>
                this.props.columnMoveHandler("left", this.props.ind)
              }
              className="icon-button"
            >
              <img className="icon" src={ArrowLeft} alt="" />
            </button>
          )}
          <p className="column-title">{title}</p>
          <p>
            {this.props.limit
              ? `${this.props.tickets.length}/${this.props.limit}`
              : null}
          </p>

          <DeleteColumnButton
            sourceColumnId={id}
            columnHasTickets={tickets.length > 0 ? true : false}
            getBoardData={this.props.getBoardData}
            boardId={boardId}
            columns={columns}
          />
          {this.props.last ? null : (
            <button
              onClick={() =>
                this.props.columnMoveHandler("right", this.props.ind)
              }
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
  }
}

export default Column;
