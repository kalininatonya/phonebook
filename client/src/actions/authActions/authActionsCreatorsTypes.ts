import {
    SET_USER,
    SET_USER_NAME,
    SET_AUTH,
    SET_USER_ID,
    SET_ERRORS,
    CLEAR_ERRORS
} from './authActionsConstants';
import {User} from '../../models/user';

export type SetErrorsType = {
    type: typeof SET_ERRORS,
    payload: {
        errors: null | string
    }
};

export type ClearErrorsType = {
    type: typeof CLEAR_ERRORS
};

export type SetUserType = {
    type: typeof SET_USER,
    payload: {
        user: User
    }
};

export type SetUserNameType = {
    type: typeof SET_USER_NAME,
    payload: {
        login: string
    }
};

export type SetUserIdType = {
    type: typeof SET_USER_ID,
    payload: {
        userId: number
    }
};

export type SetAuthenticatedType = {
    type: typeof SET_AUTH,
    payload: {
        isAuthenticated: boolean
    }
};

export type AuthActionsTypes = SetUserType | SetUserNameType | SetUserIdType | SetAuthenticatedType | SetErrorsType | ClearErrorsType;