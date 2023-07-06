import axios from 'axios';
import {AuthAPI} from './models/authAPI';
import {LoginDataForm} from '../models/forms/loginDataForm';
import {RegisterDataForm} from '../models/forms/registerDataForm';

const instance = axios.create({
    baseURL: '/api'
});

export const authAPI = {
    async login(user: LoginDataForm): Promise<AuthAPI> {
        const response = await instance.post<AuthAPI>('/login', user);
        return response.data;
    },
    async register(user: RegisterDataForm): Promise<AuthAPI> {
        const response = await instance.post<AuthAPI>('/register', user);
        return response.data;
    }
};
