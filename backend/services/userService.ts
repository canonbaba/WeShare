
export default class UserService {

    static knex: any;
    knex

    constructor (knex) {
        this.knex =knex;
    }

}

