import { createTodoHtml } from "./";

let element;

export const renderTodos = ( elementId, todos = [] ) => {
  if ( !element ) element = document.querySelector( elementId );

  while( element.firstChild ) {
    element.removeChild( element.firstChild );
  }

  todos.forEach( todo => {
    element.appendChild( createTodoHtml( todo ) );
  } )
}