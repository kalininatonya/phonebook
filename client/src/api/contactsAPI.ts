import axios from 'axios';
import {registerInterceptors} from './interceptors';
import {Contact} from '../models/contact';
import {ContactsAPI} from './models/contactsAPI';
import {ContactDataForm} from '../models/forms/contactDataForm';

const instance = axios.create({
    baseURL: '/api'
});

//Регистрируем интерсепторы-мидлвара которая добавляет токен авторизации в headers
registerInterceptors(instance);

export const contactsAPI = {
    async getContacts(page: number, userId: number, text?: string): Promise<ContactsAPI> {
        const value = text ? '&q=' + text : '';
        const response = await instance.get<Contact[]>(`/contacts?_page=${page}&userId=${userId}&_limit=5${value}`);
        return {contacts: response.data, maxPage: Number(response.headers['x-total-count'])};
    },

    async getContact(contactId: number, userId: number): Promise<Contact> {
        const response = await instance.get<Contact>(`/contacts/${contactId}?userId=${userId}`);
        return response.data;
    },

    async addContact(newContact: ContactDataForm): Promise<Contact> {
        const response = await instance.post<Contact>('/contacts', newContact);
        return response.data;
    },

    async editContact(newContact: Contact): Promise<Contact> {
        const response = await instance.put<Contact>(`/contacts/${newContact.id}`, newContact);
        return response.data;
    },

    async deleteContact(contactId: number): Promise<Contact> {
        const response = await instance.delete<Contact>(`/contacts/${contactId}`);
        return response.data;
    }
};
