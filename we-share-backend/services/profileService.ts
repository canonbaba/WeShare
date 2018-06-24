

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

}

export default ProfileService;