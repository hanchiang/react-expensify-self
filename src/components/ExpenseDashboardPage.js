import React from 'react';
import { NavLink } from 'react-router-dom';

import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';

function ExpenseDashboardPage() {
    return (
        <div>
            <h1>Expense dashboard page</h1>
            <NavLink to="/create">Add expense</NavLink>

            <ExpenseListFilters />
            <ExpenseList />
        </div>
    )
}

export default ExpenseDashboardPage;