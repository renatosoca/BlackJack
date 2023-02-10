import todoStore, { Filters } from "../../store/todo";

let element;
export const renderPending = ( elementId ) => {
  if ( !element ) element = document.querySelector(elementId );
  if ( !element ) return;

  element.textContent = todoStore.getTodo( Filters.Pending ).length;
}