class LoginService {
  private knex;

  constructor(knex) {
    this.knex = knex;
  }

  login(input) {
    return this.knex('users').where({
      'e-mail': input.email,
      password: input.password
    }).select('e-mail', 'password')
  }




}

export default LoginService;