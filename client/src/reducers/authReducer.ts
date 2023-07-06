import {initialState, InitialState} from '../initialState';
import {
    SET_ERRORS,
    SET_USER,
    SET_AUTH,
    SET_USER_NAME,
    SET_USER_ID,
    CLEAR_ERRORS
} from '../actions/authActions/authActionsConstants';
import {AuthActionsTypes} from '../actions/authActions/authActionsCreatorsTypes';

export const authReducer = (state = initialState, action: AuthActionsTypes): InitialState => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload.user
            }
        case SET_USER_NAME:
            return {
                ...state,
                userName: action.payload.login
            }
        case SET_USER_ID:
            return {
                ...state,
                userId: action.payload.userId
            }
        case SET_AUTH:
            return {
                ...state,
                isAuthenticated: action.payload.isAuthenticated
            }
        case SET_ERRORS:
            return {
                ...state,
                errors: action.payload.errors
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                errors: null
            }
        default:
            return state;
    }
};
