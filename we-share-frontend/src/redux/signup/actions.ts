import axios from 'axios';
import { Dispatch } from 'redux';
import { IUser } from 'src/models';

export const SIGNUP_USERS = 'SIGNUP_USERS';
export type SIGNUP_USERS = typeof SIGNUP_USERS;


export interface ISignupUsersAction {
  type: SIGNUP_USERS;
  users: IUser;
}

export type IUserActions = ISignupUsersAction;

export function signupUsers(users: IUser): ISignupUsersAction {
  return {
    type: SIGNUP_USERS,
    // tslint:disable-next-line:object-literal-shorthand
    users: users
  };
}

export function remoteSignupUsers(email: string, password: string, name: string) {
  return (dispatch: Dispatch<IUserActions>) => {
    axios
      .post(`${process.env.REACT_APP_API_SERVER}/api/signup`, {
        email, 
        name,
        password, 
      }).then(res => {
        alert(res.data.data);
        dispatch(signupUsers(res.data))
      }).catch(err => {
        alert(err)
      });
  };
}
