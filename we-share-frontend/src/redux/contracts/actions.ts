import axios from 'axios';
import { Dispatch } from "react-redux";
import { IParticipant } from "src/models";

export const ADD_CONTRACTS = 'ADD_CONTRACTS';
type ADD_CONTRACTS = typeof ADD_CONTRACTS;

export const EDIT_CONTRACTS = 'EDIT_CONTRACTS';
type EDIT_CONTRACTS = typeof EDIT_CONTRACTS;

// export const DELETE_CONTRACTS = 'DELETE_CONTRACTS';
// type DELETE_CONTRACTS = typeof DELETE_CONTRACTS;

// export const CLEAR_CONTRACTS = 'CLEAR_CONTRACTS';
// type CLEAR_CONTRACTS = typeof CLEAR_CONTRACTS;

export interface IAddContractsAction {
    type: ADD_CONTRACTS;
    id: number;
    product: string;
    price: number;
    participants: IParticipant[];
    description: string;
    userid:number
}

export interface IEditContractsAction {
    type: EDIT_CONTRACTS;
    id: number;
    product: string;
    price: number;
    participants: IParticipant[];
    description: string;
    userid:number;
}

// export interface IDeleteContractsAction {
//     type: DELETE_CONTRACTS;
//     id: number;
// }

// export interface IClearContractsAction {
//     type: CLEAR_CONTRACTS;
// }

export type IContractsActions = IAddContractsAction | IEditContractsAction /*| IDeleteContractsAction | IClearContractsAction*/;

export function remoteAddContracts(
    id: number,
    product: string,
    price: number,
    participants:IParticipant[],
    description: string,
    userid:number ) { 
// tslint:disable-next-line:no-console
return (dispatch: Dispatch) => { 
axios.post(`${process.env.REACT_APP_API_SERVER}/api/contract`, {

    id,
    product,
    // tslint:disable-next-line:object-literal-sort-keys
    price,
    participants,
    description,
    userid

}).then(resp => {
dispatch(addContracts(
    resp.data.id,
    product,
    // tslint:disable-next-line:object-literal-sort-keys
    price,
    participants,
    description,
    userid
    ));
});
};
}

export function remoteEditContracts( 
    id: number,
    product: string,
    price: number,
    participants:IParticipant[],
    description: string,
    userid:number ) {
    return (dispatch: Dispatch) => {
        axios.put(`${process.env.REACT_APP_API_SERVER}/api/contract`, {
            id,
            product,
            // tslint:disable-next-line:object-literal-sort-keys
            price,
            participants,
            description,
            userid
        }).then(resp => {
            dispatch(editContracts(
                resp.data.id,
                product,
                // tslint:disable-next-line:object-literal-sort-keys
                price,
                participants,
                description,
                userid
                ));
            });
            };
            }


export function addContracts(
    id: number,
    product: string,
    price: number,
    participants:IParticipant[],
    description: string,
    userid:number) {
    return {
        id,
        product,
        // tslint:disable-next-line:object-literal-sort-keys
        price,
        participants,
        description,
        userid,
        type: ADD_CONTRACTS
    };
}

export function editContracts(
    id: number,
    product: string,
    price: number,
    participants: IParticipant[],
    description: string,
    userid:number ) {
    return {
        id,
        product,
        // tslint:disable-next-line:object-literal-sort-keys
        price,
        participants,
        description,
        userid,
        type: EDIT_CONTRACTS
    };
}
// export function deleteContracts(id: number) {
//     return {
//         id,
//         type: DELETE_CONTRACTS,
//     };
// }

// export function clearContracts() {
//     return {
//         type: CLEAR_CONTRACTS,
//     };
// }

