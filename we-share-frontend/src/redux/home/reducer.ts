import { IHomeDataAction, LOAD_HOMEDATA } from "src/redux/home/action";

export interface IHomeDataState {
    homedata?: IHomeData[];
  }
  
  const initialState = {
    homedata: []
  };
  
  export const HomeReducer = (oldState: IHomeDataState = initialState, action: IHomeDataAction) => {
    switch (action.type) {
      case LOAD_HOMEDATA:
      {
        return {
          ...oldState,
          homedata: action.homedata
        };
      }
      default:
        return oldState;
    }
  };