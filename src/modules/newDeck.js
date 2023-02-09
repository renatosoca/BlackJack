//Nuevo Mazo, despues de pedir cartas
export const newDeck = ( card, deck ) => {
  deck = deck.filter( element => element !== card );

  return deck;
}