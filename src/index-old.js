import React from "react";
import { render } from "react-dom";
import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";
import { TicTacToe } from "./Game";
import { TicTacToeBoard } from "./Board";

import css from './index.css';
import FormClass from "./FormClass";
import FormFunc from "./FormFunc";


const TicTacToeClient = Client({
  game: TicTacToe,
  board: TicTacToeBoard,
  numPlayers: 3,
  multiplayer: SocketIO({ server: "localhost:8000" })
});

class App extends React.Component {
  state = { playerID: null };

  render() {
    if (this.state.playerID === null) {
      return (
        <div>
          <p>Play as</p>
          <button onClick={() => this.setState({ playerID: "0" })}>
            Player 0
          </button>
          <button onClick={() => this.setState({ playerID: "1" })}>
            Player 1
          </button>
          <button onClick={() => this.setState({ playerID: "2" })}>
            Player 2
          </button>
        </div>
      );
    }
    return (
      <div>
        <TicTacToeClient playerID={this.state.playerID} />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));