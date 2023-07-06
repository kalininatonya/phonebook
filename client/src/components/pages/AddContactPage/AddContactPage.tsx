import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {SubmitHandler} from 'react-hook-form';
import {addContactThunkCreator} from '../../../middlewares/contactsMiddlewares';
import {getUserIdSelector} from '../../../selectors/authSelectors';
import {ContactForm} from '../../common/forms/ContactForm/ContactForm';
import {ContactDataForm} from '../../../models/forms/contactDataForm';
import styles from './AddContactPage.module.css';

export const AddContactPage: React.FC = () => {
    const dispatch = useDispatch();
    const userId = useSelector(getUserIdSelector);
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<ContactDataForm> = (formData: ContactDataForm) => {
        const newContact = {...formData, userId};
        dispatch(addContactThunkCreator(newContact));
        navigate('/contacts/1');
    };

    return (
        <div className={styles.addContainer}>
            <h2 className={styles.heading}>ДОБАВЛЕНИЕ КОНТАКТА</h2>
            <ContactForm isEdit={false} onSubmit={onSubmit}/>
        </div>
    )
};