import { loadUsersByPage } from "../useCases/loadUsersByPage";


const state = {
  users: [],
  currentPages: 0,
}

const loadNextPage = async () => {
  const users = await loadUsersByPage( state.currentPages + 1 );
  if ( users.length === 0 ) return;

  state.currentPages++;
  state.users = users;
}

const loadPreviousPage = async () => {
  if ( state.currentPages <= 1 ) return;

  const users = await loadUsersByPage( state.currentPages - 1 );

  state.currentPages--;
  state.users = users;
}

const onChangeUser = async ( user ) => {
}

const reloadPage = async () => {
}

export default {
  loadNextPage,
  loadPreviousPage,
  onChangeUser,
  reloadPage,

  getUsers: () => [...state.users],
  getCurrentPage: () => state.currentPages,
}