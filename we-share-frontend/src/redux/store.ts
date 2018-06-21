import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { HomeReducer, IHomeDataState } from 'src/redux/home/reducer';
import { ILoginState, LoginReducer } from 'src/redux/login/reducer';
import { IUserState, UserReducer } from 'src/redux/signup/reducer';
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
  users: IUserState; // seem never be used by mapStateToProps(signup)
  islogin: ILoginState;
  postform: IPostForm; // should be IPostFormState, but there is no postform reducer
  homedata: IHomeDataState;// homedata
}

export const store = createStore(
  combineReducers({
    auth: AuthReducer,
    users: UserReducer,
    // tslint:disable-next-line:object-literal-sort-keys
    islogin: LoginReducer,
    homedata: HomeReducer,
  }), composeEnhancers(applyMiddleware(thunk, logger))
);