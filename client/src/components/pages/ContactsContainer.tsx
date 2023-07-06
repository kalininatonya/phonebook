import React from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import {sizes} from '../../constants';
import {getUserData, removeUserDataInLocalStorage} from '../../helpers/userData/userData';
import {setAuthenticated, setUserId, setUserName} from '../../actions/authActions/authActionsCreators';
import {getLoadingSelector} from '../../selectors/commonSelectors';
import {getAuthenticatedSelector} from '../../selectors/authSelectors';
import {Loader} from '../common/Loader/Loader';
import {Header} from '../common/Header/Header';
import {LoginForm} from '../common/forms/AuthForm/LoginForm/LoginForm';
import {RegisterForm} from '../common/forms/AuthForm/RegisterForm/RegisterForm';
import {NotAuthorizedPage} from './NotAuthorizedPage/NotAuthorizedPage';
import {ContactsPage} from './ContactsPage/ContactsPage';
import {AddContactPage} from './AddContactPage/AddContactPage';
import {EditContactPage} from './EditContactPage/EditContactPage';

export const ContactsContainer: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector(getAuthenticatedSelector);
    const isLoading = useSelector(getLoadingSelector);

    //Проверяем есть ли токен, если есть меняем флаг
    useEffect(() => {
        const data = getUserData();
        if (data?.token) {
            dispatch(setUserName(data.login));
            dispatch(setUserId(data.userId));
            dispatch(setAuthenticated(true));
        } else {
            dispatch(setAuthenticated(false));
        }
    });

    //Редиректим на разные страницы
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/auth/login');
        } else {
            navigate('/contacts/1');
        }
    }, [isAuthenticated]);

    const logoutHandler = () => {
        removeUserDataInLocalStorage();
        dispatch(setAuthenticated(false));
    };

    return (
        <>
            <Header isAuthenticated={isAuthenticated} logoutHandler={logoutHandler}/>
            <Loader isLoading={isLoading} overlay={false} size={sizes.large}>
                <Routes>
                    {
                        isAuthenticated &&
                        <>
                            <Route path='/contacts/edit/:id' element={<EditContactPage/>}/>
                            <Route path='/contacts/add' element={<AddContactPage/>}/>
                            <Route path='/contacts/:page' element={<ContactsPage/>}/>
                        </>
                    }
                    <Route path='/auth/login' element={<LoginForm/>}/>
                    <Route path='/auth/register' element={<RegisterForm/>}/>
                    <Route path='/not-authorized' element={<NotAuthorizedPage/>}/>
                    <Route path='/' element={<Navigate replace to="/contacts/1"/>}/>
                </Routes>
            </Loader>
        </>
    );
};
