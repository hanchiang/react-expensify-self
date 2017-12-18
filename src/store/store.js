import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer,
        auth: authReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;