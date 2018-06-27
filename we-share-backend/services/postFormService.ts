class PostFormService {
    private knex;
  
    constructor(knex) {
      this.knex = knex;
    }
  
    savepost(input) {
        return this.knex('post').insert({nameOfProduct: input.productName, price: input.productPrice, percentageOfPay: input.productPricePercent, numberOfShareUser: input.numberOfShareUser, description: input.productDescription, category_id: input.productCategory, photo: input.photoUrl, user_id: input.userid, is_active: 'true'}).returning('id')
        .then(data => {
          // console.log(typeof input[0])
          // *** create inbox room
          return this.knex('inbox').insert({post_id: data[0], is_active: true}).returning('id')
        })
        .then((data)=>{
          // add adminID and related inboxID
          return this.knex('user_message').insert({inbox_id: data[0], admin_id: input.userid, user_id: input.userid})
        })


    }



  }
  
  export default PostFormService;