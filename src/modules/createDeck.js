import { shuffle } from "underscore";
//Crear el Mazo
export const createDeck = ( types, specials ) => {
  let deck = [];
  
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
  return shuffle(deck);
}