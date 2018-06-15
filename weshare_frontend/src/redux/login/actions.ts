import axios from 'axios';
import { Dispatch } from 'redux';

export const SET_LOGIN_PENDING = 'SET_LOGIN_PENDING';
export type SET_LOGIN_PENDING = typeof SET_LOGIN_PENDING;

export const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';
export type SET_LOGIN_SUCCESS = typeof SET_LOGIN_SUCCESS;

export const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
export type SET_LOGIN_ERROR = typeof SET_LOGIN_ERROR;

export interface ISetLoginPending {
    type: SET_LOGIN_PENDING,
    isLoginPending: boolean
}

export interface ISetLoginSuccess {
    type: SET_LOGIN_SUCCESS,
    isLoginSuccess: boolean
}

export interface ISetLoginError {
    type: SET_LOGIN_ERROR,
    loginError: string
}

export type ILoginAction = ISetLoginPending | ISetLoginSuccess | ISetLoginError;

export function setLoginPending(isLoginPending: boolean): ILoginAction {
  return {
    type: SET_LOGIN_PENDING,
    // tslint:disable-next-line:object-literal-sort-keys
    isLoginPending
  };
}

export function setLoginSuccess(isLoginSuccess: boolean): ILoginAction {
  return {
    type: SET_LOGIN_SUCCESS,
    // tslint:disable-next-line:object-literal-sort-keys
    isLoginSuccess
  };
}

export function setLoginError(loginError: string): ISetLoginError {
  return {
    type: SET_LOGIN_ERROR,
    // tslint:disable-next-line:object-literal-sort-keys
    loginError
  };
}

export function remoteFetchUsers(email: string, password: string) {
    return (dispatch: Dispatch<ILoginAction>) => {
      // dispatch(setLoginPending(true));
      // dispatch(setLoginSuccess(false));
      // dispatch(setLoginError('error la hahaha'));

      axios
        .post(`${process.env.REACT_APP_API_SERVER}/api/login`, {
          email, 
          password, 
        }).then(res => {
          setTimeout(() => {
            dispatch(setLoginPending(false));
            
            if (res.data.isdataempty === true) {
              dispatch(setLoginSuccess(true));
            } else {
              dispatch(setLoginError('error la hahaha'));
            }
        })}).catch(err => {
          alert(err)
        });
    };
  }

//   export function fetchUsers() {
//     return (dispatch: Dispatch<IUserActions>) => {
//       axios
//         .get<IUser[]>(`${process.env.REACT_APP_API_SERVER}/api/users`, {
//           headers: {
//             Authorization: 'Bearer ' + localStorage.getItem('token')
//           }
//         })
//         .then(res => {
//           dispatch(loadUsers(res.data));
//         });
//     };
//   }