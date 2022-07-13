import { ISetSomeFeatureAction, TSomeFeature } from './someFeature.types';
import { SET_SOME_FEATURE } from './someFeature.actionTypes';

export const setSomeFeatureAction = (data: TSomeFeature): ISetSomeFeatureAction => {
  return {
    type: SET_SOME_FEATURE,
    payload: data,
  };
};
