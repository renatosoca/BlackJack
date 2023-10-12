import { renderAddButton } from "./presentations/renderAddButton/renderAddButton";
import { renderButton } from "./presentations/renderButton/renderButton";
import { renderModal } from "./presentations/renderModal/renderModal";
import { renderTable } from "./presentations/renderTable/renderTable";
import userStore from "./store/userStore";
import { saveUSer } from "./useCases/saveUser";

export const userApp = async ( element ) => {

  element.innerHTML = `Loading...`;
  await userStore.loadNextPage();

  while ( element.firstChild ) {
    element.removeChild( element.firstChild );
  }

  renderTable( element );
  renderButton( element );

  renderAddButton( element );
  renderModal( element, async ( userObject ) => {
    const user = await saveUSer( userObject );
    userStore.onChangeUser( user );
    renderTable();
  } );
}