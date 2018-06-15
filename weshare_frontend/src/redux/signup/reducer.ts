import { IUserActions, SIGNUP_USERS } from './actions';

export interface IUserState {
  users?: IUser;
}

const initialState = {
  users: undefined
};

export const UserReducer = (oldState: IUserState = initialState, action: IUserActions) => {
  switch (action.type) {
    case SIGNUP_USERS:
    {
      return {
        ...oldState,
        users: action.users
      };
    }
    default:
      return oldState;
  }
};