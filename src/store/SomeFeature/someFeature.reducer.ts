import { ISetSomeFeatureAction, ISomeState } from './someFeature.types';
import { SET_SOME_FEATURE } from './someFeature.actionTypes';

const initialState: ISomeState = {
  feature: '',
};

export const SomeFeatureReducer = (state: ISomeState = initialState, action: ISetSomeFeatureAction) => {
  switch (action.type) {
    case SET_SOME_FEATURE:
      return { ...state, feature: action.payload };
    default:
      return state;
  }
};
