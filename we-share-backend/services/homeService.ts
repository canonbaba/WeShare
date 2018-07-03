class HomeService {
  private knex;

  constructor(knex) {
    this.knex = knex;
  }

  homedata() {
    return this.knex('post').where({ is_active: true }).select('id', 'nameOfProduct', 'price', 'numberOfShareUser', 'percentageOfPay', 'description', 'category_id', 'photo', 'averageRating', 'user_id as userId', 'created_at').orderBy('created_at', 'desc')
  }

  categorydata(input) {

    if (input.selectCategoryId === '1000') {
      return this.knex.select('id', 'nameOfProduct', 'price', 'numberOfShareUser', 'percentageOfPay', 'description', 'category_id', 'photo', 'averageRating', 'user_id as userId', 'created_at').from('post').orderBy('created_at', 'desc')
    } else {
      return this.knex('post').where({ is_active: true, category_id: input.selectCategoryId }).select('id', 'nameOfProduct', 'price', 'numberOfShareUser', 'percentageOfPay', 'description', 'category_id', 'photo', 'averageRating', 'user_id as userId', 'created_at').orderBy('created_at', 'desc')
    }

  }

}

export default HomeService;