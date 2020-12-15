import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './authReducer'

const middleware = [thunk];

const initialState = {};

const store = createStore(
    authReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
