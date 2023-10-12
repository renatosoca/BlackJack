
export const userModelToLocalhost = ( userObject ) => {
  const { id, isActive, balance, avatar, firstName, lastName, genter } = userObject;

  return {
    id,
    isActive,
    balance,
    avatar,
    first_name: firstName,
    last_name: lastName,
    genter
  };
}