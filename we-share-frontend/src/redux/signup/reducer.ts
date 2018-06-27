import { IUser } from 'src/models';
import { IUserActions, SIGNUP_USERS } from './actions';

export interface IUserState {
  users?: IUser;
  afterSignup: boolean;
}

const initialState = {
  users: undefined,
  // tslint:disable-next-line:object-literal-sort-keys
  afterSignup: false,
};

export const UserReducer = (oldState: IUserState = initialState, action: IUserActions) => {
  switch (action.type) {
    case SIGNUP_USERS:
    {
      return {
        ...oldState,
        users: action.users,
        // tslint:disable-next-line:object-literal-sort-keys
        afterSignup: action.afterSignup
      };
    }
    default:
      return oldState;
  }
};