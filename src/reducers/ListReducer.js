import { ADD_ITEM, SET_NEXT_VALUE} from "../constants/lists";
export const initialState = {
  assets: [],
  nextValue: 1
};
export default (state = initialState, action) => {
  if (!action || !action.type) return state;
  if (action.type === ADD_ITEM) {
    // add the nextValue to the Assets and Increment nextValue
    const newAssets = [...state.assets];
    const newValue = state.nextValue + 1;
    newAssets.push(state.nextValue);
    console.log({ ...state, assets: newAssets, nextValue: newValue });
    return { ...state, assets: newAssets, nextValue: newValue };
  }

  if (action.type === SET_NEXT_VALUE) {
    return {...state, nextValue: action.payload}
  }

  return state;
};
