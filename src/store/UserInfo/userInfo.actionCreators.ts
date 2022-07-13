import { InitialState } from './userInfo.reducer';

export const setUserInfo = (info: InitialState) => {
  return {
    type: 'SET_USER_INFO',
    info,
  } as const;
};

export const deleteInfo = () => {
  return {
    type: 'DELETE_INFO',
  } as const;
};
