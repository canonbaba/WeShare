import axios from 'axios';
import { ICurrentMessage } from 'src/models';

export const CURRENT_INBOXMESSAGE = 'CURRENT_INBOXMESSAGE';
export type CURRENT_INBOXMESSAGE = typeof CURRENT_INBOXMESSAGE;

export interface ICurrentInboxMesAction {
    type: CURRENT_INBOXMESSAGE;
    currentMessage: ICurrentMessage[]
  }

export type IPopupInboxAction = ICurrentInboxMesAction;

export function getCurrentInboxData(currentMessage: ICurrentMessage[]): IPopupInboxAction {
    return {
      // tslint:disable-next-line:object-literal-shorthand
      currentMessage,
      type: CURRENT_INBOXMESSAGE
    };
  }


export function joininboxRoom(postID: number, userid: number, loginName: string) {
  // tslint:disable-next-line:no-console
  console.log('load room list',userid);
  return (dispatch: any) => {
    axios
      .post(`${process.env.REACT_APP_API_SERVER}/api/inbox/visitor_join_home`, {
        postID,
        userid,
        // tslint:disable-next-line:object-literal-sort-keys
        loginName
      }).then(res => {
        // tslint:disable-next-line:no-console
        console.log(res.data)
        dispatch(getCurrentInboxData(res.data))
      }).catch(err => {
        // tslint:disable-next-line:no-console
        console.log(err)
      });
  };
}

