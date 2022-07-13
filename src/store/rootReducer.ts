import { combineReducers } from 'redux';
import { userInfo } from '@/store/UserInfo/userInfo.reducer';
import { SomeFeatureReducer as someFeature } from './SomeFeature/someFeature.reducer';

export const rootReducer = combineReducers({
  someFeature,
  userInfo,
});
