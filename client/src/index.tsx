import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './store';
import {ContactsContainer} from './components/pages/ContactsContainer';
import './index.css';

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <ContactsContainer/>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);

