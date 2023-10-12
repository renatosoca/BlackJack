import { getUserById } from "../../useCases/getUserById";
import modalHtml from "./renderModal.html?raw";
import "./renderModal.css";

let modal, form;
let loadedUser = {};

export const showModal = async ( id ) => {
  modal?.classList.remove( 'hide_modal' );
  if ( !id ) return;

  const user = await getUserById( id );
  setFormValues( user );
}

export const hideModal = () => {
  modal?.classList.add( 'hide_modal' );
  form?.reset();
}

const setFormValues = ( user ) => {
  form.querySelector( "[ name='firstName' ]" ).value = user.firstName;
  form.querySelector( "[ name='lastName' ]" ).value = user.lastName;
  form.querySelector( "[ name='balance' ]" ).value = user.balance;
  form.querySelector( "[ name='isActive' ]" ).checked = user.isActive;
  loadedUser = user;
}

export const renderModal = ( element, callback ) => {
  if ( modal ) return;

  modal = document.createElement( "div" );
  modal.classList.add( "modal_container", "hide_modal" );
  modal.innerHTML = modalHtml;

  form = modal.querySelector( "form" );

  element.appendChild( modal );

  //Event
  modal.addEventListener('click', e => {
    if ( e.target.classList.contains('modal_container') ) return hideModal();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData( form );
    const userObject = { ...loadedUser };
    
    for (const [ key, value ] of formData) {
      if ( key === 'balance' ) {
        userObject[key] = +value;
        continue;
      }

      if ( key === 'isActive' ) {
        userObject[key] = ( value === 'on' ) ? true : false;
        continue;
      }

      userObject[key] = value;
    }

    await callback( userObject )

    hideModal();
  });
}