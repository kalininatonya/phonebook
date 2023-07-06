import {createSelector} from 'reselect';
import {AppStateType} from '../store';

const getAuthPageSelector = (state: AppStateType) => {
    return state.authPage;
};

export const getAuthenticatedSelector = createSelector(getAuthPageSelector, (authPage) => {
    return authPage.isAuthenticated;
});

export const getUserNameSelector = createSelector(getAuthPageSelector, (authPage) => {
    return authPage.userName;
});

export const getUserIdSelector = createSelector(getAuthPageSelector, (authPage) => {
    return authPage.userId;
});

export const getErrorsSelector = createSelector(getAuthPageSelector, (authPage) => {
    return authPage.errors;
});
