import {
    SET_CONTACT,
    SET_CONTACTS,
    CLEAR_CONTACT,
    CHANGE_PAGE
} from './contactsActionsConstants';
import {Contact} from '../../models/contact';

export type SetContactsType = {
    type: typeof SET_CONTACTS,
    payload: {
        contacts: Contact[],
        maxPage: number
    }
};

export type SetContactType = {
    type: typeof SET_CONTACT,
    payload: {
        contact: Contact
    }
};

export type ClearContactType = {
    type: typeof CLEAR_CONTACT
};

export type ChangePageType = {
    type: typeof CHANGE_PAGE,
    payload: {
        page: number
    }
};

export type ContactActionsTypes = SetContactsType | SetContactType | ClearContactType | ChangePageType;