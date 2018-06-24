class RatingService {
  private knex;

  constructor(knex) {
    this.knex = knex;
  }

  saverating(input) {
    // commentator_id for search user name
    return this.knex('rating').insert({ commentator_id: input.userid, rating: input.trueClick, comment: input.comment })
      .then((data) => {
        return this.knex.raw('SELECT AVG(rating), user_id FROM rating GROUP BY user_id')
      })
      .then((data) => {
        // return data.map(data => {
        //   return this.knex('post').update({averageRating: data.rows.avg }).where({user_id: data.rows.user_id })
        // })

        // console.log(data.rows)

        // return this.knex('post').update({averageRating: 3 }).where({user_id: 7})

        return this.knex('post').where({ is_active: true }).select('id','nameOfProduct','price','numberOfShareUser','percentageOfPay','description', 'category_id', 'photo','averageRating', 'user_id',  'created_at').orderBy('created_at','desc')
      })
  }
}

export default RatingService;