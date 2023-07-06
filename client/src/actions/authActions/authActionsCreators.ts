import {
    SET_USER,
    SET_USER_NAME,
    SET_AUTH,
    SET_USER_ID,
    SET_ERRORS,
    CLEAR_ERRORS
} from './authActionsConstants';
import {
    ClearErrorsType,
    SetAuthenticatedType,
    SetErrorsType,
    SetUserIdType,
    SetUserNameType,
    SetUserType
} from './authActionsCreatorsTypes';
import {User} from '../../models/user';

export const setErrors = (errors: null | string): SetErrorsType => ({type: SET_ERRORS, payload: {errors}});
export const clearErrors = (): ClearErrorsType => ({type: CLEAR_ERRORS});

export const setUser = (user: User): SetUserType => ({type: SET_USER, payload: {user}});
export const setUserName = (login: string): SetUserNameType => ({type: SET_USER_NAME, payload: {login}});
export const setUserId = (userId: number): SetUserIdType => ({type: SET_USER_ID, payload: {userId}});
export const setAuthenticated = (isAuthenticated: boolean): SetAuthenticatedType => ({
    type: SET_AUTH,
    payload: {isAuthenticated}
});
