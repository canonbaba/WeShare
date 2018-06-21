
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
    userid: number | null;
  }

  // for create post form
  interface IPostForm {
    id: number;
    productName: string;
    productPrice: string;
    productPricePercent: string;
    numberOfShareUser: string,
    productDescription: string;
    productCategory: string;
    photo: string; // consider delete or not
    photoUrl: string;
    userId: number;
  }


  // for load post data
  interface IHomeData {
    id: number;
    nameOfProduct: string;
    price: string;
    numberOfShareUser: string,
    percentageOfPay: string;
    description: string;
    category_id: string;
    photo: string;
    averageRating: string; // from console.log, i saw it is string
    userId: number;
    created_at: string;
  }