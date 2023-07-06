import {initialState, InitialState} from '../initialState';
import {
    SET_CONTACT,
    SET_CONTACTS,
    CLEAR_CONTACT,
    CHANGE_PAGE
} from '../actions/contactsActions/contactsActionsConstants';
import {ContactActionsTypes} from '../actions/contactsActions/contactsActionsCreatorsTypes';

export const contactsReducer = (state = initialState, action: ContactActionsTypes): InitialState => {
    switch (action.type) {
        case SET_CONTACT:
            return {
                ...state,
                contact: action.payload.contact
            };
        case SET_CONTACTS:
            const pages = [];
            for (let i = 1; i <= Math.ceil(action.payload.maxPage / 5); i += 1) {
                pages.push(i);
            }
            return {
                ...state,
                contacts: action.payload.contacts,
                pagination: {
                    ...state.pagination,
                    pages: [...pages]
                }
            }
        case CLEAR_CONTACT:
            return {
                ...state,
                contact: null
            };
        case CHANGE_PAGE:
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    page: action.payload.page
                }
            };
        default:
            return state;
    }
};
