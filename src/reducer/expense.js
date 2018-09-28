const initState = [];

export default (state = initState, action = {}) =>{
  const {type, payload} = action;
  switch(type){
    case('EXPENSE_CREATE'):
      return [...state, payload];
    case('EXPENSE_UPDATE'):
      return state.map(exp => exp._id === payload._id ? payload : exp);
    case('EXPENSE_DELETE'):
      return state.filter(exp => exp.categoryId !== payload._id);
    default:
      return state;
  }
};