import { IProfilePostData, IProfileRatingData } from "src/models";
import { IProfileDataAction, LOAD_PROFILEPOST, LOAD_PROFILERATING } from "src/redux/profile/actions";


export interface IProfilePostState {
    profilePost?: IProfilePostData[];
    profileRating?: IProfileRatingData[];
  }
  
  const initialState = {
    profilePost: [],
    profileRating: []
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
      default:
        return oldState;
    }
  };