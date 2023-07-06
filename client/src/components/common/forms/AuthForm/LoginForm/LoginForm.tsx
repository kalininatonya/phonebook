import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {useForm, SubmitHandler} from 'react-hook-form';
import {required} from '../../../../../helpers/validators/validators';
import {userAuthThunkCreator} from '../../../../../middlewares/authMiddlewares';
import {getErrorsSelector} from '../../../../../selectors/authSelectors';
import {clearErrors} from '../../../../../actions/authActions/authActionsCreators';
import {LoginDataForm} from '../../../../../models/forms/loginDataForm';
import styles from './LoginForm.module.css';

export const LoginForm: React.FC = () => {
    const dispatch = useDispatch();
    const messages = useSelector(getErrorsSelector);
    const navigate = useNavigate();
    const {
        formState: {errors},
        register,
        handleSubmit,
    } = useForm<LoginDataForm>();

    const onSubmit: SubmitHandler<LoginDataForm> = (formData: LoginDataForm) => {
        dispatch(userAuthThunkCreator(formData));
        if (messages) {
            navigate('/contacts/1');
        }
    };

    const onClearErrors = () => {
        dispatch(clearErrors());
    };

    return (
        <div>
            <h2 className={styles.heading}>ВХОД В СИСТЕМУ</h2>
            <form
                className={styles.formContainer}
                onChange={onClearErrors}
                onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputWrapper}>
                    <label htmlFor='email' className={styles.labelForInput}>
                        Введите email:
                    </label>
                    <input
                        id='email'
                        type='email'
                        placeholder='email'
                        autoFocus={true}
                        className={styles.login}
                        {...register('email', {
                            validate: {required}
                        })}
                    />
                </div>
                {<div className={styles.errorText}>{errors?.email?.message}</div>}
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
                            validate: {required}
                        })}
                    />
                </div>
                {<div className={styles.errorText}>{errors?.password?.message}</div>}
                {messages && <div className={styles.generalErrorText}>{messages}</div>}
                <div className={styles.btnContainer}>
                    <button
                        type='submit'
                        className={styles.btnSave}>
                        Войти
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