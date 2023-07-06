import {DisabledButtonType, SetLoadingType} from './commonActionsCreatorsTypes';
import {DISABLED_BUTTON, SET_LOADING} from './commonActionsConstants';

export const disabledButton = (isDisabled: boolean): DisabledButtonType => ({
    type: DISABLED_BUTTON,
    payload: {isDisabled}
});
export const setLoading = (isLoading: boolean): SetLoadingType => ({type: SET_LOADING, payload: {isLoading}});