import { Promise as BlueBirdPromise } from 'bluebird';

class RatingService {
  private knex;

  constructor(knex) {
    this.knex = knex;
  }

  saverating(input) {
    // 1. commentator_id for search user name
    // 2. not insert, it should be update
    return this.knex('rating').insert({ commentator_id: input.userid, rating: input.trueClick, comment: input.comment })
      .then((data) => {
        return this.knex.raw('SELECT AVG(rating), user_id FROM rating GROUP BY user_id')
      })
      .then((data) => {
        // return console.log(data.rows)

        return BlueBirdPromise.map(data.rows, (data: any) => {
          // Promise.map awaits for returned promises as well.
          return this.knex('post').update({averageRating: data.avg }).where({user_id: data.user_id })
        });
      })
  }
}

export default RatingService;