
export default class InboxTableService {

    static knex: any;
    knex

    constructor (knex) {
        this.knex =knex;
    }

}
