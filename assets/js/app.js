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
    deck = createDeck();

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

  const createDeck = () => {
    deck = [];
    for (let i = 2; i <=10; i++) {
      for (let type of types) {
        deck = [...deck, (i + type)];
      }
    }

    for (const special of specials) {
      for (const type of types) {
        deck = [...deck, special + type ];
      }
    }

    return _.shuffle(deck);
  }

  const requestCard = () => {
    if ( !deck.length ) throw 'No hay cartas en la baraja';
    
    const card = deck[0];
    
    deck = deck.filter( element => element !== card );
    
    return card;
  }

  const valueCard = ( card ) => {
    const value = card.substring( 0, card.length -1);

    return ( !isNaN(value) ) ? +value : ( value === "A" ) ? 11 : 10;
  }

  const paintHtml = ( request, reference ) => {
    const img = document.createElement('img');
    img.classList.add('carta')
    img.src = `./assets/img/${request}.png`;
    img.alt = request;

    reference.appendChild( img );
  }

  const showAlert = () => {
    const [ minimunPoints, computerPoints ] = playersPoints;
    setTimeout(() => {
      if ( computerPoints === minimunPoints ) return alert('Nadie Gana');
  
      if ( minimunPoints > 21 || computerPoints <= 21 ) return alert('Gano la computadora');
      
      if ( computerPoints > 21 ) return alert(' Gano el Jugador ');
    }, 50);
  }

  const accumulatePoints = ( card, turn, player ) => {
    playersPoints[ turn ] += valueCard( card );
    player.textContent = playersPoints[ turn ];
    return playersPoints[ turn ];
  }

  const computerTurn = ( minimunPoints ) => {
    let computerPoints;
    do {
      const card = requestCard();
      computerPoints = accumulatePoints( card, playersPoints.length - 1, spanComputerPoints );

      paintHtml( card, divComputerCards );

      if ( minimunPoints > 21 ) break;
      
    } while( ( computerPoints < minimunPoints ) && ( minimunPoints <= 21 ) );

    showAlert();
  }

  const clearHtml = ( element ) => {
    while( element.firstChild ) {
      element.removeChild( element.firstChild );
    }
  }

  //Eventos
  askForCard.addEventListener('click', () => {
    const card = requestCard();
    const playerPoints = accumulatePoints( card, 0, spanPlayerPoints );
    
    paintHtml( card, divPlayerCards );
    
    if ( playerPoints > 21 ) {
      askForCard.disabled = true;
      stopGame.disabled = true;
      computerTurn( playerPoints );
      return;
    }
    if ( playerPoints === 21 ) {
      askForCard.disabled = true;
      stopGame.disabled = true;
      computerTurn( playerPoints );
      return;
    }
  });

  stopGame.addEventListener('click', () => {
    askForCard.disabled = true;
    stopGame.disabled = true;
    
    computerTurn( playersPoints[0] );
  });

  newGame.addEventListener('click', () => {
    startGame();
  });

  return {
    newGame
  }
})();