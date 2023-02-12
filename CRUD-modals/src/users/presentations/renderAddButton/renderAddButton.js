import { showModal } from '../renderModal/renderModal';
import './renderAddButton.css';

export const renderAddButton = ( element ) => {
  const addButton = document.createElement( "button" );
  addButton.classList.add( "addButton");
  addButton.textContent = "+";
  addButton.id = "addButton";
  element.appendChild( addButton );

  //Event
  addButton.addEventListener( "click", (e) => {
    showModal();
  });
}