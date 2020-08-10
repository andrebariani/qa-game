import { answers } from './data/answers.json';
import { questions } from './data/questions.json';

export const TicTacToe = {
	setup: (ctx) => ({
		questionDeck: questions,
		answerDeck: ctx.random.Shuffle(answers),
		currentQuestion: "",
		currentAnswers: [],
		handLength: 3,
		players: Array.from({ length: ctx.numPlayers }, (_, i) => ({
			playerID: i,
			hand: [],
			points: [],
			movesLeft: 0
		}))
	}),

	disableUndo: false,

	turn: {
		onBegin: (G, ctx) => {
			G.currentQuestion = G.questionDeck.shift();
			// eslint-disable-next-line
			G.players.map((player) => {
				while (player.hand.length < G.handLength) player.hand.push(G.answerDeck.shift());
				player.movesLeft = G.currentQuestion.numOfAnswers;
			});
			ctx.events.setActivePlayers({ others: 'play', moveLimit: G.currentQuestion.numOfAnswers });
		},
		stages: {
			play: {
				moves: {
					playCard: {
						move: (G, ctx, id) => {
							let player = G.players[ctx.playerID];
							let card = player.hand.splice(id, 1)[0];
							let ID = G.currentAnswers.findIndex(a => a.playerID === ctx.playerID);
							if (ID === -1) {
								let playerAnswers = [card];
								G.currentAnswers.push({ answers: playerAnswers, playerID: ctx.playerID });
							} else {
								G.currentAnswers[ID].answers.push(card);
							}

							player.movesLeft--;

							if (Object.keys(ctx.activePlayers).length === 1 && player.movesLeft === 0) {
								ctx.events.setActivePlayers({ currentPlayer: 'choose', moveLimit: 1 });
							}
						},
					},
					discardCard: {
						move: (G, ctx, id) => {
							let card = G.players[ctx.playerID].hand.splice(id, 1)[0];
							G.answerDeck.push(card);
							G.players[ctx.playerID].hand.push(G.answerDeck.shift());
							console.log(`Player ${ctx.playerID} has discarded ${card}`)
						},
						noLimit: true
					},
				}
			},
			choose: {
				moves: {
					chooseCard: {
						move: (G, ctx, id) => {
							const { playerID, answers } = G.currentAnswers.splice(id, 1)[0];

							G.players[playerID].points.push({
								question: G.currentQuestion,
								winningAnswers: answers
							});

							while (G.currentAnswers.length) {
								let a = G.currentAnswers.pop();
								while (a.length) {
									G.answerDeck.push(a.pop());
								}
							}

							G.questionDeck.push(G.currentQuestion);
							ctx.events.endTurn();
						},
					},
				}
			}
		}
	},
};