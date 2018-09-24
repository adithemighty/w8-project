import React, { Component } from "react";
import api from "../utils/api";
import Board from "./Board";
import NewBoard from "./NewBoard";
import { Link, Route, Switch } from "react-router-dom";

class BoardBrowse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: []
    };
  }

  componentDidMount() {
    api.get("/api/b/data/all").then(data => {
      const boards = data.map((board, ind) => {
        return (
          <Link key={ind} to={`/b/${board._id}`}>
            {" "}
            {board.title}
          </Link>
        );
      });
      this.setState((prevState, props) => {
        const newState = prevState;
        newState.boards = boards;
        return newState;
      });
    });
  }

  render() {
    if (this.state.boards.length === 0) {
      return (
        <div>
          <p>Browse boards view</p>
        </div>
      );
    } else {
      return (
        <div>
          <Switch>
            <Route exact path="/b/new" render={() => <NewBoard />} />
            <Route path="/b/:id" render={() => <Board />} />

            <Route
              render={() => {
                return <div>{this.state.boards}</div>;
              }}
            />
          </Switch>
        </div>
      );
    }
  }
}

export default BoardBrowse;
