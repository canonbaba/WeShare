import { ICurrentMessage } from "src/models";
import { CURRENT_INBOXMESSAGE, IPopupInboxAction } from "src/redux/popup_post/action";


export interface IInboxDataState {
    currentMessage?: ICurrentMessage[];
  }
  
  const initialState = {
    currentMessage: []
  };
  
  export const PopupActionInboxReducer = (oldState: IInboxDataState = initialState, action: IPopupInboxAction) => {
    switch (action.type) {
      case CURRENT_INBOXMESSAGE:
      {
        return {
          ...oldState,
          currentMessage: action.currentMessage
        };
      }
      default:
        return oldState;
    }
  };