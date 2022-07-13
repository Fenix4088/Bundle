import { applyMiddleware, compose, createStore, Middleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './rootReducer';

import { composeWithDevTools } from '@redux-devtools/extension';

const middlewares: Middleware[] = [];

if (__DEV__) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  middlewares.push(require('redux-immutable-state-invariant').default());
}

middlewares.push(thunk);

const composeFunc: typeof composeWithDevTools | typeof compose = __DEV__ ? composeWithDevTools : compose;

export const store = createStore(rootReducer, composeFunc(applyMiddleware(...middlewares)));

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
