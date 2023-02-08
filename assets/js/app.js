(() => {
  /* 
    2C = Two of Clubs
    2D = Two of Diamont
    2H = Two of Hearts
    2S = Two of Spades
  */
  const nuevoJuego = document.querySelector('#nuevo-juego');
  const pedirCarta = document.querySelector('#pedir-carta');
  const detenerJuego = document.querySelector('#detener');
  const pointPlayer = document.querySelector('#judador-puntos');
  const pointConputer = document.querySelector('#computadora-puntos');
  const divPlayerCards = document.querySelector('#jugador-cartas');
  const divComputerCards = document.querySelector('#computadora-cartas');

  const types = ['C', 'D', 'H', 'S'];
  const specials = ['A', 'J', 'Q', 'K'];

  let deck = [];
  let pointsPlayer = 0;
  let pointsComputer = 0;

  const createDeck = () => {
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
    deck =  _.shuffle(deck);
    return deck;
  }
  createDeck();

  const requestDeckOfCard = () => {
    if ( !deck.length ) throw 'No hay cartas en la baraja';
    
    const card = deck[ 0 ];
    
    deck = deck.filter( element => element !== card );
    
    return card;
  }

  const valueDeckOfCard = ( card ) => {
    const value = card.substring( 0, card.length -1);

    return ( !isNaN(value) ) ? +value : ( value === "A" ) ? 11 : 10;
  }

  const paintHtml = ( request ) => {

    const img = document.createElement('img');
    img.classList.add('carta')
    img.src = `./assets/img/${request}.png`;
    img.alt = request;

    return img;
  }

  const computerShift = ( minimunPoints ) => {
    do {
      const request = requestDeckOfCard();
      pointsComputer += valueDeckOfCard( request );
      pointConputer.textContent = pointsComputer

      divComputerCards.appendChild( paintHtml( request ) );

      if ( minimunPoints > 21 ) break;
      
    } while( ( pointsComputer < minimunPoints ) && ( minimunPoints <= 21 ) );

    setTimeout(() => {
      if ( pointsComputer === minimunPoints ) return alert('Nadie Gana');
  
      if ( minimunPoints > 21 || pointsComputer <= 21 ) return alert('Gano la computadora');
      
      if ( pointsComputer > 21 ) return alert(' Gano el Jugador ');
  
    }, 50);
  }

  const clearHtml = ( element ) => {
    while( element.firstChild ) {
      element.removeChild( element.firstChild );
    }
  }

  //Eventos
  pedirCarta.addEventListener('click', () => {
    const request = requestDeckOfCard();
    pointsPlayer += valueDeckOfCard( request );
    pointPlayer.textContent = pointsPlayer;

    divPlayerCards.appendChild( paintHtml( request ) );
    if ( pointsPlayer > 21 ) {
      pedirCarta.disabled = true;
      detenerJuego.disabled = true;
      computerShift( pointsPlayer );
      return;
    }
    if ( pointsPlayer === 21 ) {
      pedirCarta.disabled = true;
      detenerJuego.disabled = true;
      computerShift( pointsPlayer );
      return  
    }
  });

  detenerJuego.addEventListener('click', () => {
    pedirCarta.disabled = true;
    detenerJuego.disabled = true;
    
    computerShift( pointsPlayer );
  });

  nuevoJuego.addEventListener('click', () => {
    deck = [];
    createDeck();

    pedirCarta.disabled = false;
    detenerJuego.disabled = false;
    
    pointsPlayer = 0;
    pointsComputer = 0;
    pointPlayer.textContent = pointsPlayer
    pointConputer.textContent = pointsComputer

    clearHtml( divComputerCards );
    clearHtml( divPlayerCards );
  });

})();