const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const app = express();
const config = require('dotenv').config();

app.locals.title = 'AmazonBay';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('app'));

app.set('port', process.env.PORT || 3000);

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, '/app/index.html'));
});

app.get('/api/v1/inventory', (request, response) => {
  database('inventory').select()
  .then(inventoryItems => {
    if(inventoryItems) {
      response.status(200).json(inventoryItems)
    } else {
      return response.status(400).json({
        error: 'There are no inventoryItems'
      })
    }
  })
  .catch(error => {
    response.status(500).json({ error })
  })
})

app.get('/api/v1/order_history', (request, response) => {
  database('order_history').select()
  .then(orders => {
    if(orders) {
      response.status(200).json(orders)
    } else {
      return response.status(400).json({
        error: 'There are no orders'
      }
    )}
  })
  .catch(error => {
    response.status(500).json({ error })
  })
})

app.post('/api/v1/order_history', (request, response) => {
  const order = request.body;

  database('order_history').insert(order, 'id')
  .then(order => {
    if(order) {
      response.status(201).json({ id: order[0] })
    } else {
      response.status(201).json({ error: 'You are missing a property'});
    }
  })
  .catch(error => {
    response.status(500).json({ error });
  })
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})

module.exports = app;
