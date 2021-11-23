/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

// Assertion Style
chai.should();

chai.use(chaiHttp);

describe('SHOPPING CART API TEST', () => {
  /**
     * Test the get route
     */

  describe('Testing Products Route', () => {
    it('It should GET all the products', (done) => {
      chai.request(server)
        .get('/api/products')
        .end((err, response) => {
          response.should.have.status(200);
          // response.body.should.be.a('array');
          done();
        });
    });
    it('It should not GET all the products', (done) => {
      chai.request(server)
        .get('/api/')
        .end((err, response) => {
          response.should.have.status(404);
          // response.body.should.be.a('array');
          done();
        });
    });
    it('It should post a new Product', (done) => {
      const newProduct = {
        name: 'Face Shield 0',
        description: 'Good Maskmmmsmdmsdsdjsjdjsjdjsjjdsdsds',
        price: 120,
        category: 'Covid Care',
        isAvailable: true,
        imgUrl: 'sdsURL',

      };
      chai.request(server)
        .post('/api/products')
        .send(newProduct)
        // use token as dummy token inside env variable for tests.
        .set({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwODRiMjcyYWQ0OGE5NDBhYTQ3NmM4OCIsImVtYWlsIjoiZ2F5YW5AZ21haWwuY29tIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjE5MzU3MjM5fQ.hd-YxLhLq9puA43fw2uzNIdWR-UU2tGZKdPlseg2Cuc' })
        .end((err, response) => {
          response.should.have.status(200);
          // response.body.should.be.a('array');
          done();
        });
    });

    it('It should Not post a new Product', (done) => {
      const newProduct = {
        name: 'Fa',
        description: 'Good Mask',
        price: 120,
        category: 'Covid Care',
        isAvailable: 'true',
        imgUrl: 'sdsURL',

      };
      chai.request(server)
        .post('/api/products')
        .send(newProduct)
        .set({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwODRiMjcyYWQ0OGE5NDBhYTQ3NmM4OCIsImVtYWlsIjoiZ2F5YW5AZ21haWwuY29tIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjE5MzU3MjM5fQ.hd-YxLhLq9puA43fw2uzNIdWR-UU2tGZKdPlseg2Cuc' })
        .end((err, response) => {
          response.should.have.status(400);
          // response.body.should.be.a('array');
          done();
        });
    });
  });
  describe('Testing Cart Route', () => {
    it('It should post a new Cart Item', (done) => {
      const newCartItem = {
        name: 'Face Shield',
        description: 'Good Mask',
        price: 120,
        category: 'Covid Care',
        userId: '1234',
        imgUrl: 'sdsURL',

      };
      chai.request(server)
        .post('/api/carts')
        .send(newCartItem)
        // use token as dummy token inside env variable for tests.
        .end((err, response) => {
          response.should.have.status(200);
          // response.body.should.be.a('array');
          done();
        });
    });

    it('It should Not post a new Cart Item', (done) => {
      const newCartItem = {
        name: 'Fa',
        description: 'Good Mask',
        price: 120,
        category: 'Covid Care',
        imgUrl: 'sdsURL',

      };
      chai.request(server)
        .post('/api/carts')
        .send(newCartItem)
        .end((err, response) => {
          response.should.have.status(400);
          // response.body.should.be.a('array');
          done();
        });
    });
  });

  describe('Testing Order Route', () => {
    it('It should post a new Order', (done) => {
      const newOrder = {

        userId: '1234',
      };
      chai.request(server)
        .post('/api/orders')
        .send(newOrder)
        // use token as dummy token inside env variable for tests.
        .end((err, response) => {
          response.should.have.status(200);
          // response.body.should.be.a('array');
          done();
        });
    });
  });

  describe('Testing User SignUp', () => {
    it('It should SignUp a user', (done) => {
      const newUser = {
        userName: 'Gayan Disanayaka',
        email: 'gayantest@gmail.com',
        password: 'Gayandisanayak123@',

      };
      chai.request(server)
        .post('/api/users')
        .send(newUser)
        .end((err, response) => {
          response.should.have.status(200);
          // response.body.should.be.a('array');
          done();
        });
    });

    it('It should Not SignUp a user', (done) => {
      const newUser = {
        userName: 'Gayan Disanayaka',
        email: 'gayantest',
        password: 'GayanDisanayak',

      };
      chai.request(server)
        .post('/api/users')
        .send(newUser)
        .end((err, response) => {
          response.should.have.status(400);
          // response.body.should.be.a('array');
          done();
        });
    });
  });

  describe('Testing User Login', () => {
    it('It should Login a user', (done) => {
      const user = {
        email: 'gayan@gmail.com',
        password: 'gayan',

      };
      chai.request(server)
        .post('/api/auth')
        .send(user)
        .end((err, response) => {
          response.should.have.status(200);
          // response.body.should.be.a('array');
          done();
        });
    });

    it('It should Not Login a user', (done) => {
      const user = {
        email: 'noemail@gmail.com',
        password: 'gayan',
      };
      chai.request(server)
        .post('/api/auth')
        .send(user)
        .end((err, response) => {
          response.should.have.status(400);
          // response.body.should.be.a('array');
          done();
        });
    });
  });

  /**
     * Test the get by id route
     */
});
