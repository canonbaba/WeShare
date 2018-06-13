

class UserService {

  static knex: any;
  knex;

  constructor(knex) {
    this.knex = knex;
  }

  signup(input) {
    knex('user').insert({name: input.name}, {email: input.password}, {password: input.password})
  }

  login() {

  }




}

export default UserService;


