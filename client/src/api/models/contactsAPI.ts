import {Contact} from '../../models/contact';

export interface ContactsAPI {
    contacts: Contact[],
    maxPage: number
}