import { deleteInfo, setUserInfo } from './userInfo.actionCreators';

export interface InitialState {
  name: string;
  favouriteFood: string;
  age: 0;
}

type Action = ReturnType<typeof setUserInfo> | ReturnType<typeof deleteInfo>;

const initialState: InitialState = {
  name: '',
  favouriteFood: '',
  age: 0,
};

export const userInfo = (state: InitialState = initialState, action: Action): InitialState => {
  switch (action.type) {
    case 'SET_USER_INFO': {
      return { ...action.info };
    }
    case 'DELETE_INFO': {
      return { ...initialState };
    }
    default:
      return state;
  }
};
