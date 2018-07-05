import { IFetchContractsAction, ILoadContractsData, LOAD_CONTRACTS, USER_CONTRACTS_CONFIRMATION } from "./actions";

export interface ISignContractsState {

 loadContracts: ILoadContractsData[];
 is_agree: boolean;
}

const initialState = {
 loadContracts: [],
 // tslint:disable-next-line:object-literal-sort-keys
 is_agree: false,
};
export const reducer = (oldState: ISignContractsState = initialState, action: IFetchContractsAction) => {
 switch (action.type) {
   case LOAD_CONTRACTS:
     {
       const loadContracts = oldState.loadContracts.filter(loadContract => loadContract.contractId !== action.loadContracts.contractId);
       loadContracts.push({
         contractId: action.loadContracts.contractId,
         productName: action.loadContracts.productName,
         // tslint:disable-next-line:object-literal-sort-keys
         price: action.loadContracts.price,
         participants: action.loadContracts.participants,
         description: action.loadContracts.description
       });
       return { ...oldState, loadContracts };

     }
   case USER_CONTRACTS_CONFIRMATION:
     {
       return {
         ...oldState,
         is_agree: action.is_agree
       };
     }
   default:
     return oldState;
 }
};






