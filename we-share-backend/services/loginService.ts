class LoginService {
  private knex;

  constructor(knex) {
    this.knex = knex;
  }

  login(input) {
    return this.knex('users').where({
      email: input.email,
      password: input.password
    }).select('email', 'password', 'id', 'name')
  }

}

export default LoginService;