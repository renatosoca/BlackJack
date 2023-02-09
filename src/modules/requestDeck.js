//Pedir la Carta
export const requestCard = ( deck = [] ) => {
  if ( !deck.length ) throw 'No hay cartas en la baraja';

  return deck[0];
}