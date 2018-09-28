import * as errorActions from '../action/error-actions';

export default store => next => action => {
  console.log(store);
  const { type, payload } = action;
  let categories = store.getState().categories;
  console.log(categories);

  switch (type) {
    case 'EXPENSE_ADD':
    case 'EXPENSE_UPDATE':
      if (!payload) {
        return store.dispatch(
          errorActions.validationError(
            'Missing expense information!'));
      }

      if (!payload.name) {
        return store.dispatch(
          errorActions.validationError(
            'Name is required!'));
      }

      if (!(payload.price > 0)) {
        return store.dispatch(
          errorActions.validationError(
            'Price must be positive!'));
      }
      categories.forEach(cat =>{
        if (cat.name === payload.categoryId){
          if(payload.price > cat.budget){
            return store.dispatch(
              errorActions.validationError(
                'Expense is over budget'
              )
            );
          }
        }
      });

      store.dispatch(errorActions.clearError());
      return next(action);

    default:
      return next(action);
  }
};