
export default class PostTableService {

    static knex: any;
    knex

    constructor (knex) {
        this.knex =knex;
    }

}
