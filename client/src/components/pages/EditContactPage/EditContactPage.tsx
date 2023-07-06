import React from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {SubmitHandler} from 'react-hook-form';
import {getContactSelector} from '../../../selectors/contactsSelectors';
import {getUserIdSelector} from '../../../selectors/authSelectors';
import {editContactThunkCreator, getContactThunkCreator} from '../../../middlewares/contactsMiddlewares';
import {ContactForm} from '../../common/forms/ContactForm/ContactForm';
import {ContactDataForm} from '../../../models/forms/contactDataForm';
import styles from './EditContactPage.module.css';

export const EditContactPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const contactId = Number(params.id);
    const contact = useSelector(getContactSelector);
    const userId = useSelector(getUserIdSelector);

    useEffect(() => {
        if (userId) {
            dispatch(getContactThunkCreator(contactId, userId));
        }
    }, [contactId]);

    const onSubmit: SubmitHandler<ContactDataForm> = (formData: ContactDataForm) => {
        if (contact) {
            const newContact = {...contact, ...formData}
            dispatch(editContactThunkCreator(newContact));
            navigate('/contacts/1');
        }
    }

    return (
        <div className={styles.editContainer}>
            <h2 className={styles.heading}>РЕДАКТИРОВАНИЕ КОНТАКТА</h2>
            <ContactForm isEdit={true} onSubmit={onSubmit} contact={contact}/>
        </div>
    )
};
