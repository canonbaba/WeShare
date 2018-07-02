import { IInboxList, IJoinContractList } from "src/models";
import { IInboxAction, LOAD_INBOXLIST, PRE_CREATE_CONTRACT_DATA } from "src/redux/inbox/action";

export interface IPureInboxState {
    inboxList?: IInboxList[];
    joinContractList?: IJoinContractList[];
  }
  
  const initialState = {
    inboxList: [],
    joinContractList: []
  };
  
  export const PureInboxReducer = (oldState: IPureInboxState = initialState, action: IInboxAction) => {
    switch (action.type) {
      case LOAD_INBOXLIST:
      {
        return {
          ...oldState,
          inboxList: action.inboxList
        };
      }
      case PRE_CREATE_CONTRACT_DATA:
      {
        return {
          ...oldState,
          joinContractList: action.joinContractList
        };
      }
      default:
        return oldState;
    }
  };