

class UserService {
  private knex;

  constructor(knex) {
    this.knex = knex;
  }

  signup(input) {
      return this.knex('users').insert({name: input.name,email: input.email, password: input.password})
    .then((result) => {
      return result = 'success sign up'
    }).catch(err => {return err})
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


