import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { reducer as burgerMenu } from 'redux-burger-menu';

import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';
// import burgerMenuReducer from '../reducers/burgerMenu';
import rootSaga from '../sagas/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const saga = createSagaMiddleware();

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer,
        auth: authReducer,
        burgerMenu
    }),
    undefined,
    composeEnhancers(applyMiddleware(saga))
);
saga.run(rootSaga);

export default store;