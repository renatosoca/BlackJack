(() => {
  /* 
    2C = Two of Clubs
    2D = Two of Diamont
    2H = Two of Hearts
    2S = Two of Spades
  */

    let deck = [];
    const types = ['C', 'D', 'H', 'S'];
    const specials = ['A', 'J', 'Q', 'K'];

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
      console.log(deck);
    }
    requestDeckOfCard();
})();