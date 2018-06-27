import { IInboxList } from "src/models";
import { IInboxAction, LOAD_INBOXLIST } from "src/redux/inbox/action";

export interface IPureInboxState {
    inboxList?: IInboxList[];
  }
  
  const initialState = {
    inboxList: []
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
      default:
        return oldState;
    }
  };