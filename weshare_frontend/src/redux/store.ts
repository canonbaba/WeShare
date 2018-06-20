import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { ILoginState, LoginReducer } from 'src/redux/login/reducer';
import { UserReducer } from 'src/redux/signup/reducer';
import { authReducer as AuthReducer, IAuthState } from './auth/reducer';


declare global {
  // tslint:disable-next-line:interface-name
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export interface IRootState {
  auth: IAuthState;
  users: IUser; // need to rewrite because it should be 'IUserState' from signup state
  islogin: ILoginState;
  postform: IPostForm;
}

export const store = createStore(
  combineReducers({
    auth: AuthReducer,
    users: UserReducer,
    // tslint:disable-next-line:object-literal-sort-keys
    islogin: LoginReducer
  }), composeEnhancers(applyMiddleware(thunk, logger))
);