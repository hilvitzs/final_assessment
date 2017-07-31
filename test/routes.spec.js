process.env.NODE_ENV = 'test'

const knex = require('../db/knex');
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp)

describe('API Routes', () => {
  before(done => {
  knex.migrate.latest()
    .then(() => { done() })
  })

  beforeEach(done => {
    knex.seed.run()
      .then(() => {
        done()
      })
  })

  describe('GET /api/v1/inventory', () => {
    it('should return a 404 for a route that does not exist', (done) => {
      chai.request(server)
        .get('/sad')
        .end((err, response) => {
          response.should.have.status(404);
          done();
        })
    });

    it('should return all inventory items', (done) => {
      chai.request(server)
        .get('/api/v1/inventory')
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(3);
          response.body[0].should.have.property('title')
          response.body[0].should.have.property('description')
          response.body[0].should.have.property('image')
          response.body[0].should.have.property('price')
          done();
        })
    });
  })

  describe('GET /api/v1/order_history', () => {
    it('should return a 404 for a route that does not exist', (done) => {
      chai.request(server)
        .get('/sad')
        .end((err, response) => {
          response.should.have.status(404);
          done();
        })
    });

    it('should return all order_history items', (done) => {
      chai.request(server)
        .get('/api/v1/order_history')
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(2);
          response.body[0].should.have.property('total_price')
          response.body[0].should.have.property('created_at')
          response.body[0].should.have.property('updated_at')
          done();
        })
    });
  })

  describe('POST /api/v1/order_history', () => {
    it('should be able to post to the order_history database', (done) => {
      chai.request(server)
        .post('/api/v1/order_history')
        .send({
          id: 3,
          total_price: 14.99
        })
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a('object');
          response.body.should.have.property('id');
          response.body.id.should.equal(3);
          done();
        })
    });

    it('should NOT be able to post without anything in the body', (done) => {
      chai.request(server)
        .post('/api/v1/order_history')
        .send({})
        .end((err, response) => {
          response.should.have.status(422);
          response.body.should.be.a('object');
          done();
        })
    })
  })
});
