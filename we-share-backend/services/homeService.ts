class HomeService {
    private knex;
  
    constructor(knex) {
      this.knex = knex;
    }
  
    homedata() {
         return this.knex('post').where({ is_active: true }).select('id','nameOfProduct','price','numberOfShareUser','percentageOfPay','description', 'category_id', 'photo','averageRating', 'user_id',  'created_at').orderBy('created_at','desc')
    }

  }
  
  export default HomeService;