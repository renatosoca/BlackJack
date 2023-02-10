import todoStore from '../store/todo';
import html from './app.html?raw'
import { renderTodos } from './cases/renderTodos';

const elementID = {
  todoList: '.todo-list',
  newTodoInput: '#new-todo-input',
  clearCompleted: '.clear-completed'
}

export const app = ( element ) => {

  const render = () => {
    const todos = todoStore.getTodo();
    renderTodos( elementID.todoList, todos );
  }

  (() => {
    /* const div = document.createElement('div');
    div.innerHTML = html;
    document.querySelector(element).appendChild(div); */
    document.querySelector(element).innerHTML = html;

    render( todoStore.getCurrentFilter() );
  })();

  const newDescriptionInput = document.querySelector( elementID.newTodoInput );
  const ulTodo = document.querySelector( elementID.todoList );
  const btnClearCompleted = document.querySelector( elementID.clearCompleted );

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

}

export default app;