import { IFetchContractsAction, ILoadContractsData, LOAD_CONTRACTS } from "./actions";

export interface ISignContractsState {
 
   loadContracts:ILoadContractsData[];

 }

const initialState = {
   loadContracts: []
};
  export const reducer = (oldState: ISignContractsState = initialState, action: IFetchContractsAction) => {
   switch (action.type) {
     case LOAD_CONTRACTS:
     {
     const loadContracts = oldState.loadContracts.concat({
       contractId:action.loadContracts.contractId,
       productName: action.loadContracts.productName,
       // tslint:disable-next-line:object-literal-sort-keys
       price: action.loadContracts.price,
       participants: action.loadContracts.participants,
       description: action.loadContracts.description
   });
       return { ...oldState, loadContracts };

      }


     default:
       return oldState;
   }
 };




