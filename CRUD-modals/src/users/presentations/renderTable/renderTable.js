import userStore from '../../store/userStore';
import { deleteUserById } from '../../useCases/deleteUserById';
import { showModal } from '../renderModal/renderModal';
import './renderTable.css';

let table;

const createTable = () => {
  const table = document.createElement( 'table' );

  const tableHead = document.createElement( 'thead' );
  tableHead.innerHTML = `
    <tr>
      <th>ID</th>
      <th>Balance</th>
      <th>Nombre</th>
      <th>Apellido</th>
      <th>Activo</th>
      <th>Acciones</th>
    </tr>
  `;

  const tableBody = document.createElement( 'tbody' );

  table.append( tableHead, tableBody );
  return table;
}

const userSelectListener = ( e ) => {
  const btnEdit = e.target.closest( '.select_user' );
  if ( !btnEdit ) return;
  
  const id = btnEdit.dataset.id;
  showModal(id);
}

const userDeleteListener = async ( e ) => {
  const btnDelete = e.target.closest( '.delete_user' );
  if ( !btnDelete ) return;
  
  const id = btnDelete.dataset.id;
  try {
    await deleteUserById( id );
    await userStore.reloadPage();
    document.querySelector('#currentPages').textContent = userStore.getCurrentPage();
    renderTable();
  } catch (error) {
    console.error(error);
  }
}

export const renderTable = ( element ) => {
  const users = userStore.getUsers();
  
  if ( !table ) {
    table = createTable();
    element.appendChild( table );
    
    table.addEventListener( 'click', userSelectListener )
    table.addEventListener( 'click', userDeleteListener )
  }

  const tableBody = table.querySelector( 'tbody' );
  
  while ( tableBody.firstChild ) {
    tableBody.removeChild( tableBody.firstChild );
  }

  users.forEach( user => {
    const { id, balance, isActive, firstName, lastName  } = user;
    
    const row = document.createElement( 'tr' );
    row.innerHTML = `
      <td>${ id }</td>
      <td>${ balance }</td>
      <td>${ firstName }</td>
      <td>${ lastName }</td>
      <td>${ isActive ? 'Si' : 'No' }</td>
      <td>
        <button class="btn select_user" data-id="${ id }" >Editar</button>
        <button class="btn delete_user" data-id="${ id }" >Eliminar</button>
      </td>
    `;
    tableBody.appendChild( row );
  })
}