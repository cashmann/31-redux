import React from 'react';
import { connect } from 'react-redux';
import CategoryForm from './category-form';
import CategoryItem from './category-item';

import * as errorActions from '../action/error-actions';

const DashboardContatiner = ({
  categories,
  categoryCreate, categoryDestroy, categoryUpdate,
  error,
  clearError, validationError,
}) =>
  (
    <React.Fragment>
      <h1>Dashboard</h1>
      {error &&
          <div className='error'>{error}</div>}
      <CategoryForm handleComplete = {categoryCreate} />
      <div>
        {categories.map((category, i) =>(
          <CategoryItem key={i}
            category={category}
            handleUpdate={categoryUpdate}
            handleDelete={categoryDestroy}
          />
        ))}
      </div>
    </React.Fragment>
  );


const mapStateToProps = (state) =>{
  console.log(state);
  return{
    categories: state.categories,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) =>({
  categoryCreate: (category) => dispatch({type: 'CATEGORY_CREATE', payload: category}),
  categoryUpdate: (category) => dispatch({type: 'CATEGORY_UPDATE', payload: category}),
  categoryDestroy: (category) => dispatch({type: 'CATEGORY_DESTROY', payload: category}),
  clearError: () => dispatch(errorActions.clearError()),
  validationError: (err) => dispatch(errorActions.validationError(err)),
});

var connector = connect(mapStateToProps, mapDispatchToProps);
console.log(connector);
export default connector(DashboardContatiner);