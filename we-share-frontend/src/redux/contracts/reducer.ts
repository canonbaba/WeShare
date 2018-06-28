import { IContracts } from "src/models";
import { ADD_CONTRACTS, EDIT_CONTRACTS, IContractsActions } from "src/redux/contracts/actions";

export interface IContractsState {
    contracts: IContracts[];
}
const initialState = {
    contracts: []
};
export function reducer(oldState: IContractsState = initialState, action: IContractsActions) {

    switch (action.type) {
        case ADD_CONTRACTS:
            {
                const contracts = oldState.contracts.concat([{
                    id: Date.now(),
                    product: action.product,
                    // tslint:disable-next-line:object-literal-sort-keys
                    price: action.price,
                    participants: action.participants,
                    description: action.description,
                    userid:action.userid
                }]);
                return { ...oldState, contracts };
            }
        case EDIT_CONTRACTS:
            {
                const contracts = oldState.contracts.filter(contract => contract.id !== action.id);
                contracts.push({
                    id: action.id,
                    product: action.product,
                    // tslint:disable-next-line:object-literal-sort-keys
                    price: action.price,
                    participants: action.participants,
                    description: action.description,
                    userid:action.userid
                });
                return { ...oldState, contracts };
            }
        // case DELETE_CONTRACTS:
        //     {
        //         const contracts = oldState.contracts.filter(contract => contract.id !== action.id);
        //         return { ...oldState, contracts };
        //     }

        // // tslint:disable-next-line:label-position
        // case CLEAR_CONTRACTS:
        //     {

        //         return { ...oldState, contracts: [] };
        //     }
    }
    return oldState;



}