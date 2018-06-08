exports.up = function(knex, Promise) {
    return knex.schema.createTable('user',(user)=>{
    user.increments();
    user.string("name");
    user.string("email");
    user.text("password");
    user.bigInteger("fbid");
    user.timestamps(false,true);
    }).then(()=>{

        return knex.schema.createTable("contract",(contract)=>{
            contract.increments();
            contract.string("productName");
            contract.integer("price").unsigned();
            contract.string("percentageToShare");
            contract.text("daysToUse");
            contract.text("additonalRequest");
            contract.text("photo");
            contract.dateTime("createDate");
            contract.text("startDate");
            contract.text("expiryDate");
            contract.boolean("is_active");
            contract.boolean("is_confirm");
            contract.timestamps(false,true);
            });

    }).then(()=>{
    return knex.schema.createTable("post",(post)=>{
    post.increments();
    post.string("nameOfProduct");
    post.integer("price").unsigned();
    post.integer("numberOfShareUser");
    post.string("percentageOfPay");
    post.text("location");
    post.text("description");
    post.text("photo");
    post.string("category");
    post.decimal("averageuser_contract");
    post.dateTime("createDate");
    post.boolean("is_confirm");
    post.boolean("is_active");
    post.integer("user_id").unsigned();
    post.foreign("user_id").references("user.id");
    post.timestamps(false,true);
    });

    }).then(()=>{
    return knex.schema.createTable("inbox",(inbox)=>{
    inbox.increments();
    inbox.integer("post_id").unsigned().unique();
    inbox.foreign("post_id").references("post.id");
    inbox.boolean("is_active")
    inbox.timestamps(false,true);
    });
    }).then(()=>{

        return knex.schema.createTable("user_inbox",(user_inbox)=>{
            user_inbox.increments();
            user_inbox.text("message");
            user_inbox.integer("user_id").unsigned();
            user_inbox.foreign("user_id").references("user.id");
            user_inbox.integer("inbox_id").unsigned();
            user_inbox.foreign("inbox_id").references("inbox.id");
            user_inbox.boolean("is_active");
            user_inbox.timestamps(false,true);
    });
    }).then(()=>{

        return knex.schema.createTable("user_contract",(user_contract)=>{
            user_contract.increments();
            user_contract.integer("user_id").unsigned();
            user_contract.foreign("user_id").references("user.id");
            user_contract.integer("contract_id").unsigned();
            user_contract.foreign("contract_id").references("contract.id");
            user_contract.timestamps(false,true);

        });   

    }).then(()=>{

        return knex.schema.createTable("rating",(rating)=>{
            rating.increments();
            rating.decimal("rating");
            rating.text("comment");
            rating.string("commentatorName");
            rating.boolean("is_active");
            rating.timestamps(false,true);
        });   
    })
    }
    
    exports.down = function(knex,Promise){
        return knex.schema.dropTable('rating')
                .then(()=>knex.schema.dropTable('user_contract'))
                .then(()=>knex.schema.dropTable('user_inbox'))
                .then(()=>knex.schema.dropTable('inbox'))
                .then(()=>knex.schema.dropTable('post'))
                .then(()=>knex.schema.dropTable('contract'))
                .then(()=>knex.schema.dropTable('post'))
                .then(()=>knex.schema.dropTable('user'));
        
    }
