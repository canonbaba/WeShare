

class UserService {
  private knex;

  constructor(knex) {
    this.knex = knex;
  }

  // return 
  signup(input) {
    return this.knex('users').insert({name: input.name,'e-mail': input.email,password: input.password})
  }

  login() {

  }




}

export default UserService;


