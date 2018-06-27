export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface IsLogin {
  isLoginPending: boolean;
  isLoginSuccess: boolean;
  loginError: boolean;
  userid: number | null;
  loginName: string;
  loginEmail: string;
}

// for create post form
export interface IPostForm {
  id: number;
  productName: string;
  productPrice: string;
  productPricePercent: string;
  numberOfShareUser: string;
  productDescription: string;
  productCategory: string;
  photo: string; // consider delete or not
  photoUrl: string; // this is real photo data
  userId: number;
}


// for load post data
export interface IHomeData {
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

export interface IScore {
  id: number,
  click: boolean,
  value: number
}

// need reviews later
export interface IProfile {
  post: IPostForm,
  comment: string,
  commentor: string, // need to userid to find commentor name in backend
}

export interface IProfilePostData {
  nameOfProduct: string;
  price: string;
  numberOfShareUser: string,
  percentageOfPay: string;
  description: string;
  photo: string;
}

export interface IProfileRatingData {
  name: string;
  comment: string;
  rating: number;
  updated_at: string;
}

export interface ICurrentMessage {
  name: string;
  message: string;
  created_at: string;
  inbox_id: number;
}

export interface IInboxList {
  inbox_id: number;
  nameOfProduct: string;
}