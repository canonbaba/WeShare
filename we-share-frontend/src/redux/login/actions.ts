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
  isLoginSuccess: boolean,
  userid: number
}

export interface ISetLoginError {
  type: SET_LOGIN_ERROR,
  loginError: boolean
}

export type ILoginAction = ISetLoginPending | ISetLoginSuccess | ISetLoginError;

export function setLoginPending(isLoginPending: boolean): ILoginAction {
  return {
    type: SET_LOGIN_PENDING,
    // tslint:disable-next-line:object-literal-sort-keys
    isLoginPending
  };
}

export function setLoginSuccess(isLoginSuccess: boolean, userid: number): ILoginAction {
  return {
    type: SET_LOGIN_SUCCESS,
    // tslint:disable-next-line:object-literal-sort-keys
    isLoginSuccess,
    userid
  };
}

export function setLoginError(loginError: boolean): ISetLoginError {
  return {
    type: SET_LOGIN_ERROR,
    // tslint:disable-next-line:object-literal-sort-keys
    loginError
  };
}

export function remoteFetchUsers(email: string, password: string) {
  return (dispatch: Dispatch<ILoginAction>) => {
    axios
      .post(`${process.env.REACT_APP_API_SERVER}/api/login`, {
        email,
        password,
      }).then(res => {
        // tslint:disable-next-line:no-console
        console.log(res.data.data[0].id)

        dispatch(setLoginPending(true));
        dispatch(setLoginSuccess(false, res.data.data[0].id));
        dispatch(setLoginError(false));
        setTimeout(() => {
          if (res.data.data.length > 0) {
            dispatch(setLoginSuccess(true, res.data.data[0].id));
            dispatch(setLoginError(false));
            dispatch(setLoginPending(false));
          } else {
            dispatch(setLoginError(true));
            dispatch(setLoginSuccess(false, res.data.data[0].id));
            dispatch(setLoginPending(false));
          }
        }, 1000);
      }).catch(err => {
        // tslint:disable-next-line:no-console
        console.log(err)
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