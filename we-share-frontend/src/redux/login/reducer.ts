import { ILoginAction, SET_LOGIN_ERROR, SET_LOGIN_PENDING, SET_LOGIN_SUCCESS } from "src/redux/login/actions";

export interface ILoginState {
    isLoginPending: boolean;
    isLoginSuccess: boolean;
    loginError: boolean;
    userid?: number | null;
    loginName: string | null;
    loginEmail: string | null; 
}

const initialState = {
    isLoginPending: false,
    isLoginSuccess: false,
    loginError: false,
    userid: 0,
    // tslint:disable-next-line:object-literal-sort-keys
    loginName: '',
    loginEmail: '',
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
                    userid: action.userid,
                    // tslint:disable-next-line:object-literal-sort-keys
                    loginName: action.loginName,
                    loginEmail: action.loginEmail
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