import {createSelector} from 'reselect';
import {AppStateType} from '../store';

const getListPageSelector = (state: AppStateType) => {
    return state.listPage;
};

export const getContactSelector = createSelector(getListPageSelector, (listPage) => {
    return listPage.contact;
});

export const getContactsSelector = createSelector(getListPageSelector, (listPage) => {
    return listPage.contacts;
});

export const getPaginationSelector = createSelector(getListPageSelector, (listPage) => {
    return listPage.pagination;
});