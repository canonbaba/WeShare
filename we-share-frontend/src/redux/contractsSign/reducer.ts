import { IFetchContractsAction, ILoadContractsData, LOAD_CONTRACTS, USER_CONTRACTS_CONFIRMATION } from "./actions";

export interface ISignContractsState {
    loadContracts:ILoadContractsData;
    is_agree: boolean;
  }
  
  const initialState = {

    loadContracts: {
        contractId: 0,
        productName: '',
        // tslint:disable-next-line:object-literal-sort-keys
        price: 0,
        participants: [{
            userId:0,
            // tslint:disable-next-line:object-literal-sort-keys
            name:'',
            percentageToShare:'',
            daysToUse:'',
          },{
            userId:0,
            // tslint:disable-next-line:object-literal-sort-keys
            name:'',
            percentageToShare:'',
            daysToUse:'',
          },{
            userId:0,
            // tslint:disable-next-line:object-literal-sort-keys
            name:'',
            percentageToShare:'',
            daysToUse:'',
          },
          {
            userId:0,
            // tslint:disable-next-line:object-literal-sort-keys
            name:'',
            percentageToShare:'',
            daysToUse:'',
          }
        ],
        description: '',
    },
    // tslint:disable-next-line:object-literal-sort-keys
    is_agree: false,
  };
  
  export const reducer = (oldState: ISignContractsState = initialState, action: IFetchContractsAction) => {
    switch (action.type) {
      case LOAD_CONTRACTS:
      {
        return {
          ...oldState,
          loadContracts: action.loadContracts
        };
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