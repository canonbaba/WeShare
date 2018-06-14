import axios from 'axios';
import { Dispatch } from 'redux';

export const LOAD_USERS = 'LOAD_USERS';
export type LOAD_USERS = typeof LOAD_USERS;

export const SIGNUP_USERS = 'SIGNUP_USERS';
export type SIGNUP_USERS = typeof SIGNUP_USERS;

export interface ILoadUsersAction {
  type: LOAD_USERS;
  users: IUser[];
}

export interface ISignupUsersAction {
  type: SIGNUP_USERS;
  users: IUser;
}

export type IUserActions = ILoadUsersAction | ISignupUsersAction;

export function loadUsers(users: IUser[]): ILoadUsersAction {
  return {
    type: LOAD_USERS,
    // tslint:disable-next-line:object-literal-shorthand
    users: users
  };
}

export function fetchUsers() {
  return (dispatch: Dispatch<IUserActions>) => {
    axios
      .get<IUser[]>(`${process.env.REACT_APP_API_SERVER}/api/users`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then(res => {
        dispatch(loadUsers(res.data));
      });
  };
}

// for react-redux store user info??
export function signupUsers(users: IUser): ISignupUsersAction {
  return {
    type: SIGNUP_USERS,
    // tslint:disable-next-line:object-literal-shorthand
    users: users
  };
}

// for DB store user info???
export function remoteSignupUsers(email: string, password: string, name: string) {
  return (dispatch: Dispatch<IUserActions>) => {
    axios
      .post(`${process.env.REACT_APP_API_SERVER}/api/login`, {
        email, 
        name,
        password, 
      }).then(res => {
        dispatch(signupUsers(res.data))
      }).catch(err => {
        alert(err)
      });
  };
}
