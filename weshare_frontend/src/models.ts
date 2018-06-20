
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
    userid: number;
  }

  interface IPostForm {
    id: number;
    productName: string;
    productPrice: string; // should be number in backend
    productPricePercent: string;
    numberOfShareUser: string,
    productDescription: string;
    productCategory: string;
    photo: string;
    photoUrl: string;
    userId: number;
  }