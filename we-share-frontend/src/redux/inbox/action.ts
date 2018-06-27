import axios from 'axios';
import { IInboxList } from 'src/models';
import { getCurrentInboxData } from 'src/redux/popup_post/action';

export const LOAD_INBOXLIST = 'LOAD_INBOXLIST';
export type LOAD_INBOXLIST = typeof LOAD_INBOXLIST;

export interface ILoadInboxListAction {
  type: LOAD_INBOXLIST;
  inboxList: IInboxList[];
}

export type IInboxAction = ILoadInboxListAction;

export function loadInboxList(inboxList: IInboxList[]): IInboxAction {
  return {
    // tslint:disable-next-line:object-literal-shorthand
    inboxList,
    type: LOAD_INBOXLIST
  };
}

export function userSendMessage(userid: number, inputMessages: string, inboxId: number) {
  // tslint:disable-next-line:no-console
  console.log(userid, inputMessages, inboxId);
  return (dispatch: any) => {
    axios
      .post(`${process.env.REACT_APP_API_SERVER}/api/inbox/save_message`, {
        userid,
        // tslint:disable-next-line:object-literal-sort-keys
        inputMessages,
        inboxId,
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


export function fetchInboxList(userid: number) {
  // tslint:disable-next-line:no-console
  // console.log(userid);
  return (dispatch: any) => {
    axios
      .post(`${process.env.REACT_APP_API_SERVER}/api/inbox/onload_inboxlist`, {
        userid,
      }).then(res => {
        // tslint:disable-next-line:no-console
        console.log(res.data)
        dispatch(loadInboxList(res.data))
      }).catch(err => {
        // tslint:disable-next-line:no-console
        console.log(err)
      });
  };
}


export function fetchSelectedMessage(userid: number, inboxId: number) {
  // tslint:disable-next-line:no-console
  console.log(userid, inboxId);
  return (dispatch: any) => {
    axios
      .post(`${process.env.REACT_APP_API_SERVER}/api/inbox/select_inbox_room`, {
        userid,
        // tslint:disable-next-line:object-literal-sort-keys
        inboxId
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
