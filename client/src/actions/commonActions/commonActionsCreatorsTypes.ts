import {DISABLED_BUTTON, SET_LOADING} from './commonActionsConstants';

export type DisabledButtonType = {
    type: typeof DISABLED_BUTTON,
    payload: {
        isDisabled: boolean
    }
};

export type SetLoadingType = {
    type: typeof SET_LOADING,
    payload: {
        isLoading: boolean
    }
};

export type CommonActionsTypes = SetLoadingType | DisabledButtonType;