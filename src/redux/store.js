import {createStore ,combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import todoReducer from './todo/reducers'
import userReducer from './user/reducers'

const rootReducer = combineReducers({todoReducer,userReducer});

export const Store = createStore(rootReducer,applyMiddleware(thunk));