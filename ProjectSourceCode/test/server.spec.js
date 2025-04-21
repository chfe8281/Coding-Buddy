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

describe('Testing Flashcards Page', () => {
  const testUser = {
    username: 'testuser',
    password: 'pwd123',
  };

  it('positive : /flashcards should return flashcards page with decks', (done) => {
    const agent = chai.request.agent(server);
    agent
      .post('/login')
      .send(testUser)
      .then(() => {
        return agent.get('/flashcards');
      })
      .then(res => {
        res.should.have.status(200);
        expect(res).to.have.header('content-type', /html/);
        expect(res.text).to.include('Flashcards Overview');
        agent.close();
        done();
      })
      .catch(err => {
        agent.close();
        done(err);
      });
  });

  it('negative : /flashcards should redirect to login when not authenticated', (done) => {
    chai
      .request(server)
      .get('/flashcards')
      .end((err, res) => {
        res.should.redirectTo(/^.*127\.0\.0\.1.*\/login$/);
        done();
      });
  });

  it('should display "no flashcards" message when user has none', (done) => {
    // Create a test user with no flashcards
    const newTestUser = {
      username: 'noflashcardsuser',
      password: 'test123',
      email: 'noflash@test.com',
      name: 'No Flash User'
    };

    const agent = chai.request.agent(server);
    
    // Register and login new user
    agent
      .post('/register')
      .send(newTestUser)
      .then(() => {
        return agent.post('/login').send({
          username: newTestUser.username,
          password: newTestUser.password
        });
      })
      .then(() => {
        return agent.get('/flashcards');
      })
      .then(res => {
        res.should.have.status(200);
        expect(res.text).to.include("You don't have any flashcards");
        expect(res.text).to.include('Interact with the');
        return agent.get('/logout'); // Clean up session
      })
      .then(() => {
        agent.close();
        done();
      })
      .catch(err => {
        agent.close();
        done(err);
      });
  });

  it('should display flashcards when user has them', (done) => {
    const agent = chai.request.agent(server);
    agent
      .post('/login')
      .send(testUser)
      .then(() => {
        return agent.get('/flashcards');
      })
      .then(res => {
        res.should.have.status(200);
        expect(res.text).to.include('Flashcards Overview');
        if (res.text.includes('You don\'t have any flashcards')) {
          console.log('Test user has no flashcards - consider adding test data');
        } else {
          expect(res.text).to.match(/<div class=".*card.*">/i);
        }
        agent.close();
        done();
      })
      .catch(err => {
        agent.close();
        done(err);
      });
  });
});

describe('Testing MCQ Page', () => {
  const testUser = {
    username: 'testuser',
    password: 'pwd123',
  };

  // Test the basic page rendering
  it('should render the MCQ page with course selection', (done) => {
    const agent = chai.request.agent(server);
    agent
      .post('/login')
      .send(testUser)
      .then(() => {
        return agent.get('/mcq');
      })
      .then(res => {
        res.should.have.status(200);
        expect(res.text).to.include('Choose a Course');
        expect(res.text).to.include('1300');
        expect(res.text).to.include('2270');
        expect(res.text).to.include('2400');
        expect(res.text).to.include('3104');
        expect(res.text).to.include('Interactive Quiz');
        agent.close();
        done();
      })
      .catch(err => {
        agent.close();
        done(err);
      });
  });

  // Test unauthenticated access
  it('should redirect to login when not authenticated', (done) => {
    chai
      .request(server)
      .get('/mcq')
      .end((err, res) => {
        res.should.redirectTo(/^.*127\.0\.0\.1.*\/login$/);
        done();
      });
  });

  // Test the quiz container visibility
  it('should initially hide the quiz container', (done) => {
    const agent = chai.request.agent(server);
    agent
      .post('/login')
      .send(testUser)
      .then(() => {
        return agent.get('/mcq');
      })
      .then(res => {
        res.should.have.status(200);
        expect(res.text).to.include('id="quiz" style="display: none"');
        agent.close();
        done();
      })
      .catch(err => {
        agent.close();
        done(err);
      });
  });

  // Test the presence of required buttons
  it('should have all required interactive elements', (done) => {
    const agent = chai.request.agent(server);
    agent
      .post('/login')
      .send(testUser)
      .then(() => {
        return agent.get('/mcq');
      })
      .then(res => {
        res.should.have.status(200);
        expect(res.text).to.include('id="next-btn"');
        expect(res.text).to.include('id="check-btn"');
        expect(res.text).to.include('id="timer"');
        expect(res.text).to.include('id="question"');
        expect(res.text).to.include('id="options"');
        agent.close();
        done();
      })
      .catch(err => {
        agent.close();
        done(err);
      });
  });

  // Test the initial state of buttons
  it('should initially hide the Next and Check Answer buttons', (done) => {
    const agent = chai.request.agent(server);
    agent
      .post('/login')
      .send(testUser)
      .then(() => {
        return agent.get('/mcq');
      })
      .then(res => {
        res.should.have.status(200);
        expect(res.text).to.include('id="next-btn" style="display: none;"');
        expect(res.text).to.include('id="check-btn" style="display: none;"');
        agent.close();
        done();
      })
      .catch(err => {
        agent.close();
        done(err);
      });
  });

  // Test the external resources are loaded
  it('should load required external resources', (done) => {
    const agent = chai.request.agent(server);
    agent
      .post('/login')
      .send(testUser)
      .then(() => {
        return agent.get('/mcq');
      })
      .then(res => {
        res.should.have.status(200);
        expect(res.text).to.include('cdnjs.cloudflare.com/ajax/libs/font-awesome/');
        expect(res.text).to.include('cdn.jsdelivr.net/npm/bootstrap@');
        expect(res.text).to.include('fonts.googleapis.com/css');
        expect(res.text).to.include('/resources/js/quiz.js');
        agent.close();
        done();
      })
      .catch(err => {
        agent.close();
        done(err);
      });
  });
});