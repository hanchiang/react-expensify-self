import moment from 'moment';

const expenses = [
  {
    id: 1,
    description: 'rent',
    note: '',
    amount: 340,
    createdAt: moment().add(7, 'days').valueOf()
  },
  {
    id: 2,
    description: 'water bill',
    note: '',
    amount: 123,
    createdAt: moment().valueOf()
  },
  {
    id: 3,
    description: 'phone bill',
    note: '',
    amount: 70,
    createdAt: moment().subtract(7, 'days').valueOf()
  }
]

export default expenses;