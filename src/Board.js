import React from 'react';

export class TicTacToeBoard extends React.PureComponent {
  constructor(props) {
    super(props);

    this.emailValidation = this.emailValidation.bind(this);
  }

  emailValidation(input) {
    let mail = input.target.value;
    console.log(mail)
  }

  onClick(id) {
    this.props.moves.playCard(id);
  }

  onDiscardClick(id) {
    this.props.moves.discardCard(id);
  }

  onChooseClick(id) {
    this.props.moves.chooseCard(id);
  }

  render() {
    const questionCellStyle = {
      border: '1px solid #555',
      width: '100px',
      height: '50px',
      lineHeight: '50px',
      textAlign: 'center',
      background: '#000',
      color: '#fff'
    };

    const answerCellStyle = {
      border: '1px solid #555',
      width: '50px',
      height: '50px',
      lineHeight: '50px',
      textAlign: 'center',
      background: '#fff',
      color: '#000'
    };

    let nameInput = <input onClick={this.emailValidation}></input>;

    let question =
      <table id="board">
        <tbody>
          <tr>
            <th>
              Question
            </th>
            <td style={questionCellStyle}>
              {this.props.G.currentQuestion.text}
            </td>
          </tr>
        </tbody>
      </table>
      ;

    let playerTables = [];
    for (let p = 0; p < this.props.ctx.numPlayers; p++) {
      let tbody = [];

      for (let i = 0; i < this.props.G.players[p].hand.length; i++) {
        let cells = [];
        cells.push(
          <button style={{ color: "red" }} onClick={() => this.onDiscardClick(i)}>Discard</button>
        );
        cells.push(
          <td style={answerCellStyle} key={i} onClick={() => this.onClick(i)}>
            {this.props.G.players[p].hand[i]}
          </td>
        );
        tbody.push(<tr key={i}>{cells}</tr>);

      }
      let points = this.props.G.players[p].points.length > 0 ? `+${Object.keys(this.props.G.players[p].points).length}` : ''
      playerTables.push(
        <table id="board">
          <tbody>
            <tr>
              <th key={p}>
                Player {p}
                <p style={{ color: "green" }}>{points}</p>
              </th>
            </tr>
            {tbody}
          </tbody>
        </table>
      );
    }

    let answers = []
    for (let i = 0; i < this.props.G.currentAnswers.length; i++) {
      for (let j = 0; j < this.props.G.currentAnswers[i].answers.length; j++) {
        let cells = [];
        cells.push(
          <td style={answerCellStyle} key={j}>
            {this.props.G.currentAnswers[i].answers[j]}
          </td>
        );
        answers.push(<tr key={i} onClick={() => this.onChooseClick(i)}>{cells}</tr>);
      }
    }

    let answersTable = []
    answersTable.push(
      <table id="board">
        <tbody>
          {answers}
        </tbody>
      </table>
    );

    return (
      <div>
        {nameInput}
        {question}
        {playerTables}
        {answersTable}
      </div>
    );
  }
}