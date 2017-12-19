import React from 'react';
import { NavLink } from 'react-router-dom';

import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';
import ExpensesSummary from './ExpensesSummary';

function ExpenseDashboardPage() {
    return (
        <div>
            <h1>Expense dashboard page</h1>

            <div className="page-header">
                <div className="content-container">
                    <ExpensesSummary />
                    <NavLink className="button" to="/create">Add expense</NavLink>
                </div>
            </div>

            <ExpenseListFilters />
            <ExpenseList />
            
        </div>
    )
}

export default ExpenseDashboardPage;