import todoStore, { Filters } from '../store/todo';
import html from './app.html?raw'
import { renderTodos, renderPending } from './cases';

const elementIDs = {
  todoList: '.todo-list',
  newTodoInput: '#new-todo-input',
  clearCompleted: '.clear-completed',
  todofilters: '.filtro',
  todoCount: '#pending-count',
}

export const app = ( element ) => {

  const render = () => {
    const todos = todoStore.getTodo( todoStore.getCurrentFilter() );
    renderTodos( elementIDs.todoList, todos );
    updatePendingCount();
  }

  const updatePendingCount = () => {
    renderPending( elementIDs.todoCount )
  }

  (() => {
    /* const div = document.createElement('div');
    div.innerHTML = html;
    document.querySelector(element).appendChild(div); */
    document.querySelector(element).innerHTML = html;

    render( todoStore.getCurrentFilter() );
  })();

  const newDescriptionInput = document.querySelector( elementIDs.newTodoInput );
  const ulTodo = document.querySelector( elementIDs.todoList );
  const btnClearCompleted = document.querySelector( elementIDs.clearCompleted );
  const btnFilters = document.querySelectorAll( elementIDs.todofilters );

  newDescriptionInput.addEventListener( 'keyup', e => {
    if ( e.key !== 'Enter' ) return;
    if ( e.target.value.trim() === 0 ) return;

    todoStore.addTodo( e.target.value );
    e.target.value = '';

    render();
  });

  ulTodo.addEventListener('click', e => {
    const element = e.target.closest('[data-id]');
    todoStore.editTodo( element.dataset.id );
    render();
  });

  ulTodo.addEventListener('click', e => {
    const button = e.target.classList.contains('destroy');
    const element = e.target.closest('[data-id]');
    if ( !element || !button ) return;
    if ( button ) {
      todoStore.deleteTodo( element.dataset.id );
      render();
    }
  });

  btnClearCompleted.addEventListener( 'click', e => {
    todoStore.deleteCompleted();
    render();
  });

  btnFilters.forEach( element => {
    element.addEventListener('click', e => {
      e.preventDefault();

      btnFilters.forEach( filter => filter.classList.remove( 'selected' ) );
      e.target.classList.add('selected');

      switch( e.target.textContent ) {
        case 'Todos':
          todoStore.setFilter( Filters.All );
        break;
        case 'Pendientes':
          todoStore.setFilter( Filters.Pending );
        break;
        case 'Completados':
          todoStore.setFilter( Filters.Completed );
        break;
      }

      render();
    })
  });

}

export default app;