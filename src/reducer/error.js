const initialState = null;

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case 'CLEAR_ERROR':
      return null;
    case 'VALIDATION_ERROR':
      return payload;
    default:
      return state;
  }
};