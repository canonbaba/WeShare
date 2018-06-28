class InboxService {
  private knex;

  constructor(knex) {
    this.knex = knex;
  }

  // async addMessages(input) {
  //   console.log("input", input)

  //   return this.knex.transaction(async (trx) => {
  //     try {

  //       const userIds = await trx
  //       .insert({ name: input.users,}, "id")
  //       .into("users");
  //       console.log("stage 1 ", userIds);

  //       const userMessageIds = await trx
  //       .insert({ message:input.messages, user_id:input.userid}, "id")
  //       .into("user_message");
  //       console.log("stage 2 ", userMessageIds);

  //     } catch (e) {
  //       console.log (e);
  //       return -1;
  //     }
  //   });
  // }

  joinRoom(input) {
    return this.knex('user_message').insert({
      user_id: input.userid, inbox_id: input.postID,
      message: input.loginName + ' join this room'
    })
      .then(() => {
        return this.knex('user_message').where({ inbox_id: input.postID }).join('users', 'user_id', '=', 'users.id').select('users.name', 'user_message.message', 'user_message.created_at', 'user_message.admin_id', 'user_message.inbox_id').orderBy('user_message.created_at', 'desc')
      })
  }

  insertMessage(input) {
    return this.knex('user_message').insert({
      user_id: input.userid, message: input.inputMessages, inbox_id: input.inboxId
    })
      .then(() => {
        return this.knex('user_message').where({ inbox_id: input.inboxId }).join('users', 'user_id', '=', 'users.id').select('users.name', 'user_message.message', 'user_message.created_at', 'user_message.admin_id', 'user_message.inbox_id').orderBy('user_message.created_at', 'desc')
      })
  }

  getInboxList(input) {
    // 1******i don't know why the result can show user_message.inbox_id, anyway it is part of what i need
    // 2******still do not handle result order
    return this.knex('user_message').innerJoin('inbox','user_message.inbox_id', '=' , 'inbox.id').innerJoin('post','inbox.post_id', '=', 'post.id').where({ 'user_message.user_id': input.userid }).distinct('user_message.inbox_id').select('post.nameOfProduct','post.price',)


    // return this.knex('user_message').where({ user_id: input.userid }).distinct('inbox_id').select()

    // .then((data) => {
    //   // console.log(data)

    //   return data.map((data) => {
    //      return this.knex('inbox').where({
    //       id: data.inbox_id
    //     }).join('post', 'post_id', '=', 'post.id').select('post.nameOfProduct','post.price')
    //   })
    // })
  }


  selectMessage(input) {
    return this.knex('user_message').where({ inbox_id: input.inboxId }).join('users', 'user_id', '=', 'users.id').select('users.name', 'user_message.message', 'user_message.created_at', 'user_message.admin_id', 'user_message.inbox_id').orderBy('user_message.created_at', 'desc')
  }


}

export default InboxService;