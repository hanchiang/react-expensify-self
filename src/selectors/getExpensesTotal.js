const getExpensesTotal = (expenses) => expenses.reduce((acc, expense) => expense.amount + acc, 0);

export default getExpensesTotal;