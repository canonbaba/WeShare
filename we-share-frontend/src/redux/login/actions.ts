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
  userid: number,
  loginName: string | null;
  loginEmail: string | null; 
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

export function setLoginSuccess(isLoginSuccess: boolean, userid: number, loginName: string, loginEmail: string): ILoginAction {
  return {
    type: SET_LOGIN_SUCCESS,
    // tslint:disable-next-line:object-literal-sort-keys
    isLoginSuccess,
    userid,
    loginName,
    loginEmail
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
  // // tslint:disable-next-line:no-console
  // console.log(email,password)
  return (dispatch: Dispatch<ILoginAction>) => {
    axios
      .post(`${process.env.REACT_APP_API_SERVER}/api/login`, {
        email,
        password,
      }).then(res => {
        // tslint:disable-next-line:no-console
        console.log(res.data.data[0].name)

        dispatch(setLoginPending(true));
        dispatch(setLoginSuccess(false, res.data.data[0].id, res.data.data[0].name, res.data.data[0].email));
        dispatch(setLoginError(false));
        setTimeout(() => {
          if (res.data.data.length > 0) {
            dispatch(setLoginSuccess(true, res.data.data[0].id, res.data.data[0].name, res.data.data[0].email));
            dispatch(setLoginError(false));
            dispatch(setLoginPending(false));
          } else {
            dispatch(setLoginError(true));
            dispatch(setLoginSuccess(false, res.data.data[0].id, res.data.data[0].name, res.data.data[0].email));
            dispatch(setLoginPending(false));
          }
        }, 1000);
      }).catch(err => {
        // tslint:disable-next-line:no-console
        console.log(err)
        swal('Invalid email or password')
      });
  };
}


export function logoutClearData () {
  return (dispatch: Dispatch<ILoginAction>) => {
    dispatch(setLoginSuccess(false, 0, '', ''));
  }
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