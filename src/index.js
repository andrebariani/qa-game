import React from 'react';
import { Lobby } from 'boardgame.io/react';
import { TicTacToeBoard } from './board';
import { TicTacToe } from './game';

const server = `https://${window.location.hostname}`;
const importedGames = [{
  game: TicTacToe,
  board: TicTacToeBoard
}];

export default () => (
  <div>
    <h1>Lobby</h1>
    <Lobby gameServer={server} lobbyServer={server} gameComponents={importedGames} />
  </div>
);