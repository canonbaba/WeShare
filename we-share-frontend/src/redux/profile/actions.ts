import axios from 'axios';
import { Dispatch } from 'redux';
import { IProfilePostData, IProfileRatingData } from 'src/models';

export const LOAD_PROFILEPOST = 'LOAD_PROFILEPOST';
export type LOAD_PROFILEPOST = typeof LOAD_PROFILEPOST;

export const LOAD_PROFILERATING = 'LOAD_PROFILERATING';
export type LOAD_PROFILERATING = typeof LOAD_PROFILERATING;


export interface IProfilePostAction {
    type: LOAD_PROFILEPOST;
    profilePost: IProfilePostData[];
}

export interface IProfileRatingAction {
    type: LOAD_PROFILERATING;
    profileRating: IProfileRatingData[];
}

export type IProfileDataAction = IProfilePostAction | IProfileRatingAction;


export function getProfilePostData(profilePost: IProfilePostData[]): IProfileDataAction {
    return {
        // tslint:disable-next-line:object-literal-shorthand
        profilePost,
        type: LOAD_PROFILEPOST
    };
}

export function getProfileRatingData(profileRating: IProfileRatingData[]): IProfileDataAction {
    return {
        // tslint:disable-next-line:object-literal-shorthand
        profileRating,
        type: LOAD_PROFILERATING
    };
}


export function fetchProfilePostData(userid: number) {
    // console.log(userid);
    return (dispatch: Dispatch<IProfileDataAction>) => {
        axios
            .post(`${process.env.REACT_APP_API_SERVER}/api/profile`, {
                userid,
            }).then(res => {
                // tslint:disable-next-line:no-console
                // console.log(res.data)
                dispatch(getProfilePostData(res.data))
            }).catch(err => {
                // tslint:disable-next-line:no-console
                console.log(err)
            });


        axios
            .post(`${process.env.REACT_APP_API_SERVER}/api/profile/ratingdata`, {
                userid,
            }).then(res => {
                // tslint:disable-next-line:no-console
                console.log(res.data)
                dispatch(getProfileRatingData(res.data))
            }).catch(err => {
                // tslint:disable-next-line:no-console
                console.log(err)
            });
    };
}
