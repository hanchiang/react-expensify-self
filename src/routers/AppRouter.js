import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

function AppRouter() {
    return(
        <Router history={history}>
            <div>
                <Switch>
                    {/* 
                    <PublicRoute path="/" component={LoginPage} exact/>
                    <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
                    */}
                    <Route path="/" component={LoginPage} exact/>
                    <Route path="/dashboard" component={ExpenseDashboardPage} />
                    <Route path="/create" component={AddExpensePage} />
                    <Route path="/edit/:id" component={EditExpensePage} />
                    <Route component={NotFoundPage} />
                </Switch>
            </div>
        </Router>
    );
}

export default AppRouter;