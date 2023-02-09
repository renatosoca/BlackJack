import { accumulatePoints, newDeck, paintCard, requestCard, showAlert } from './';

export const computerTurn = ( deck = [], playersPoints = [] , spanComputerPoints, divComputerCards, minimunPoints ) => {
  let computerPoints;
  do {
    const card = requestCard( deck );
    deck = newDeck( card, deck );
    computerPoints = accumulatePoints( playersPoints , playersPoints.length - 1, card, spanComputerPoints );

    paintCard( card, divComputerCards );

    if ( minimunPoints > 21 ) break;
    
  } while( ( computerPoints < minimunPoints ) && ( minimunPoints <= 21 ) );

  showAlert( playersPoints );
}