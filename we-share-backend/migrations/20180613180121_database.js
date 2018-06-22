exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', (user) => {
        user.increments();
        user.string("name");
        user.text("email");
        user.text("password");
        user.bigInteger("fbid");
        user.timestamps(false, true);
    }).then(() => {

        return knex.schema.createTable("contract", (contract) => {
            contract.increments();
            contract.string("productName");
            contract.text("price");
            contract.text("percentage");
            contract.text("dayToUse");
            contract.text("additionalRequest");
            contract.text("photo");
            contract.dateTime("createDate");
            contract.text("startDate");
            contract.text("expiryDate");
            contract.boolean("is_active");
            contract.boolean("is_confirm");
            contract.timestamps(false, true);
        });

    }).then(() => {
        return knex.schema.createTable("category", (category) => {
            category.increments();
            category.string("name");
            category.timestamps(false, true);
        });

    }).then(() => {
        return knex.schema.createTable("post", (post) => {
            post.increments();
            post.string("nameOfProduct");
            post.text("price")
            post.text("numberOfShareUser");
            post.string("percentageOfPay");
            post.text("location");
            post.text("description");
            post.text("photo");
            post.decimal("averageRating");
            post.dateTime("createDate");
            post.boolean("is_confirm");
            post.boolean("is_active");
            post.integer("user_id").unsigned();
            post.foreign("user_id").references("users.id");
            post.integer("category_id").unsigned();
            post.foreign("category_id").references("category.id");
            post.timestamps(false, true);
        });
    }).then(() => {
        return knex.schema.createTable("inbox", (inbox) => {
            inbox.increments();
            inbox.integer("post_id").unsigned().unique();
            inbox.foreign("post_id").references("post.id");
            inbox.boolean("is_create")
            inbox.timestamps(false, true);
        });
    }).then(() => {

        return knex.schema.createTable("user_inbox", (user_inbox) => {
            user_inbox.increments();
            user_inbox.integer("user_id").unsigned()
            user_inbox.foreign("user_id").references("users.id");
            user_inbox.integer("inbox_id").unsigned()
            user_inbox.foreign("inbox_id").references("inbox.id");
            user_inbox.timestamps(false, true);
        });
    }).then(() => {

        return knex.schema.createTable("user_message", (user_message) => {
            user_message.increments();
            user_message.text("message");
            user_message.dateTime("mess_createTime")
            user_message.integer("user_id").unsigned()
            user_message.foreign("user_id").references("users.id");
            user_message.integer("inbox_id").unsigned()
            user_message.foreign("inbox_id").references("inbox.id");
            user_message.timestamps(false, true);
        });
    }).then(() => {

        return knex.schema.createTable("user_contract", (user_contract) => {
            user_contract.increments();
            user_contract.string("percentageToShare");
            user_contract.text("daysToUse");
            user_contract.boolean("is_agree");
            user_contract.integer("contract_id").unsigned();
            user_contract.foreign("contract_id").references("contract.id");
            user_contract.integer("user_id").unsigned();
            user_contract.foreign("user_id").references("users.id");
            user_contract.timestamps(false, true);

        });

    }).then(() => {
        return knex.schema.createTable("rating", (rating) => {
            rating.increments();
            rating.decimal("rating");
            rating.text("comment");
            rating.integer("commentator_id");
            rating.boolean("is_active")
            rating.integer("user_id").unsigned();
            rating.foreign("user_id").references("users.id");
            rating.timestamps(false, true);
        });

    })
}

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('rating')
        .then(() => knex.schema.dropTable('user_contract'))
        .then(() => knex.schema.dropTable('user_inbox'))
        .then(() => knex.schema.dropTable('user_message'))
        .then(() => knex.schema.dropTable('inbox'))
        .then(() => knex.schema.dropTable('post'))
        .then(() => knex.schema.dropTable('category'))
        .then(() => knex.schema.dropTable('contract'))
        .then(() => knex.schema.dropTable('users'))
}