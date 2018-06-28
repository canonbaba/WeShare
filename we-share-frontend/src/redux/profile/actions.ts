import axios from 'axios';
import { Dispatch } from 'redux';
import { IContractDetail, IProfileContractData, IProfilePostData, IProfileRatingData } from 'src/models';

export const LOAD_PROFILEPOST = 'LOAD_PROFILEPOST';
export type LOAD_PROFILEPOST = typeof LOAD_PROFILEPOST;

export const LOAD_PROFILERATING = 'LOAD_PROFILERATING';
export type LOAD_PROFILERATING = typeof LOAD_PROFILERATING;

export const LOAD_PROFILECONTRACT = 'LOAD_PROFILECONTRACT';
export type LOAD_PROFILECONTRACT = typeof LOAD_PROFILECONTRACT;

export const LOAD_CONTRACTDETAIL = 'LOAD_CONTRACTDETAIL';
export type LOAD_CONTRACTDETAIL = typeof LOAD_CONTRACTDETAIL;


export interface IProfilePostAction {
    type: LOAD_PROFILEPOST;
    profilePost: IProfilePostData[];
}

export interface IProfileRatingAction {
    type: LOAD_PROFILERATING;
    profileRating: IProfileRatingData[];
}

export interface IProfileContractAction {
    type: LOAD_PROFILECONTRACT;
    profileContract: IProfileContractData[];
}

export interface IContractDetailAction {
    type: LOAD_CONTRACTDETAIL;
    contractDetail: IContractDetail[];
}

export type IProfileDataAction = IProfilePostAction | IProfileRatingAction | IProfileContractAction | IContractDetailAction;


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

export function getProfileContractData(profileContract: IProfileContractData[]): IProfileDataAction {
    // tslint:disable-next-line:no-console
    return {
        // tslint:disable-next-line:object-literal-shorthand
        profileContract,
        type: LOAD_PROFILECONTRACT
    };
}

export function getContractDetailData(contractDetail: IContractDetail[]): IProfileDataAction {
    // tslint:disable-next-line:no-console
    return {
        // tslint:disable-next-line:object-literal-shorthand
        contractDetail,
        type: LOAD_CONTRACTDETAIL
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


            axios
            .post(`${process.env.REACT_APP_API_SERVER}/api/profile/contractdata`, {
                userid,
            }).then(res => {
                // tslint:disable-next-line:no-console
                console.log(res.data)
                dispatch(getProfileContractData(res.data))
            }).catch(err => {
                // tslint:disable-next-line:no-console
                console.log(err)
            });
    };
}


export function contractDetailData(contractId: number) {
    // // tslint:disable-next-line:no-console
    // console.log(contractId);
    return (dispatch: Dispatch<IProfileDataAction>) => {
        axios
            .post(`${process.env.REACT_APP_API_SERVER}/api/profile/contract_detail_data`, {
                contractId,
            }).then(res => {
                // tslint:disable-next-line:no-console
                console.log(res.data)
                dispatch(getContractDetailData(res.data))
            }).catch(err => {
                // tslint:disable-next-line:no-console
                console.log(err)
            });
    };
}
