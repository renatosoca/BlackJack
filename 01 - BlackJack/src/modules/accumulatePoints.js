import { valueCard } from "./";

export const accumulatePoints = ( playersPoints = [], turn, card, spanPlayer ) => {
  playersPoints[ turn ] += valueCard( card );
  spanPlayer.textContent = playersPoints[ turn ];
  return playersPoints[ turn ];
}