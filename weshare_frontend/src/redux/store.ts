import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { ILoginState, LoginReducer } from 'src/redux/login/reducer';
import { UserReducer } from 'src/redux/signup/reducer';
import { authReducer as AuthReducer, IAuthState } from './auth/reducer';



export interface IRootState {
  auth: IAuthState;
  users: IUser; // need to rewrite because it should be 'IUserState' from signup state
  islogin: ILoginState;
}

export const store = createStore(
  combineReducers({
    auth: AuthReducer,
    users: UserReducer,
    // tslint:disable-next-line:object-literal-sort-keys
    islogin: LoginReducer
  }), applyMiddleware(thunk)
);