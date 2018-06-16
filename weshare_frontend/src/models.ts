
  interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
  }

  interface IsLogin {
    isLoginPending: boolean;
    isLoginSuccess: boolean;
    loginError: boolean;
  }