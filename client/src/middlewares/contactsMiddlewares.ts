import {ThunkAction} from 'redux-thunk';
import {AppStateType} from '../store';
import {contactsAPI} from '../api/contactsAPI';
import {disabledButton, setLoading} from '../actions/commonActions/commonActionsCreators';
import {clearContact, setContact, setContacts} from '../actions/contactsActions/contactsActionsCreators';
import {CommonActionsTypes} from '../actions/commonActions/commonActionsCreatorsTypes';
import {ContactActionsTypes} from '../actions/contactsActions/contactsActionsCreatorsTypes';
import {Contact} from '../models/contact';
import {ContactDataForm} from '../models/forms/contactDataForm';

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, CommonActionsTypes | ContactActionsTypes>;

export const getContactsThunkCreator = (page: number, userId: number, text?: string): ThunkType => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const {contacts, maxPage} = await contactsAPI.getContacts(page, userId, text);
            dispatch(setContacts(contacts, maxPage));
        } finally {
            dispatch(setLoading(false));
        }
    }
};

export const addContactThunkCreator = (contact: ContactDataForm): ThunkType => {
    return async (dispatch) => {
        dispatch(disabledButton(true));
        dispatch(setLoading(true));
        try {
            await contactsAPI.addContact(contact);
        } finally {
            dispatch(clearContact());
            dispatch(setLoading(false));
            dispatch(disabledButton(false));
        }
    }
};

export const editContactThunkCreator = (contact: Contact): ThunkType => {
    return async (dispatch) => {
        dispatch(disabledButton(true));
        dispatch(setLoading(true));
        try {
            await contactsAPI.editContact(contact);
        } finally {
            dispatch(clearContact());
            dispatch(setLoading(false));
            dispatch(disabledButton(false));
        }
    }
};

export const deleteContactThunkCreator = (contactId: number, page: number, userId: number): ThunkType => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            await contactsAPI.deleteContact(contactId);
            const {contacts, maxPage} = await contactsAPI.getContacts(page, userId);
            dispatch(setContacts(contacts, maxPage));
        } finally {
            dispatch(clearContact());
            dispatch(setLoading(false));
        }
    }
};

export const getContactThunkCreator = (contactId: number, userId: number): ThunkType => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const contact = await contactsAPI.getContact(contactId, userId);
            dispatch(setContact(contact));
        } finally {
            dispatch(setLoading(false));
        }
    }
};


