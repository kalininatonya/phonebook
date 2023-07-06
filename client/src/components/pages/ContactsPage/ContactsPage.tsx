import React from 'react';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate, useParams} from 'react-router-dom';
import cn from 'classnames';

import {FIRST_PAGE, MAX_NUMBER_OF_CONTACTS_ON_PAGE} from '../../../constants';
import {getDisabledSelector} from '../../../selectors/commonSelectors'
import {
    getContactSelector,
    getContactsSelector,
    getPaginationSelector
} from '../../../selectors/contactsSelectors';
import {getUserIdSelector} from '../../../selectors/authSelectors';
import {
    deleteContactThunkCreator,
    getContactsThunkCreator,
    getContactThunkCreator
} from '../../../middlewares/contactsMiddlewares';
import {changePage} from '../../../actions/contactsActions/contactsActionsCreators';
import {ModalConfirmation} from '../../common/modals/ModalConfirmation';
import {Contact} from './Contact/Contact';
import {Pagination} from '../../common/pagination/Pagination';
import {Contact as ContactInterface} from '../../../models/contact';
import styles from './ContactsPage.module.css';

export const ContactsPage: React.FC = () => {
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const params = useParams();
        const pageNumber = Number(params.page);
        const {page, pages} = useSelector(getPaginationSelector);
        const userId = useSelector(getUserIdSelector);
        const contact = useSelector(getContactSelector);
        const contacts = useSelector(getContactsSelector);
        const isDisabled = useSelector(getDisabledSelector);
        const [isOpen, setIsOpenModal] = useState<boolean>(false);
        const [text, setText] = useState<string>('');

        //Перемещаемся по страницам
        const navigateToPage = (page: number) => {
            navigate(`/contacts/${page}`);
            dispatch(changePage(page));
        };

        useEffect(() => {
            if (page !== pageNumber) {
                navigateToPage(pageNumber);
            }
        }, [page, pageNumber]);

        //Получение списка контактов
        useEffect(() => {
            if (userId) {
                dispatch(getContactsThunkCreator(page, userId));
            }
        }, [page]);

        const openModalDeletion = (contactId: number) => {
            if (userId) {
                dispatch(getContactThunkCreator(contactId, userId));
                setIsOpenModal(true);
            }
        };

        const closeModalDeletion = () => {
            setIsOpenModal(false);
        };

        const onDeleteContact = () => {
            if (contact && userId) {
                let newPage = page;
                //Для случая когда удаляем последний контакт с выбранной страницы.
                //Например, если находимся на 3 странице и удаляем на ней последний контакт
                if (contacts.length === 1) {
                    newPage = 1;
                }
                navigateToPage(newPage);
                dispatch(deleteContactThunkCreator(contact.id, newPage, userId));
                setIsOpenModal(false);
            }
        };

        const changeCurrentPage = (page: number) => {
            navigateToPage(page);
        };

        const onChangeInput = (value: string) => {
            setText(value);
        };

        const filterContacts = () => {
            if (userId) {
                dispatch(getContactsThunkCreator(page, userId, text));
                setText('');
            }
        };

        const onKeyDown = (code: string) => {
            if (code === 'Enter') {
                filterContacts();
            }
        };

        //Расчет стартового номера для <ol/> на каждой странице
        //Всего на каждой странице должно быть по 5 записей,
        //соответственно на первой странице нумерация начинается с 1,
        //на второй с 6 = (2(страница) * 5(количество записей на стр) - 4(записей))
        const startIndexForTheOrderedListElement = page === FIRST_PAGE ? FIRST_PAGE : (page * MAX_NUMBER_OF_CONTACTS_ON_PAGE - (MAX_NUMBER_OF_CONTACTS_ON_PAGE - FIRST_PAGE));

        return (
            <div>
                <main className={styles.mainContainer}>
                    <section className={styles.addContainer}>
                        <div className={styles.searchWrapper}>
                            <input
                                value={text}
                                autoFocus={true}
                                placeholder="Поиск"
                                className={styles.searchInput}
                                onChange={(e) => onChangeInput(e.target.value)}
                                onKeyDown={(e) => onKeyDown(e.code)}
                            />
                            <button onClick={filterContacts} className={styles.searchButton}>
                                <svg className={styles.searchIcon} width="100" height="100"
                                     viewBox="0 0 100 100"
                                     fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="45.5" cy="45.5" r="24.5" stroke="#646363" strokeWidth="6"/>
                                    <path
                                        d="M65.8939 64.5106L63.8065 62.3559L59.4972 66.5307L61.5846 68.6854L65.8939 64.5106ZM74.8453 82.3734C75.9981 83.5634 77.8974 83.5936 79.0874 82.4407C80.2774 81.2879 80.3075 79.3886 79.1547 78.1986L74.8453 82.3734ZM61.5846 68.6854L74.8453 82.3734L79.1547 78.1986L65.8939 64.5106L61.5846 68.6854Z"
                                        fill="#646363"/>
                                </svg>
                            </button>
                        </div>
                        <Link
                            id='addContact'
                            to={'/contacts/add'}
                            className={cn(styles.linkAddContact, {[styles.linkAddContactDisabled]: isDisabled})}>
                            Добавить контакт
                        </Link>
                    </section>
                    {
                        contacts.length !== 0 ?
                            <>
                                <h2 className={styles.heading}>Список контактов</h2>
                                <ol start={startIndexForTheOrderedListElement}>
                                    {
                                        contacts.map((contact: ContactInterface) => <li key={contact.id}>
                                            <Contact openModalDeletion={openModalDeletion}
                                                     contact={contact}/>
                                        </li>)
                                    }
                                </ol>
                            </> : <span className={styles.warning}>Список контактов пуст</span>

                    }
                    {
                        pages.length > FIRST_PAGE ? <Pagination
                            page={page}
                            pages={pages}
                            changeCurrentPage={changeCurrentPage}
                        /> : null
                    }
                </main>
                {
                    isOpen ?
                        <ModalConfirmation
                            closeModalDeletion={closeModalDeletion}
                            onDeleteContact={onDeleteContact}/>
                        : null
                }
            </div>
        )
    }
;