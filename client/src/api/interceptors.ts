import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {STORAGE_NAME} from '../constants';

//Перед отправкой запроса на сервер, будет вызван интерцептор и добавит к headers доп header c токеном
const addAuthToken = (request: AxiosRequestConfig) => {
    const localStorageData = localStorage.getItem(STORAGE_NAME);
    if(localStorageData) {
        const data = JSON.parse(localStorageData);
        if (data && data.token) {
            request.headers = {...request.headers, Authorization: `Bearer ${data.token}`}
        }
    }
    return request;
};

//Если вернется статус код 401 то произойдет редирект на стр авторизации
const notAuthorizedError = (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
        localStorage.removeItem(STORAGE_NAME);
        window.location.href = '/auth/login';
    }
}

//Регистрация interceptors
export const registerInterceptors = (instance: AxiosInstance) => {
    instance.interceptors.request.use(addAuthToken);
    instance.interceptors.response.use(undefined, notAuthorizedError);
}
