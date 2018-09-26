const initialState = [];

export default (state = initialState, action = {}) =>{
  const {type, payload} = action;
  switch(type){
    case('CATEGORY_CREATE'):
      return [...state, payload];
    case('CATEGORY_UPDATE'):
      return state.map(cat =>
        cat._id === payload._id ? payload : cat
      );
    case('CATEGORY_DESTROY'):
      return state.filter(cat => cat._id !== payload._id);
    default:
      return state;
  }
};