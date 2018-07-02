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
  user_id: number;
}

export interface IInboxList {
  inbox_id: number;
  nameOfProduct: string;
}


export interface IProfileContractData {
  contractId: number;
  // id: number; 
  name: string;
  product: string;
  price: number;
  state: string;
  is_agree: boolean;
}

export interface IContractDetail {
  contract_id: number,
  user_id: number,
  percentageToShare: string,
  daysToUse: string,
  is_agree: boolean,
  name: string,
  productName: string,
  price: string,
  description: string,
  created_at: string;
}

export interface IContracts {
  id: number;
  product: string;
  price: number;
  participants: IParticipant[]
  description: string;
  userid: number;
}

export interface IParticipant {
  id: number;
  participantName: string;
  percentage: string;
  dayToUse: string;
}

export interface ILoadContractsData {
  id: number;
  product: string;
  price: number;
  participants: IContractsParticipant[];
  description: string;
}

export interface IContractsParticipant {
  userId: number;
  name: string;
  percentageToShare: string;
  daysToUse: string;
}

export interface IJoinContractList {
  user_id: number;
  name: string;
}