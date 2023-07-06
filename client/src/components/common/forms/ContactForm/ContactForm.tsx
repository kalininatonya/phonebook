import React from 'react';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import cn from 'classnames';
import {maxLengthCreator, required, validationTelephone} from '../../../../helpers/validators/validators';
import {clearContact} from '../../../../actions/contactsActions/contactsActionsCreators';
import {Contact} from '../../../../models/contact';
import {ContactDataForm} from '../../../../models/forms/contactDataForm';
import styles from './ContactForm.module.css';

const maxLength30 = maxLengthCreator(30);

type PropsType = {
    isEdit: boolean,
    onSubmit: (dataForm: ContactDataForm) => void,
    contact?: null | Contact
};

export const ContactForm: React.FC<PropsType> = ({isEdit, onSubmit, contact}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isReset, setIsReset] = useState(false);

    const {
        register,
        formState: {errors},
        handleSubmit,
        reset
    } = useForm<ContactDataForm>();

    //Для сброса в дефолтные значения
    useEffect(() => {
        if (isEdit && !isReset && contact) {
            setIsReset(true);
            reset(contact);
        }
    });

    const clearContactInState = () => {
        dispatch(clearContact());
        navigate('/contacts/1');
    };

    return (
        <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input
                    type='text'
                    autoFocus={true}
                    placeholder='Имя'
                    className={cn(styles.name, {[styles.errorForInput]: errors.name})}
                    {...register('name', {validate: {maxLength: maxLength30, required}})}
                />
                {<div className={styles.errorText}>{errors.name?.message}</div>}
            </div>
            <div>
                <input
                    type='text'
                    placeholder='Фамилия'
                    className={cn(styles.surname, {[styles.errorForInput]: errors.surname})}
                    {...register('surname', {validate: {maxLength: maxLength30, required}})}
                />
                {<div className={styles.errorText}>{errors.surname?.message}</div>}
            </div>
            <div>
                <input
                    type='tel'
                    placeholder='Номер телефона'
                    className={cn(styles.telephone, {[styles.errorForInput]: errors.telephone})}
                    {...register('telephone', {validate: {validationTelephone, required}})}
                />
                {<div className={styles.errorText}>{errors.telephone?.message}</div>}
            </div>
            <div>
                <textarea
                    rows={5}
                    cols={45}
                    placeholder='О себе'
                    className={styles.description}
                    {...register('description',)}
                />
            </div>
            <div className={styles.btnContainer}>
                <button
                    type='submit'
                    className={styles.btnSave}>
                    {isEdit ? 'Сохранить' : 'Добавить'}
                </button>
                <button
                    type='button'
                    className={styles.btnCancel}
                    onClick={clearContactInState}>
                    Вернуться на главную
                </button>
            </div>
        </form>
    );
};
