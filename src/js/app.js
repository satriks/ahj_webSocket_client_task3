import Game from './game_widget/game'

const element = document.querySelector('.game')
// const url = 'http://localhost:7070/sse'
const url = 'https://ahj-websocket-server-task3.onrender.com/sse'

const game = new Game(element, url) // eslint-disable-line

// game.start();
