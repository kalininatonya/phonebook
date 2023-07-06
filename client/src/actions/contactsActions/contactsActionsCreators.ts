import {
    SET_CONTACT,
    SET_CONTACTS,
    CLEAR_CONTACT,
    CHANGE_PAGE
} from './contactsActionsConstants';
import {
    ChangePageType,
    ClearContactType,
    SetContactsType,
    SetContactType
} from './contactsActionsCreatorsTypes';
import {Contact} from '../../models/contact';

export const setContacts = (contacts: Contact[], maxPage: number): SetContactsType => ({
    type: SET_CONTACTS,
    payload: {contacts, maxPage}
});
export const setContact = (contact: Contact): SetContactType => ({type: SET_CONTACT, payload: {contact}});
export const clearContact = (): ClearContactType => ({type: CLEAR_CONTACT});

export const changePage = (page: number): ChangePageType => ({type: CHANGE_PAGE, payload: {page}});

