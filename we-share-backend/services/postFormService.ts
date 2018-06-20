class PostFormService {
    private knex;
  
    constructor(knex) {
      this.knex = knex;
    }
  
    savepost(input) {
        // fontend dont pass data 'numberOfShareUser'
        return this.knex('post').insert({nameOfProduct: input.productName, price: input.productPrice, percentageOfPay: input.productPricePercent, numberOfShareUser: input.numberOfShareUser, description: input.productDescription, category_id: input.productCategory, photo: input.photoUrl, user_id: input.userid})
    }

  }
  
  export default PostFormService;