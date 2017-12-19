import moment from 'moment';

const getVisibleExpenses = (expenses, filters) => {
  const { text, sortBy, startDate, endDate } = filters;
  let textMatch, startDateMatch, endDateMatch;

  return expenses.filter(expense => {
    textMatch = !text || expense.description.toLowerCase().includes(text.toLowerCase());
    startDateMatch = startDate ? moment(expense.createdAt).isSameOrAfter(startDate) : true;
    endDateMatch = endDate ? moment(expense.createdAt).isSameOrBefore(endDate) : true;

    return textMatch && startDateMatch && endDateMatch;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.createdAt >= b.createdAt ? -1 : 1;
    } else if (sortBy === 'amount') {
      return a.amount >= b.amount ? -1 : 1;
    }
  });
}

export default getVisibleExpenses;