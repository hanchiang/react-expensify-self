import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPageTab from '../components/LoginPageTab';
import SignUpPage from '../components/SignUpPage';
import ForgotPasswordPage from '../components/ForgotPasswordPage';
import ProfilePage from '../components/ProfilePage';

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
                    <PublicRoute path="/" component={LoginPageTab} exact/>
                    <PublicRoute path="/signup" component={SignUpPage} />
                    <PublicRoute path="/forgot" component={ForgotPasswordPage} />
                    <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
                    <PrivateRoute path="/create" component={AddExpensePage} />
                    <PrivateRoute path="/edit/:id" component={EditExpensePage} />
                    <PrivateRoute path="/profile" component={ProfilePage} />
                    <Route component={NotFoundPage} />
                </Switch>
            </div>
        </Router>
    );
}

export default AppRouter;