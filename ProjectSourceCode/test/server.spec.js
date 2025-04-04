// ********************** Initialize server **********************************

const server = require('../src/index'); //TODO: Make sure the path to your index.js is correctly added

// ********************** Import Libraries ***********************************

const chai = require('chai'); // Chai HTTP provides an interface for live integration testing of the API's.
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
const {assert, expect} = chai;

// ********************** DEFAULT WELCOME TESTCASE ****************************

describe('Server!', () => {
  // Sample test case given to test / endpoint.
  it('Returns the default welcome message', done => {
    chai
      .request(server)
      .get('/welcome')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals('success');
        assert.strictEqual(res.body.message, 'Welcome!');
        done();
      });
  });
});

// *********************** TODO: WRITE 2 UNIT TESTCASES **************************

// ********************************************************************************

describe('Testing Add User API', () => {
    it('positive : /register', done => {
        chai
        .request(server)
        .post('/register')
        .send({username: 'testuser', email: 'testuser@example.com', name: 'Test User', password: 'pwd123'})
        .end((err, res) => {
            res.should.have.status(200);
            res.should.redirectTo(/^.*127\.0\.0\.1.*\/login$/); // should redirect to /login
            done();
        });
    });

    it('Negative : /register. Checking invalid name', done => {
        chai
          .request(server)
          .post('/register')
          .set('Accept', 'application/json') // Explicitly request JSON
          .send({username: 'testuser', email: 'testuser@example.com', name: 'Test User', password: 'pwd123'})
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.message).to.equals('Username or Email already taken. Try a different one.');
            done();
          });
      });
});