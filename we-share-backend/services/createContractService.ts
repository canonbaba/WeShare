// import { Promise as BlueBirdPromise } from 'bluebird';

export default class CreateContractService {

 static knex: any;
 knex;

 constructor(knex) {
   this.knex = knex;
 }

 async createContract(input) {
   console.log("input", input)

   return this.knex.transaction(async (trx) => {
     try {
     

       const constractId = await trx
       .insert({ productName: input.product, price: input.price, creatorId:input.userid, description: input.description, is_active: true, is_confirm:false }, "id")
       .into("contract");
       console.log("stage 1 ", constractId);

       const participantNames = input.participants.map((participant: any)=> participant.participantName)
       console.log("participantNames", participantNames);
       const users = await trx('users').select('id', 'name').whereIn('name', participantNames)
      
       console.log("stage 2", users);
       const userContracts = users.map((user: any) => {
         const participantInfo = input.participants.find((participant: any) => participant.participantName === user.name);

         return {
           contract_id: constractId[0],
           percentageToShare: participantInfo.percentage,
           daysToUse: participantInfo.dayToUse,
           is_agree: false,
           user_id: user.id
         }
       });
       console.log("stage 3", userContracts);
      
       return trx
       .insert(userContracts)
       .into("user_contract");



         // return trx
             // .insert({
             //   contract_id: constractId[0],
             //   percentageToShare: participant.percentage,
             //   daysToUse: participant.daytToUse,
             //   is_agree: false,
             //   user_id: id
             // })
             // .into("user_contract");
      
       return constractId;
     } catch (e) {
       console.log (e);
       return -1;
     }
   });
 }
}
