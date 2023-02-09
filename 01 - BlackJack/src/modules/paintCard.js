export const paintCard = ( request, reference ) => {
  const img = document.createElement('img');
  img.classList.add('carta')
  img.src = `./assets/img/${request}.png`;
  img.alt = request;

  reference.appendChild( img );
}