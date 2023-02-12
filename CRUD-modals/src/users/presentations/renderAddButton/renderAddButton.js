import './renderAddButton.css';

export const renderAddButton = ( element ) => {
  const addButton = document.createElement( "button" );
  addButton.classList.add( "addButton");
  addButton.textContent = "+";
  addButton.id = "addButton";
  element.appendChild( addButton );

  //Event
  addButton.addEventListener( "click", () => {
    const modal = document.getElementById( "modal" );
    modal.classList.remove( "hidden" );
  })
}