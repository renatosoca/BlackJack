import userStore from '../../store/userStore';
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

export const renderTable = ( element ) => {
  const users = userStore.getUsers();
  
  if ( !table ) {
    table = createTable();
    element.appendChild( table );
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
        <button class="btn" data-id="${ id }" >Editar</button>
        <button class="btn" data-id="${ id }" >Eliminar</button>
      </td>
    `;
    tableBody.appendChild( row );
  })
}