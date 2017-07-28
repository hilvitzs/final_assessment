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
    .then(() => {
      return knex.seed.run()
    })
    .then(() => {
      done()
    })
  })

  beforeEach(done => {
    knex.seed.run()
      .then(() => {
        done()
      })
  })

  describe('/api/v1/inventory', () => {
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
          done();
        })
    });
  })

  describe('/api/v1/inventory', () => {
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
          done();
        })
    });
  })
});
