import React from 'react';
import styles from './NotAuthorizedPage.module.css';

export const NotAuthorizedPage: React.FC = () => {
        return (
            <div className={styles.authWarning}>Для работы в системе необходимо авторизоваться</div>
        )
    }
;