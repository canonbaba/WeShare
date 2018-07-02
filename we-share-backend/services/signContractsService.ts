import { default as joinjs } from 'join-js'; 

class SignContractsService {
    private resultMaps: Array<Object>;


    constructor(private knex) {
        this.knex = knex;
        this.resultMaps = [
            {
                mapId: 'contractMap',
                idProperty: 'contractId',
                properties: ['productName', 'price', 'description'],
                collections: [
                    { name: 'participants', mapId: 'participantsMap', columnPrefix: 'participants_' } 
                ]
            },
            {
                mapId: 'participantsMap',
                idProperty: 'userId',
                properties: ['name', "percentageToShare", "daysToUse"]
            }
        ]
    }

    getContracts(input) {

        return this.knex('contract').select(
                'contract.id                        as contract_contractId',
                'contract.productName               as contract_productName',
                'contract.price                     as contract_price',
                'contract.description               as contract_description',
                'users.id                           as participants_userId',
                'users.name                         as participants_name',
                'user_contract.percentageToShare    as participants_percentageToShare',
                'user_contract.daysToUse            as participants_daysToUse'
            )
            .join('user_contract', 'contract.id', 'contract_id')
            .join('users', 'user_contract.user_id', 'users.id')
            .andWhere('contract.id', input.contractId)
            .then((result) => {
                return result && result.length > 0 ? joinjs.mapOne(result, this.resultMaps, 'contractMap', 'contract_') : null;
            })

    }

 
// async postSignData (input){
//     console.log("input", input)

//     return this.knex.transaction(async (trx) => {
//       try {
       

//         await trx
//         .insert({ contract_id:input.contractId, user_id:input.userid,
            
//             is_agree: (input.agree === true) ? true: (input.disagree = true) ? false : false
//          })

//         .into("user_contract");
//         // console.log("stage 1 ", constractId);
//         // return constractId;

//       } catch (e) {
//         console.log (e);
//         return -1;
//       }
//     });
//   }

postSignData (input) {
    return this.knex('user_contract').where({ user_id: input.userid, contract_id: input.contractId }).update({is_agree: input.agree})
    .then(data => {
        return this.knex('user_contract').where({ contract_id: input.contractId }).distinct('is_agree')
    })
    .then(data => {
        if(data[0].is_agree === true) {
            return this.knex('contract').where({ id: input.contractId }).update({ is_confirm: true })
        }
    })
    .then(() => {
        // forgot why I select 'is_agree', it seems useless, it can be deleted, is_agree(in **Action) also can be deleted
        return this.knex('user_contract').where({ user_id: input.userid, contract_id: input.contractId }).select('is_agree')
    })
}


                

}

// export interface ILoadContractsData{

//     id: number;
//     product: string;
//     price: number;
//     participants: IParticipant[];
//     description: string;

// }

// export interface IParticipant {

//     id:number;
//     participantName:string;
//     percentage:string;
//     dayToUse:string;

//     }

export default SignContractsService;
