exports.seed = (knex, Promise) => {
  return knex('inventory').del()
    .then(() => knex('order_history').del())
    .then(() => {
      return Promise.all([
        knex('inventory').insert(
          {
            title: 'lorem',
            description: 'lorem ipsum',
            image: 'https://www.americanologist.com/wp-content/uploads/2014/03/army-green-duffel-bag-owen-and-fred_grande.png',
            price: '29.99'
          }, 'id'),
        knex('inventory').insert(
          {
            title: 'lorem2',
            description: 'lorem ipsum 2',
            image: 'https://www.americanologist.com/wp-content/uploads/2014/03/army-green-duffel-bag-owen-and-fred_grande.png',
            price: '39.99'
          }, 'id'),
        knex('inventory').insert(
          {
            title: 'lorem3',
            description: 'lorem ipsum 3',
            image: 'https://www.americanologist.com/wp-content/uploads/2014/03/army-green-duffel-bag-owen-and-fred_grande.png',
            price: '49.99'
          }, 'id'),
        knex('order_history').insert(
          {
            total_price: 149.99,
          }, 'id'),
        knex('order_history').insert(
          {
            total_price: 110.00,
          }, 'id')
      ]);
    });
};
