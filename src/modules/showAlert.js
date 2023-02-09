export const showAlert = ( playersPoints = [] ) => {
  const [ minimunPoints, computerPoints ] = playersPoints;
  setTimeout(() => {
    if ( computerPoints === minimunPoints ) return alert('Nadie Gana');

    if ( minimunPoints > 21 || computerPoints <= 21 ) return alert('Gano la computadora');
    
    if ( computerPoints > 21 ) return alert(' Gano el Jugador ');
  }, 50);
}