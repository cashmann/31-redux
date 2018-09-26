import React from 'react';
import CategoryForm from './category-form';
import ExpenseForm from './expense-form';
import ExpenseItem from './expense-item';

const defaultState = {
  _id: null,
  name: '',
  budget: 0,
};

export default class CategoryItem extends React.Component{
  constructor(props){
    super(props);
    this.state = props.category || defaultState;
  }
  updateCategory = (category) =>{
    this.props.handleUpdate(category);
  }
  handleClick = (e) =>{
    this.props.handleDelete(this.state);
    if(!this.props.category){
      this.setState(defaultState);
    }
  }

  render(){
    const { category, expenses } = this.props;
    return(
      <li>
        {category.name} : ${category.budget}
        <button onClick={this.handleClick}>Delete Category</button>
        <CategoryForm category={category} handleComplete={this.updateCategory} />
        <ExpenseForm category={category} handleComplete={this.updateExpense} />
        {expenses.map((expense, i)=>(
          <ExpenseItem key={i} handleUpdate={expenseUpdate} handleDelete={expenseDelete} expense={expense} category={expense.categoryId} />
        ))}
      </li>
    );
  }
}