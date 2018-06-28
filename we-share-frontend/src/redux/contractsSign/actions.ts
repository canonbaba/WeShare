import axios from "axios";
import { Dispatch } from "react-redux";
import swal from 'sweetalert';


export const LOAD_CONTRACTS = 'LOAD_CONTRACTS';
type LOAD_CONTRACTS = typeof LOAD_CONTRACTS;

export interface ILoadContractsAction {
    type: LOAD_CONTRACTS;
    loadContracts:ILoadContractsData
   
}

export interface ILoadContractsData{

    contractId: number;
    productName: string;
    price: number;
    participants: IContractsParticipant[];
    description: string;

}


export interface IContractsParticipant{

    userId:number;
    name:string;
    percentageToShare:string;
    daysToUse:string;
  
  }


export type IFetchContractsAction = ILoadContractsAction ;


export function fetchContracts(contractId:number) {
    // tslint:disable-next-line:no-console
    console.log("contract ID:", contractId);
    return (dispatch: Dispatch<any>) => {
        axios
            .post(`${process.env.REACT_APP_API_SERVER}/api/signContracts`, {
                contractId,
            }).then(res => {
                // tslint:disable-next-line:no-console
                // console.log(res.data)
                dispatch(loadContracts(res.data))
            }).catch(err => {
                // tslint:disable-next-line:no-console
                console.log(err)
            });
    };
}

export function fetchSignContract(
    agree: boolean,
    disagree:boolean,
    contractId:number,
    userid:number,
) {
    // tslint:disable-next-line:no-console
    return (dispatch: Dispatch<any>) => {
        axios
            .post(`${process.env.REACT_APP_API_SERVER}/api/signContracts/sign`, {
                agree,
                disagree,
                // tslint:disable-next-line:object-literal-sort-keys
                contractId,
                userid
            }).then(res => {
                swal('Success save');
                // dispatch(addSignData(res.data))
            }).catch(err => {
                // tslint:disable-next-line:no-console
                console.log(err)
            });

    };
}

// tslint:disable-next-line:no-shadowed-variable
export function loadContracts(loadContracts:ILoadContractsData): ILoadContractsAction {
    // tslint:disable-next-line:no-console
    return {
        // tslint:disable-next-line:object-literal-shorthand
        loadContracts,
        type: LOAD_CONTRACTS
    };
}
