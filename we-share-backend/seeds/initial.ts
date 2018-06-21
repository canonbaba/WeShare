
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('category').del()
    .then(function () {
      // Inserts seed entries
      return knex('category').insert([
        {id: 1, name: 'fashion'},
        {id: 2, name: 'electric product'},
        {id: 3, name: 'vehicle'},
        {id: 4, name: 'food & drink'},
        {id: 5, name: 'toy'},
        {id: 6, name: 'others'},
      ]);
    });
};
