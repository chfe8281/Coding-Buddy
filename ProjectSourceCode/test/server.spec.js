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

describe('Testing Login API', () => {
  it('positive : /login', done => {
      chai
      .request(server)
      .post('/login')
      //.set('Accept', 'application/json') // Explicitly request JSON
      .send({username: 'testuser', password: 'pwd123'})
      .end((err, res) => {
          res.should.have.status(200);
          res.should.redirectTo(/^.*127\.0\.0\.1.*\/home$/); // should redirect to /home
          done();
      });
  });

  it('Negative : /login. Checking invalid name', done => {
      chai
        .request(server)
        .post('/login')
        .set('Accept', 'application/json') // Explicitly request JSON
        .send({username: 'fakeuser', password: 'pwd123'})
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equals('User not found in the database.');
          done();
        });
    });
});

describe('Testing Profile API', () => {
  it('positive : /profile', function(done) {
    // Create an agent to maintain session
    const agent = chai.request.agent(server);
  
    // First login
    agent
      .post('/login')
      .send({username: 'testuser', password: 'pwd123'})
      .then(() => {
        // Then get profile while maintaining session
        return agent.get('/profile');
      })
      .then(res => {
        // Check for rendered HTML response
        expect(res).to.have.status(200);
        expect(res).to.have.header('content-type', /html/);
        expect(res.text).to.include('testuser'); // Check username appears in HTML
        agent.close(); // Clean up
        done();
      })
      .catch(err => {
        agent.close();
        done(err);
      });
  });

  it('Negative : /profile. Checking invalid user', done => {
      chai
        .request(server)
        .get('/profile')
        .end((err, res) => {
          res.should.redirectTo(/^.*127\.0\.0\.1.*\/login$/); // should redirect to /login
          done();
        });
    });
});

describe('Testing Coding Page', () => {
  const testUser = {
    username: 'testuser',
    password: 'pwd123',
  };
  const testCodeInput = {
    code: '#include <iostream>\n using namespace std;\n int find_largest_element(int arr[], int size) { \n// Begin your solution here\n if (size == 0) {\n cout << "Array is empty." << endl;\n return -1; // or throw an error depending on your use case \n }\n int largest = arr[0];\n for (int i = 1; i < size; i++) {\n if (arr[i] > largest) {\n largest = arr[i];\n }\n }\n return largest;\n }\n',
    question_id: '1',
  };
  const testCodeInputIncorrect= {
    code: 'using namespace std;\n int find_largest_element(int arr[], int size) { \n// Begin your solution here\n if (size == 0) {\n cout << "Array is empty." << endl;\n return -1; // or throw an error depending on your use case \n }\n int largest = arr[0];\n for (int i = 1; i < size; i++) {\n if (arr[i] > largest) {\n largest = arr[i];\n }\n }\n return largest;\n }\n',
    question_id: '1',
  };
  it('positive : /coding', done => {
    const agent = chai.request.agent(server);
    agent
      .post('/login')
      .send(testUser)
      .then(() => {
        return agent.get('/coding');
      })
      .then(res => {
        res.should.have.status(200);
        expect(res.text).to.include('Description');
        agent.close();
        done();
      })
      .catch(err => {
        agent.close();
        done(err);
      });

  });
  it('Negative : /coding should redirect to login', done => {
    chai
      .request(server)
      .get('/coding')
      .end((err, res) => {
        console.log(res);
        res.should.redirectTo(/^.*127\.0\.0\.1.*\/login$/); // should redirect to /login
        done();
      });

  });
  
  it('positive : /coding post', function(done) { 
    this.timeout(5000); 
    const agent = chai.request.agent(server);
    agent
      .post('/login')
      .send(testUser)
      .then(() => {
        return agent.post('/coding').send(testCodeInput);
      })
      .then(res => {
        res.should.have.status(200);
        // console.log(res);
        expect(res.text).to.include('Success!');
        agent.close();
        done();
      })
      .catch(err => {
        agent.close();
        done(err);
      });
  });

  it('negative : /coding post', done => { 
    const agent = chai.request.agent(server);
    agent
      .post('/login')
      .send(testUser)
      .then(() => {
        return agent.post('/coding').send(testCodeInputIncorrect);
      })
      .then(res => {
        res.should.have.status(200);
        expect(res.text).to.include('Incorrect Output');
        agent.close();
        done();
      })
      .catch(err => {
        agent.close();
        done(err);
      });
  });
});