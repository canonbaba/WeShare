import axios from 'axios';
import { Dispatch } from 'redux';
import { IHomeData } from 'src/models';

export const RATING_UPDATEHOMEDATA = 'RATING_UPDATEHOMEDATA';
export type RATING_UPDATEHOMEDATA = typeof RATING_UPDATEHOMEDATA;

export interface IUpdataAverageRating {
  type: RATING_UPDATEHOMEDATA,
  ratingUpdateHomeData: IHomeData[]
}

export type IRatingAction = IUpdataAverageRating;

export function updateHomeData(ratingUpdateHomeData: IHomeData[]): IRatingAction {
  return {
    type: RATING_UPDATEHOMEDATA,
    // tslint:disable-next-line:object-literal-sort-keys
    ratingUpdateHomeData
  }
}

export function saveRating(userid: number, comment: string, trueClick: number) {
    // console.log(userid, comment, trueClick, `${process.env.REACT_APP_API_SERVER}/api/rating`)
  return (dispatch: Dispatch<IRatingAction>) => {
    axios
      .post(`${process.env.REACT_APP_API_SERVER}/api/rating`, {
        userid,
        // tslint:disable-next-line:object-literal-sort-keys
        comment, 
        trueClick
      }).then(res => {
        // tslint:disable-next-line:no-console
        console.log(res.data[0]);
        dispatch(updateHomeData(res.data))
      }).catch(err => {
        // tslint:disable-next-line:no-console
        console.log(err)
      });
  };
}
