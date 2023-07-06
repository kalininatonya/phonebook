import {STORAGE_NAME} from '../../constants';
import {User} from '../../models/user';

//Достаем токен из localStorage
export const getUserData = () => {
    const localStorageData = localStorage.getItem(STORAGE_NAME);
    if (localStorageData) {
        return JSON.parse(localStorageData);
    }
};

//Сохраняем токен и юзера в localStorage
export const saveUserDataInLocalStorage = (token: string, user: User) => {
    localStorage.setItem(STORAGE_NAME, JSON.stringify({
        userId: user.id, token: token, login: user.login
    }))
};

//Удаляем данные из localStorage
export const removeUserDataInLocalStorage = () => {
    localStorage.removeItem(STORAGE_NAME);
};

