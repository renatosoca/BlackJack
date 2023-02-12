import { localhostUserToModel } from '../mappers/localhostUserMapper.js';
import { userModelToLocalhost } from '../mappers/userToLocalhost.mapper.js';
import { User } from '../models/User.js';

export const saveUSer = async ( userObject ) => {
  let userUpdated;

  const user = new User( userObject );
  
  if ( !user.firstName || !user.lastName ) throw 'Todos los campos son requeridos';

  const userToSave = userModelToLocalhost( user );

  if ( user.id ) {
    userUpdated = await updateUser( userToSave );
  } else {
    userUpdated = await createUser( userToSave );
  }
  
  return localhostUserToModel( userUpdated );
}

const createUser = async ( user ) => {
  const url = `${ import.meta.env.VITE_BASE_URL }/users`;

  try {
    const response = await fetch( url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( user )
    });
  
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

const updateUser = async ( user ) => {
  const url = `${ import.meta.env.VITE_BASE_URL }/users/${ user.id }`;
  
  try {
    const response = await fetch( url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( user )
    });
  
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}