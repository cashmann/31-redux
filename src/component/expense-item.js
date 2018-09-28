import React from 'react';
import ExpenseForm from './expense-form';

const defaultState = {
  _id: null,
  name: '',
  price: 0,
};

export default class ExpenseItem extends React.Component{
  constructor(props){
    super(props);
    this.state = props.expense || defaultState;
  }
  updateExpense = (expense) =>{
    this.props.handleUpdate(expense);
  }
  handleClick = () =>{
    this.props.handleDelete(this.state);
  }

  render(){
    const { expense } = this.props;
    return(
      <li>
        {expense.name} : ${expense.price}
        <button onClick={this.handleClick}>Delete Expense</button>
        <ExpenseForm expense={expense} handleComplete={this.updateExpense} />
      </li>
    );
  }
}