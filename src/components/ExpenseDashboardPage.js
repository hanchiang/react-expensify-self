import React from 'react';
import { NavLink } from 'react-router-dom';

import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';
import ExpensesSummary from './ExpensesSummary';

function ExpenseDashboardPage() {
    return (
        <div>
            <div className="page-header">
                <div className="content-container">
                    <ExpensesSummary />
                    <NavLink className="button page-header-actions" to="/create">Add Expense</NavLink>
                </div>
            </div>

            <div className="content-container">
                <ExpenseListFilters />
                <ExpenseList />
            </div>
            
        </div>
    )
}

export default ExpenseDashboardPage;