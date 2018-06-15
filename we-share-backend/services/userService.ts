

class UserService {
  private knex;

  constructor(knex) {
    this.knex = knex;
  }

  // return 
  signup(input) {
    return this.knex('users').insert({name: input.name,'e-mail': input.email, password: input.password})
  }

  // login(input) {
  //   console.log(input);
  //   return this.knex('users').where({
  //     'e-mail': input.email,
  //     password: input.password
  //   }).select('e-mail', 'password')
  // }




}

export default UserService;


