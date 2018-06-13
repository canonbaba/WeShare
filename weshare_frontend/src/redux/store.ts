import { combineReducers, createStore } from 'redux';
// import { GenericStoreEnhancer } from 'redux';
// import thunk from 'redux-thunk';
import { authReducer as AuthReducer, IAuthState } from './auth/reducer';

// declare global {
//   interface IWindow {
//     __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: (enhancer: GenericStoreEnhancer) => GenericStoreEnhancer;
//   }
// }

export interface IRootState {
  auth: IAuthState;
}

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  combineReducers({
    auth: AuthReducer
  }),
  // composeEnhancers(applyMiddleware(thunk))
);