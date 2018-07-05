import axios from "axios";
import { Dispatch } from "react-redux";
import swal from 'sweetalert';


export const LOAD_CONTRACTS = 'LOAD_CONTRACTS';
type LOAD_CONTRACTS = typeof LOAD_CONTRACTS;

export const USER_CONTRACTS_CONFIRMATION = 'USER_CONTRACTS_CONFIRMATION';
type USER_CONTRACTS_CONFIRMATION = typeof USER_CONTRACTS_CONFIRMATION;

export interface ILoadContractsAction {
   type: LOAD_CONTRACTS;
   loadContracts:ILoadContractsData
}

export interface IUserConfirmationAction {
   type: USER_CONTRACTS_CONFIRMATION;
   is_agree: boolean;
}

export interface ILoadContractsData{
   contractId: number;
   productName: string;
   price: number;
   participants: IContractsParticipant[];
   description: string;
}

// suppose defined this in model
export interface IContractsParticipant{
   userId:number;
   name:string;
   percentageToShare:string;
   daysToUse:string;
 }

export type IFetchContractsAction = ILoadContractsAction | IUserConfirmationAction;


// tslint:disable-next-line:variable-name
export function userConfirmation(is_agree: boolean): IUserConfirmationAction {
   // tslint:disable-next-line:no-console
   return {
       is_agree,
       type: USER_CONTRACTS_CONFIRMATION
   };
}

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
   swal("Save Successful");
   return (dispatch: Dispatch<IFetchContractsAction>) => {
       axios
           .post(`${process.env.REACT_APP_API_SERVER}/api/signContracts/sign`, {
               agree,
               disagree,
               // tslint:disable-next-line:object-literal-sort-keys
               contractId,
               userid
           }).then(res => {
               // tslint:disable-next-line:no-console
               console.log(res.data);
               dispatch(userConfirmation(res.data))
              
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


