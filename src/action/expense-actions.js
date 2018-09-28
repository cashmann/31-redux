import uuid from 'uuid';

export const expenseAdd = (expense) => {
  expense._id = uuid();
  expense.createdOn = new Date();

  return {
    type: 'EXPENSE_CREATE',
    payload: expense,
  };
};

export const expenseUpdate = (expense) => {
  expense.updatedOn = new Date();

  return {
    type: 'EXPENSE_UPDATE',
    payload: expense,
  };
};

export const expenseDelete = (expense) =>{
  return{
    type: 'EXPENSE_DELETE',
    payload: expense,
  };
};