import listReducer, {initialState} from './ListReducer';
import {ADD_ITEM, SET_NEXT_VALUE} from '../constants/lists';
describe("Test List Reducer", () => {
  it ('should return initial state when no action passed', () => {
    expect(listReducer({})).toEqual({});
  }) 
  it ('should return initial state when no state passed', () => {
    expect(listReducer(undefined, {type: 'DUMMY_ACTION'})).toEqual(initialState);
  }) 

  it('should set the next value', () => {
    const state = {assets: [], nextValue: 0};
    const newValue = 1
    expect(listReducer(state, {type: SET_NEXT_VALUE, payload: newValue}).nextValue).toEqual(newValue)
  })

  it ('should add nextValue to assets', () => {
    const state = {assets: [1, 2, 3], nextValue: 5};
    expect(listReducer(state, {type: ADD_ITEM}).assets).toEqual([1, 2, 3, 5]);
  });

 
})