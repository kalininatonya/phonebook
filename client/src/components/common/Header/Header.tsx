import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {getUserNameSelector} from '../../../selectors/authSelectors';
import {HeaderProps} from './models/headerProps';
import styles from './Header.module.css';

export const Header: React.FC<HeaderProps> = ({isAuthenticated, logoutHandler}) => {
    const userName = useSelector(getUserNameSelector);

    return (
        <header className={styles.header}>
            <div className={styles.headerWrapper}>
                <div>Контакты</div>
                {
                    isAuthenticated &&
                    <div className={styles.authenticated}>
                        <div>{userName}</div>
                        <Link
                            onClick={logoutHandler}
                            className={styles.authLink}
                            to='/not-authorized'>
                            Выход
                        </Link>
                    </div>
                }
                {
                    !isAuthenticated && <div>
                        <nav>
                            <Link
                                className={styles.authLink}
                                to='/auth/register'>
                                Регистрация
                            </Link>
                            <Link
                                className={styles.authLink}
                                to='/auth/login'>
                                Войти
                            </Link>
                        </nav>
                    </div>
                }
            </div>
        </header>
    )
};