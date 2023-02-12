import { localhostUserToModel } from "../mappers/localhostUserMapper";

export const getUserById = async ( id ) => {
  const url = `${ import.meta.env.VITE_BASE_URL }/users/${ id }`;

  try {
    const response = await fetch( url );
    const result = await response.json();
    const users = localhostUserToModel( result );
    
    return users;
  } catch (error) {
    console.error(error);
  }
}