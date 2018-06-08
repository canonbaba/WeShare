
export default class ProfileService {

    static knex: any;
    knex

    constructor (knex) {
        this.knex =knex;
    }

}
