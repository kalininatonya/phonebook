import React from 'react';
import {ModalConfirmationProps} from './models/modalConfirmationProps';
import styles from './ModalConfirmation.module.css';

export const ModalConfirmation: React.FC<ModalConfirmationProps> = ({onDeleteContact, closeModalDeletion}) => {
    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalOverlay}/>
            <div className={styles.modalContent}>
                <h2>Подтверждение</h2>
                <button
                    type='button'
                    className={styles.modalIconClose}
                    onClick={closeModalDeletion}/>
                <div className={styles.modalText}>
                    Вы действительно хотите удалить контакт?
                </div>
                <div>
                    <button
                        type='button'
                        className={styles.btnSave}
                        onClick={onDeleteContact}>
                        Удалить
                    </button>
                    <button
                        type='button'
                        className={styles.btnClose}
                        onClick={closeModalDeletion}>
                        Отмена
                    </button>
                </div>
            </div>
        </div>
    );
};
