import deepFreeze from 'deep-freeze';
import reducer from './category';

describe('reducer', ()=>{
  it('returns initial state', ()=>{
    let res = reducer();
    expect(res).toEqual([]);
  });
  it('returns current state given unknown action', () => {
    const state = ['hi'];
    const action = {
      type: 'UNKNOWN',
    };

    deepFreeze(state);
    deepFreeze(action);

    let res = reducer(state, action);
    expect(res).toBe(state);
  });
  it('adds, removes, and updates a category', () => {
    const state = [{ _id:1, timestamp: new Date(), name: 'test', budget: '$0'}];
    const action = {
      type: 'CATEGORY_CREATE',
      payload: { _id:2, timestamp: new Date(), name: 'added', budget: '$1' },
    };
    const action2 = {
      type: 'CATEGORY_DESTROY',
      payload: { _id:2, timestamp: new Date(), name: 'added', budget: '$1' },
    };

    const action3 = {
      type: 'CATEGORY_UPDATE',
      payload: { _id:1, timestamp: new Date(), name: 'test', budget: '$20'},
    };

    deepFreeze(state);
    deepFreeze(action);

    let res = reducer(state, action);
    expect(res).not.toBe(state);
    expect(res.length).toBe(2);

    res = reducer(state, action2);
    console.log(res);
    expect(res).toEqual(state);

    res = reducer(state, action3);
    expect(res[0].budget).toBe('$20');
  });
});