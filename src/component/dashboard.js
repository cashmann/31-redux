import React from 'react';
import { connect } from 'react-redux';
import CategoryForm from './category-form';
import CategoryItem from './category-item';

import * as expenseActions from '../action/expense-actions';
import * as errorActions from '../action/error-actions';

const DashboardContatiner = ({ categories, categoryCreate, categoryDestroy, categoryUpdate, expenses, expenseAdd, expenseDelete, expenseUpdate, error, clearError, validationError }) =>
  (
    <React.Fragment>
      <h1>Dashboard</h1>
      {error &&
          <div className='error'>{error}</div>}
      <CategoryForm handleComplete = {categoryCreate} />
      <div>
        {categories.map((category, i) =>(
          <CategoryItem key={i} handleUpdate={categoryUpdate} handleDelete={categoryDestroy} category={category} />
        ))}
      </div>
    </React.Fragment>
  );


const mapStateToProps = (state) =>{
  console.log(state);
  return{
    categories: state.categories,
    expenses: state.expenses,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) =>({
  categoryCreate: (category) => dispatch({type: 'CATEGORY_CREATE', payload: category}),
  categoryUpdate: (category) => dispatch({type: 'CATEGORY_UPDATE', payload: category}),
  categoryDestroy: (category) => dispatch({type: 'CATEGORY_DESTROY', payload: category}),
  expenseAdd: (expense) => dispatch(expenseActions.expenseAdd(expense)),
  expenseUpdate: (expense) => dispatch(expenseActions.expenseUpdate(expense)),
  expenseDelete: (expense) => dispatch(expenseActions.expenseDelete(expense)),
  clearError: () => dispatch(errorActions.clearError()),
  validationError: (err) => dispatch(errorActions.validationError(err)),
});

var connector = connect(mapStateToProps, mapDispatchToProps);
console.log(connector);
export default connector(DashboardContatiner);