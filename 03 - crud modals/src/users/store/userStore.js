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

/**
 * 
 * @param {User} user 
 */
const onChangeUser = async ( userUpdated ) => {
  let wasFound = false;

  state.users = state.users.map( user => {
    if ( user.id === userUpdated.id ) {
      wasFound = true;
      return userUpdated;
    }
    return user;
  });

  if ( state.users.length < 10 && !wasFound ) {
    state.users.push( userUpdated );
  }
}

const reloadPage = async () => {
  const users = await loadUsersByPage( state.currentPages );
  if ( users.length === 0 ){
    await loadPreviousPage();
    return
  }

  state.users = users;
}

export default {
  loadNextPage,
  loadPreviousPage,
  onChangeUser,
  reloadPage,

  getUsers: () => [...state.users],
  getCurrentPage: () => state.currentPages,
}