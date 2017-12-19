import React from 'react';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    
    const { expense } = this.props;
    this.state = {
      error: '',
      description: expense ? expense.description : '',
      amount: expense ? expense.amount/100 : '',
      note: expense ? expense.note : '',
      createdAt: expense ? moment(expense.createdAt) : moment(),
      focused: false
    };
  }

  onDateChange = (createdAt) => this.setState({createdAt});
  onFocusChange = ({focused}) => this.setState({focused});
  onDescriptionChange = (event) => this.setState({description: event.target.value});
  onAmountChange = (event) => {
    const amount = event.target.value;
    const amountRegex = /^\d+(\.\d{0,2})?$/;
    if (!amount || amount.match(amountRegex)) {
      this.setState({amount});
    }
  }
  onNoteChange = (event) => this.setState({ note: event.target.value });

  onSubmit = (event) => {
    event.preventDefault();
    let error = '';

    if (!this.state.description || !this.state.amount) {
      error = 'Please enter description and amount';
      this.setState({error});
    } else {
      this.setState({error});
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount) * 100,
        note: this.state.note,
        createdAt: this.state.createdAt.valueOf()
      });
    }
  }

  render() {
    const { error } = this.state;
    return (
        <form onSubmit={this.onSubmit} className="form">
          {error && <div className="form-error">{error}</div>}

          <input className="text-input" type="text" value={this.state.description} onChange={this.onDescriptionChange} placeholder="description" autoFocus />
          <input className="text-input" type="text" value={this.state.amount} onChange={this.onAmountChange} placeholder="Amount" />
          <SingleDatePicker
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.focused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          <textarea className="textarea" value={this.state.note} onChange={this.onNoteChange} placeholder="Add a note for your expense (optional)"></textarea>

          <div>
            <button className="button">Add Expense</button>
          </div>
        </form>
    );
  }
}

export default ExpenseForm;