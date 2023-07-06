import {initialState, InitialState} from '../initialState';
import {DISABLED_BUTTON, SET_LOADING} from '../actions/commonActions/commonActionsConstants';
import {CommonActionsTypes} from '../actions/commonActions/commonActionsCreatorsTypes';

export const commonReducer = (state = initialState, action: CommonActionsTypes): InitialState => {
    switch (action.type) {
        case DISABLED_BUTTON:
            return {
                ...state,
                isDisabled: action.payload.isDisabled
            }
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.payload.isLoading
            };
        default:
            return state;
    }
};
