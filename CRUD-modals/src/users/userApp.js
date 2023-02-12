import { renderAddButton } from "./presentations/renderAddButton/renderAddButton";
import { renderButton } from "./presentations/renderButton/renderButton";
import { renderTable } from "./presentations/renderTable/renderTable";
import userStore from "./store/userStore";

export const userApp = async ( element ) => {

  element.innerHTML = `Loading...`;
  await userStore.loadNextPage();

  while ( element.firstChild ) {
    element.removeChild( element.firstChild );
  }

  renderTable( element );
  renderButton( element );

  renderAddButton( element );
}