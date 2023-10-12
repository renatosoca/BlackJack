import userStore from '../../store/userStore';
import { renderTable } from '../renderTable/renderTable';
import './renderButton.css';

export const renderButton = ( element ) => {
  const buttonContainer = document.createElement( "div" );
  buttonContainer.classList.add( "buttonContainer");

  const previewButton = document.createElement( "button" );
  previewButton.textContent = "< Preview";

  const currentPages = document.createElement( "span" );
  currentPages.textContent = userStore.getCurrentPage();
  currentPages.id = "currentPages";

  const nextButton = document.createElement( "button" );
  nextButton.textContent = "Next >";

  //Events
  previewButton.addEventListener( "click", async () => {
    await userStore.loadPreviousPage();
    currentPages.textContent = userStore.getCurrentPage();
    renderTable( element );
  });

  nextButton.addEventListener( "click", async () => {
    await userStore.loadNextPage();
    currentPages.textContent = userStore.getCurrentPage();
    renderTable( element );
  });

  buttonContainer.append( previewButton, currentPages, nextButton );
  element.appendChild( buttonContainer );
}