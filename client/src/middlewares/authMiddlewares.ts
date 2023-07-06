import axios from 'axios';
import {ThunkAction} from 'redux-thunk';
import {authAPI} from '../api/authAPI';
import {AppStateType} from '../store';
import {saveUserDataInLocalStorage} from '../helpers/userData/userData';
import {setLoading} from '../actions/commonActions/commonActionsCreators';
import {setErrors, setUser} from '../actions/authActions/authActionsCreators';
import {RegisterDataForm} from '../models/forms/registerDataForm';
import {LoginDataForm} from '../models/forms/loginDataForm';
import {CommonActionsTypes} from '../actions/commonActions/commonActionsCreatorsTypes';
import {AuthActionsTypes} from '../actions/authActions/authActionsCreatorsTypes';

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, CommonActionsTypes | AuthActionsTypes>;

export const userRegistrationThunkCreator = (newUser: RegisterDataForm): ThunkType => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const {accessToken, user} = await authAPI.register(newUser);
            dispatch(setUser(user));
            saveUserDataInLocalStorage(accessToken, user);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                dispatch(setErrors(error.response?.data || null));
                console.log(error.response?.data);
            }
        } finally {
            dispatch(setLoading(false));
        }
    }
};

export const userAuthThunkCreator = (newUser: LoginDataForm): ThunkType => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const {accessToken, user} = await authAPI.login(newUser);
            dispatch(setUser(user));
            saveUserDataInLocalStorage(accessToken, user);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                dispatch(setErrors(error.response?.data || null));
                console.log(error.response?.data);
            }
        } finally {
            dispatch(setLoading(false));
        }
    }
};
