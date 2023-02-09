export const valueCard = ( card ) => {
  const value = card.substring( 0, card.length -1);

  return ( !isNaN(value) ) ? +value : ( value === "A" ) ? 11 : 10;
}