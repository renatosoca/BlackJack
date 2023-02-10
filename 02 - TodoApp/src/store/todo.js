import { Todo } from "../todo/models/todo";

export const Filters = {
  All: 'all',
  Pending: 'pending',
  Completed: 'completed'
}

const state = {
  todos: [
    new Todo('Piedrasss'),
    new Todo('Piedrasss 2'),
    new Todo('Piedrasss 3'),
    new Todo('Piedrasss 4'),
    new Todo('Piedrasss 5'),
  ],
  filter: Filters.All,
}

const initStore = () => {
  loadStore();
  console.log('init store ');
}

const loadStore = () => {
  if ( !localStorage.getItem( 'state' ) ) return;
  
  const { todos = [], filter = Filters.All } = JSON.parse( localStorage.getItem( 'state' ) );
  state.todos = todos;
  state.filter = filter;
}

const saveStateToLocalStore = () => {
  localStorage.setItem('state', JSON.stringify( state ));
}

const getTodo = ( filter = Filters.All ) => {
  switch (filter) {
    case Filters.All:
      return [...state.todos];
    case Filters.Completed:
      return state.todos.filter( todo => todo.done );
    case Filters.Pending:
      return state.todos.filter( todo => !todo.done );
    default:
      throw new Error(`Opcion ${ filter } no Permitida`);
  }
}

const addTodo = ( description ) => {
  state.todos.push( new Todo( description ) );
  saveStateToLocalStore();
}

const editTodo = ( id ) => {
  state.todos = state.todos.map( todo => {
    if ( todo.id === id ) {
      todo.done = !todo.done;
    }
    return todo;
  });
  saveStateToLocalStore();
}

const deleteTodo = ( id ) => {
  state.todos = state.todos.filter( todo => todo.id !== id );
  saveStateToLocalStore();
}

const deleteCompleted = () => {
  state.todos = state.todos.filter( todo => !todo.done );
  saveStateToLocalStore();
}

const setFilter = ( newFilter = Filters.All ) => {
  state.filter = newFilter;
  saveStateToLocalStore();
}

const getCurrentFilter = () => {
  return state.filter;
}

export default { 
  initStore,
  loadStore,
  saveStateToLocalStore,
  getTodo,
  addTodo,
  editTodo,
  deleteTodo,
  deleteCompleted,
  setFilter,
  getCurrentFilter,
} ;