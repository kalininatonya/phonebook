import {Contact} from '../../../../models/contact';

export interface ContactProps {
    contact: Contact,
    openModalDeletion: (contactId: number) => void
}