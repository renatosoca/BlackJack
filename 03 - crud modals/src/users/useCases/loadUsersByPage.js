import { localhostUserToModel } from "../mappers/localhostUserMapper";

export const loadUsersByPage = async ( page = 1 ) => {
  const url = `${ import.meta.env.VITE_BASE_URL }/users?_page=${ page }`;

  try {
    const response = await fetch( url );
    const result = await response.json();
    const users = result.map( localhostUserToModel );
    
    return users;
  } catch (error) {
    console.error(error);
  }
}