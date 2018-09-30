import React from 'react';
import { connect } from 'react-redux';
import CategoryForm from './category-form';
import ExpenseForm from './expense-form';
import ExpenseItem from './expense-item';
import * as expenseActions from '../action/expense-actions';

const defaultState = {
  _id: null,
  name: '',
  budget: 0,
};

class CategoryItem extends React.Component{
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
        <ExpenseForm category={category} handleComplete={this.props.expenseAdd} />
        {expenses.map((expense, i)=>(
          <ExpenseItem key={i} handleUpdate={this.props.expenseUpdate} handleDelete={this.props.expenseDelete} expense={expense} category={expense.categoryId} />
        ))}
      </li>
    );
  }
}

const mapStateToProps = (state, ownProps) =>{
  console.log('CategoryItem', { state, ownProps });
  return{
    expenses: state.expenses
      .filter(expense => expense.categoryId === ownProps.category.name),
  };
};

const mapDispatchToProps = (dispatch, ownProps) =>({
  expenseAdd: (expense) => dispatch(expenseActions.expenseAdd({...expense, categoryId: ownProps.category.name})),
  expenseUpdate: (expense) => dispatch(expenseActions.expenseUpdate(expense)),
  expenseDelete: (expense) => dispatch(expenseActions.expenseDelete(expense)),
});

var connector = connect(mapStateToProps, mapDispatchToProps);
console.log(connector);
export default connector(CategoryItem);
