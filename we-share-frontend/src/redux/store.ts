import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { HomeReducer, IHomeDataState } from 'src/redux/home/reducer';
import { IPureInboxState, PureInboxReducer } from 'src/redux/inbox/reducer';
import { ILoginState, LoginReducer } from 'src/redux/login/reducer';
import { IInboxDataState, PopupActionInboxReducer } from 'src/redux/popup_post/reducer';
import { IProfilePostState, ProfileReducer } from 'src/redux/profile/reducer';
import { IUserState, UserReducer } from 'src/redux/signup/reducer';
import { authReducer as AuthReducer, IAuthState } from './auth/reducer';

import { IContractsState, reducer as contractsReducer} from 'src/redux/contracts/reducer';
import { ISignContractsState, reducer as loadContractsReducer } from 'src/redux/contractsSign/reducer';


declare global {
  // tslint:disable-next-line:interface-name
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export interface IRootState {
  auth: IAuthState;
  signup: IUserState; // seem never be used by mapStateToProps(signup)
  islogin: ILoginState;
  // postform: IPostForm; // should be IPostFormState, but there is no postform reducer
  homedata: IHomeDataState;// homedata
  profilePost: IProfilePostState;
  profileRating: IProfilePostState;
  currentMessage: IInboxDataState;
  inboxList: IPureInboxState;
  profileContract:IProfilePostState;
  contracts: IContractsState;
  loadContracts: ISignContractsState;
  is_agree: ISignContractsState;
  contractDetail: IProfilePostState;
  joinContractList: IPureInboxState;
}

export const store = createStore(
  combineReducers({
    auth: AuthReducer,
    signup: UserReducer,
    // tslint:disable-next-line:object-literal-sort-keys
    islogin: LoginReducer,
    homedata: HomeReducer,
    profilePost: ProfileReducer,
    profileRating: ProfileReducer,
    profileContract:ProfileReducer,
    contracts: contractsReducer,
    currentMessage: PopupActionInboxReducer,
    inboxList: PureInboxReducer,
    loadContracts: loadContractsReducer,
    is_agree: loadContractsReducer,
    contractDetail: ProfileReducer,
    joinContractList: PureInboxReducer
  }), composeEnhancers(applyMiddleware(thunk, logger))
);