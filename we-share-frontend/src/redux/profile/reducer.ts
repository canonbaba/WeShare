import { IContractDetail, IProfileContractData, IProfilePostData, IProfileRatingData } from "src/models";
import { IProfileDataAction, LOAD_CONTRACTDETAIL, LOAD_PROFILECONTRACT, LOAD_PROFILEPOST, LOAD_PROFILERATING } from "src/redux/profile/actions";


export interface IProfilePostState {
  profilePost?: IProfilePostData[];
  profileRating?: IProfileRatingData[];
  profileContract: IProfileContractData[];
  contractDetail?: IContractDetail[];
}

const initialState = {
  profilePost: [],
  profileRating: [],
  // tslint:disable-next-line:object-literal-sort-keys
  profileContract: [],
  contractDetail: []
};

export const ProfileReducer = (oldState: IProfilePostState = initialState, action: IProfileDataAction) => {
  switch (action.type) {
    case LOAD_PROFILEPOST:
      {
        return {
          ...oldState,
          profilePost: action.profilePost
        };
      }
    case LOAD_PROFILERATING:
      {
        return {
          ...oldState,
          profileRating: action.profileRating
        };
      }
    case LOAD_PROFILECONTRACT:
      {
        return {
          ...oldState,
          profileContract: action.profileContract
        };
      }
      case LOAD_CONTRACTDETAIL:
      {
        return {
          ...oldState,
          contractDetail: action.contractDetail
        };
      }
    default:
      return oldState;
  }
};