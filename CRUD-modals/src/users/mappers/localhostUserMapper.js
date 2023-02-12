import { User } from "../models/User"

export const localhostUserToModel = ( localhostUser ) => {
  const { id, isActive, balance, avatar, first_name, last_name, genter } = localhostUser;
  
  return new User( {
    id,
    isActive,
    balance,
    avatar,
    firstName: first_name,
    lastName: last_name,
    genter
  } );
}