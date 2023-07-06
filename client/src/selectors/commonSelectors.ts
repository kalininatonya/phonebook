import {createSelector} from 'reselect';
import {AppStateType} from '../store';

const getListPageSelector = (state: AppStateType) => {
    return state.commonPage;
};

export const getLoadingSelector = createSelector(getListPageSelector, (commonPage) => {
    return commonPage.isLoading;
});

export const getDisabledSelector = createSelector(getListPageSelector, (commonPage) => {
    return commonPage.isDisabled;
});