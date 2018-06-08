
export default class RatingService {

    static knex: any;
    knex

    constructor (knex) {
        this.knex =knex;
    }

}
