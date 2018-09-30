import * as errorActions from '../action/error-actions';

export default store => next => action => {
  console.log(store);
  const { type, payload } = action;
  let categories = store.getState().categories;
  let error;
  console.log(categories);

  switch (type) {
    case 'EXPENSE_CREATE':
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
        console.log(cat.name, payload.categoryId);
        if (cat.name === payload.categoryId){
          if(payload.price > cat.budget){
            error = true;
            return store.dispatch(
              errorActions.validationError(
                'Expense is over budget'
              )
            );
          }
        }
      });
      if(!error){
        store.dispatch(errorActions.clearError());
        return next(action);
      }
      return;

    default:
      return next(action);
  }
};