import axios from 'axios';
import { Dispatch } from 'redux';
import { IHomeData } from 'src/models';

export const LOAD_HOMEDATA = 'LOAD_HOMEDATA';
export type LOAD_HOMEDATA = typeof LOAD_HOMEDATA;


export interface ILoadHomeDataAction {
  type: LOAD_HOMEDATA;
  homedata: IHomeData[]
}

export type IHomeDataAction = ILoadHomeDataAction;

export function getPostData(homedata: IHomeData[]): IHomeDataAction {
  return {
    // tslint:disable-next-line:object-literal-shorthand
    homedata,
    type: LOAD_HOMEDATA
  };
}

export function fetchHomeDate(userid: number) {
  // console.log(userid);
  return (dispatch: Dispatch<ILoadHomeDataAction>) => {
    axios
      .post(`${process.env.REACT_APP_API_SERVER}/api/home`, {
        userid, // i think maybe we need this sometime
      }).then(res => {
        // console.log(res.data)
        dispatch(getPostData(res.data))
      }).catch(err => {
        // tslint:disable-next-line:no-console
        console.log(err)
      });
  };
}
