import { LOAD_USERS, UserActions } from './actions';

export interface IUserState {
  users: IUser[];
}

const initialState = {
  users: []
};

export const reducer = (state: IUserState = initialState, action: UserActions) => {
  switch (action.type) {
    case LOAD_USERS:
      return {
        ...state,
        users: action.users
      };
    default:
      return initialState;
  }
};