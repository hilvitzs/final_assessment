
exports.seed = (knex, Promise) => {
  return knex('inventory').del()
    .then(function () {
      return knex('inventory').insert([
        {
          title: ''
          colName: 'rowValue1'},
      ]);
    });
};
