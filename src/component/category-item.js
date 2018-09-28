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
  handleClick = () =>{
    this.props.handleDelete(this.state);
    if(!this.props.category){
      this.setState(defaultState);
    }
  }

  render(){
    const { category, expenses } = this.props;
    console.log(expenses);
    return(
      <li>
        {category.name} : ${category.budget}
        <button onClick={this.handleClick}>Delete Category</button>
        <CategoryForm category={category} handleComplete={this.updateCategory} />
        <ExpenseForm category={category} handleComplete={this.props.handleExpenseAdd} />
        {expenses.map((expense, i)=>(
          <ExpenseItem key={i} handleUpdate={this.props.handleExpenseUpdate} handleDelete={this.props.handleExpenseDelete} expense={expense} category={expense.categoryId} />
        ))}
      </li>
    );
  }
}