import { ILoginAction, SET_LOGIN_ERROR, SET_LOGIN_PENDING, SET_LOGIN_SUCCESS } from "src/redux/login/actions";

export interface ILoginState {
    isLoginPending: boolean;
    isLoginSuccess: boolean;
    loginError: boolean;
    userid?: number;
}

const initialState = {
    isLoginPending: false,
    isLoginSuccess: false,
    loginError: false,
    userid: 0
};

export const LoginReducer = (oldState: ILoginState = initialState, action: ILoginAction) => {
    switch (action.type) {
        case SET_LOGIN_PENDING:
            {
                return {
                    ...oldState,
                    isLoginPending: action.isLoginPending
                };
            }
        case SET_LOGIN_SUCCESS:
            {
                return {
                    ...oldState,
                    isLoginSuccess: action.isLoginSuccess,
                    userid: action.userid
                };
            }
        case SET_LOGIN_ERROR:
            {
                return {
                    ...oldState,
                    loginError: action.loginError
                };
            }
        default:
            return oldState;
    }
};