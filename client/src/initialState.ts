import {User} from './models/user';
import {Contact} from './models/contact';
import {Pagination} from './models/pagination';

export interface InitialState {
    user: null | User,
    userName: string,
    userId: null | number,
    isAuthenticated: boolean,
    contacts: Contact[],
    errors: null | string,
    contact: null | Contact,
    isDisabled: boolean,
    isLoading: boolean,
    pagination: Pagination
}

export const initialState: InitialState = {
    user: null,
    userName: '',
    userId: null,
    isAuthenticated: false,
    contacts: [],
    errors: null,
    //Для страницы просмотра/редактирования/удаления определенного контакта
    contact: null,
    //Для дизейбла кнопок добавить/сохранить
    isDisabled: false,
    //Для loader
    isLoading: false,
    //Для пагинации
    pagination: {
        page: 1, //Страница, по умолчанию первая
        pages: [], //Массив из всех страниц
    }
};
