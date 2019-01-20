import { ADD_ITEM } from "../constants/lists";
const initialState = {
  assets: [],
  nextValue: 0
};
export default (state = initialState, action) => {
  if (action.type === ADD_ITEM) {
    // add the nextValue to the Assets and Increment nextValue
    const newAssets = [...state.assets];
    const newValue = state.nextValue + 1;
    newAssets.push(newValue);
    console.log({ ...state, assets: newAssets, nextValue: newValue });
    return { ...state, assets: newAssets, nextValue: newValue };
  }

  return state;
};
