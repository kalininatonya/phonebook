import {applyMiddleware, combineReducers, createStore, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {commonReducer} from './reducers/commonReducer';
import {authReducer} from './reducers/authReducer';
import {contactsReducer} from './reducers/contactsReducer';

const reducers = combineReducers({
    listPage: contactsReducer,
    authPage: authReducer,
    commonPage: commonReducer
});

type RootReducerType = typeof reducers; //globalState: AppStateType => AppStateType
export type AppStateType = ReturnType<RootReducerType>;

//Для redux dev tools
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));
