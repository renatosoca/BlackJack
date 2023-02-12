
/**
 * 
 * @param {String|Number} id 
 * @returns 
 */

export const deleteUserById = async ( id ) => {
  const url = `${ import.meta.env.VITE_BASE_URL }/users/${ id }`;
  
  try {
    const response = await fetch( url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}