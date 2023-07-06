import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {SubmitHandler, useForm} from 'react-hook-form';
import {minLengthCreator, required} from '../../../../../helpers/validators/validators';
import {userRegistrationThunkCreator} from '../../../../../middlewares/authMiddlewares';
import {clearErrors} from '../../../../../actions/authActions/authActionsCreators';
import {getErrorsSelector} from '../../../../../selectors/authSelectors';
import {RegisterDataForm} from '../../../../../models/forms/registerDataForm';
import styles from './RegisterForm.module.css';

const minLength4 = minLengthCreator(4);

export const RegisterForm: React.FC = () => {
    const messages = useSelector(getErrorsSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        formState: {errors},
        register,
        handleSubmit,
    } = useForm<RegisterDataForm>();

    const onSubmit: SubmitHandler<RegisterDataForm> = (formData: RegisterDataForm) => {
        dispatch(userRegistrationThunkCreator(formData));
        if (messages) {
            navigate('/contacts/1');
        }
    };

    const onClearErrors = () => {
        dispatch(clearErrors());
    };

    return (
        <div>
            <h2 className={styles.heading}>РЕГИСТРАЦИЯ</h2>
            <form
                className={styles.formContainer}
                onChange={onClearErrors}
                onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputWrapper}>
                    <label htmlFor='login' className={styles.labelForInput}>
                        Введите логин:
                    </label>
                    <input
                        id='login'
                        type='text'
                        placeholder='Логин'
                        autoFocus={true}
                        className={styles.login}
                        {...register('login', {
                            validate: {required}
                        })}
                    />
                </div>
                {<div className={styles.errorText}>{errors.login?.message}</div>}
                <div className={styles.inputWrapper}>
                    <label htmlFor='email' className={styles.labelForInput}>
                        Введите email:
                    </label>
                    <input
                        id='email'
                        type='email'
                        placeholder='email'
                        className={styles.login}
                        {...register('email', {
                            validate: {required}
                        })}
                    />
                </div>
                {<div className={styles.errorText}>{errors.email?.message}</div>}
                <div className={styles.inputWrapper}>
                    <label htmlFor='password' className={styles.labelForInput}>
                        Введите пароль:
                    </label>
                    <input
                        id='password'
                        type='password'
                        placeholder='Пароль'
                        className={styles.password}
                        {...register('password', {
                            validate: {required, minLength4}
                        })}
                    />
                </div>
                {<div className={styles.errorText}>{errors.password?.message}</div>}
                {messages && <div className={styles.generalErrorText}>{messages}</div>}
                <div className={styles.btnContainer}>
                    <button
                        type='submit'
                        className={styles.btnSave}>
                        Зарегистрироваться
                    </button>
                    <Link
                        to={'/not-authorized'}
                        className={styles.btnCancel}
                        onClick={onClearErrors}>
                        Отмена
                    </Link>
                </div>
            </form>
        </div>
    )
};