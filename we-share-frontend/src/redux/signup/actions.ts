import axios from 'axios';
import { Dispatch } from 'redux';
import { IUser } from 'src/models';
import swal from 'sweetalert';

export const SIGNUP_USERS = 'SIGNUP_USERS';
export type SIGNUP_USERS = typeof SIGNUP_USERS;


export interface ISignupUsersAction {
  type: SIGNUP_USERS;
  users: IUser;
  afterSignup: boolean;
}

export type IUserActions = ISignupUsersAction;

export function signupUsers(users: IUser, afterSignup: boolean): ISignupUsersAction {
  return {
    // tslint:disable-next-line:object-literal-shorthand
    afterSignup: afterSignup,
    type: SIGNUP_USERS,
    // tslint:disable-next-line:object-literal-shorthand
    users: users,
  };
}

export function remoteSignupUsers(email: string, password: string, name: string) {
  // tslint:disable-next-line:no-console
  console.log(email, password, name)
  return (dispatch: Dispatch<IUserActions>) => {
    axios
      .post(`${process.env.REACT_APP_API_SERVER}/api/signup`, {
        email, 
        name,
        password, 
      }).then(res => {
        // tslint:disable-next-line:no-console
        swal('Welcome \n\n' + res.data[0].name);
        dispatch(signupUsers(res.data[0], true))
      }).catch(err => {
        alert(err)
      });
  };
}
