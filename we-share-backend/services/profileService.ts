

class ProfileService {

  static knex: any;
  knex;

  constructor(knex) {
    this.knex = knex;
  }

  profilePostdata(input) {
    return this.knex('post').where({
      user_id: input.userid,
      is_active: true
    }).select('nameOfProduct','price','numberOfShareUser','percentageOfPay','description','photo')
  }

  profileRatingdata(input){
    
    return this.knex('rating').where({
      user_id: input.userid
    }).join('users', 'commentator_id', '=', 'users.id').select('users.name','rating.comment','rating.rating','rating.updated_at')
  }

  profileContractData(input){
    console.log(input);
    return this.knex('contract').select(
            'contract.id as contractId',
            'contract.productName',
            'contract.price',
            'contract.is_confirm',
            'users.id as user_id',
            'users.name')
    .join('user_contract', 'contract.id', 'user_contract.contract_id')
    .join('users','user_contract.user_id','users.id')
    .andWhere('is_confirm', false)
    .andWhere('users.id', input.userid);
  }

  getDetailContractData(input) {
    return this.knex('user_contract').innerJoin('users','user_contract.user_id', '=', 'users.id').innerJoin('contract','user_contract.contract_id', '=', 'contract.id').where({'user_contract.contract_id': input.contractId }).select('user_contract.contract_id','user_contract.user_id','user_contract.percentageToShare','user_contract.daysToUse','user_contract.is_agree','users.name','contract.productName','contract.price','contract.description','contract.created_at',)
  }


}

export default ProfileService;