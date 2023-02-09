import { createDeck, requestCard, newDeck, paintCard, accumulatePoints, computerTurn, clearHtml} from '../modules';

(() => {
  'use strict'

  const newGame = document.querySelector('#nuevo-juego');
  const askForCard = document.querySelector('#pedir-carta');
  const stopGame = document.querySelector('#detener');
  const spanPlayerPoints = document.querySelector('#judador-puntos');
  const spanComputerPoints = document.querySelector('#computadora-puntos');
  const divPlayerCards = document.querySelector('#jugador-cartas');
  const divComputerCards = document.querySelector('#computadora-cartas');

  const types = ['C', 'D', 'H', 'S'];
  const specials = ['A', 'J', 'Q', 'K'];

  let deck = [];
  let playersPoints = [];

  const startGame = ( players = 2 ) => {
    deck = createDeck( types, specials );

    playersPoints = [];
    for (let i = 0; i < players; i++) {
      playersPoints = [...playersPoints, 0];
    }

    askForCard.disabled = false;
    stopGame.disabled = false;

    spanPlayerPoints.textContent = 0;
    spanComputerPoints.textContent = 0;

    clearHtml( divComputerCards );
    clearHtml( divPlayerCards );
  }

  //Eventos
  askForCard.addEventListener('click', () => {
    const card = requestCard( deck );
    deck = newDeck( card, deck );
    const playerPoints = accumulatePoints( playersPoints, 0, card, spanPlayerPoints );
    
    paintCard( card, divPlayerCards );
    
    if ( playerPoints > 21 ) {
      askForCard.disabled = true;
      stopGame.disabled = true;
      computerTurn( deck, playersPoints, spanComputerPoints, divComputerCards, playerPoints );
      return;
    }
    if ( playerPoints === 21 ) {
      askForCard.disabled = true;
      stopGame.disabled = true;
      computerTurn( deck, playersPoints, spanComputerPoints, divComputerCards, playerPoints );
      return;
    }
  });

  stopGame.addEventListener('click', () => {
    askForCard.disabled = true;
    stopGame.disabled = true;
    
    computerTurn( deck , playersPoints , spanComputerPoints, divComputerCards, playersPoints[0]  );
  });

  newGame.addEventListener('click', () => {
    startGame();
  });

  return {
    newGame
  }
})();