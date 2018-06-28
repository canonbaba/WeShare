import { IFetchContractsAction, ILoadContractsData, LOAD_CONTRACTS } from "./actions";

export interface ISignContractsState {
   
    loadContracts:ILoadContractsData;

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
    
    }
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

      default:
        return oldState;
    }
  };