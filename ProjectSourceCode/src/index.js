// *****************************************************
// <!-- Section 1 : Import Dependencies -->
// *****************************************************

const express = require('express'); // To build an application server or API
const app = express();
const handlebars = require('express-handlebars');
const Handlebars = require('handlebars');
const path = require('path');
const pgp = require('pg-promise')(); // To connect to the Postgres DB from the node server
const bodyParser = require('body-parser');

const session = require('express-session'); // To set the session object. To store or access session data, use the `req.session`, which is (generally) serialized as JSON by the store.
const bcrypt = require('bcryptjs'); //  To hash passwords
const axios = require('axios'); // To make HTTP requests from our server. We'll learn more about it in Part C.
const qs = require('qs');
const e = require('express');
const { mainModule } = require('process');


// *****************************************************
// <!-- Section 2 : Connect to DB -->
// *****************************************************

// create `ExpressHandlebars` instance and configure the layouts and partials dir.
const hbs = handlebars.create({
  extname: 'hbs',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials',
});

// database configuration
const dbConfig = {
  host: 'db', // the database server
  port: 5432, // the database port
  database: process.env.POSTGRES_DB, // the database name
  user: process.env.POSTGRES_USER, // the user account to connect with
  password: process.env.POSTGRES_PASSWORD, // the password of the user account
};

const db = pgp(dbConfig);

// test your database
db.connect()
  .then(obj => {
    console.log('Database connection successful'); // you can view this message in the docker compose logs
    obj.done(); // success, release the connection;
  })
  .catch(error => {
    console.log('ERROR:', error.message || error);
  });

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// initialize session variables
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
  })
);

app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing form data

// allow access to public/images/default-event
app.use(express.static(path.join(__dirname, 'public')));

// Starting the server and keeping the connection open to listen for more requests
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// *****************************************************
// <!-- API Routes -->
// *****************************************************

// Route: /
// Method: GET
// take user to login page by default
app.get('/', (req, res) => {
    res.redirect('/login');
  });
// Route: /register
// Method: GET
// renders the register page
app.get('/register', (req, res) => {
    res.render('pages/register'); 
});
// Route: /login
// Method: GET
// renders the login page
app.get('/login', (req,res)=>{
    res.render('pages/login')
});
// Route: /register
// Method: POST
// route for inserting hashed password into users table
// Route: /register
// Method: POST
// Route for inserting hashed password and email into users table
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
      console.log('Received registration request:', { username, email });
      const userExists = await db.any('SELECT * FROM users WHERE username = $1 OR email = $2', [username, email]);
      console.log('User exists check result:', userExists);

      if (userExists.length > 0) {
          console.log('Username or Email already taken.');
          return res.render('pages/register', { message: 'Username or Email already taken. Try a different one.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('Hashed password:', hashedPassword);

      await db.none(
          'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
          [username, email, hashedPassword]
      );

      console.log('User registered successfully');
      return res.redirect('/login');

  } catch (error) {
      console.error('Registration error:', error);
      res.status(500).send(`Internal Server Error: ${error.message}`);
  }
});

// Route: /login
// Method: POST
///login - Authenticate user
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Login attempt:', { username });

  try {
      const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
      console.log('Query result:', result);

      if (!result || result.length === 0) {
          console.log('User not found in the database.');
          return res.render('pages/login', { message: 'User not found. Please register first.' });
      }

      const user = result[0]; 
      console.log('Retrieved user:', username);
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
          console.log('Incorrect password.');
          return res.render('pages/login', { message: 'Incorrect username or password.' });
      }

      req.session.user = user;
      req.session.save(() => {
          console.log('User authenticated, redirecting to /home');
          res.redirect('/profile'); // temp profile page for now, will make homepage later
      });

  } catch (error) {
      console.error('Login error:', error);
      res.status(500).send(`Internal Server Error: ${error.message}`);
  }
});
// Authentication Middleware?
const auth = (req, res, next) => {
  if (!req.session.user) {
      console.log('User not authenticated. Redirecting to login...');
      return res.redirect('/login');
  }
  next();
};

// Route: /profile
// Renders the profile page (with mock data for now)
app.get('/profile', (req, res) => {
  const userProfile = {
    name: "FirstName LastName",
    email: "email@example.com",
    username: "username",
    avatar: "https://ui-avatars.com/api/?name=F+L&background=random",
    points: 100,
    leaderboardPosition: 32,
    streak: 3
  };

  res.render('pages/profile', userProfile);
});

let topic = "";
app.get('/coding', (req, res) => {
  res.render('pages/codingExercise.hbs'); //this will call the /anotherRoute route in the API
  // helpers.startCountdown();
});

app.post('/coding', async(req, res) => {
  let input = req.body.code;
  let input_1 = "";
  let output_1 = "";
  let question_id = "";
  var getQuestion = `SELECT question_id, input_1, output_1 FROM coding_questions WHERE topic = '2270';`;
  try {
    let results = await db.one(getQuestion);
    question_id = results.question_id;
    input_1 = results.input_1;
    output_1 = results.output_1;
    console.log("INPUT1", input_1);
    console.log(results);
      
  } catch (err) {
    res.redirect('/coding')
  }
  const axios = require('axios');
  let data = JSON.stringify({
    "language": "cpp",
      "version": "10.2.0",
      "files": [
        {
          "name": "my_cool_code.js",
          "content": `${input}\n${input_1}`
        }
      ],
      "stdin": "",
      "args": [
        "1",
        "2",
        "3"
      ],
      "compile_timeout": 10000,
      "run_timeout": 3000,
      "compile_cpu_time": 10000,
      "run_cpu_time": 3000,
      "compile_memory_limit": -1,
      "run_memory_limit": -1
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://emkc.org/api/v2/piston/execute',
    headers: {
        'Content-Type': 'application/json', 
        'Cookie': 'engineerman.sid=s%3Akvnpn0FXmlPNrj5oQAzFdWL3_PfixMdO.6tPjcuIScWntIC6%2BYY2vnbqfu5UeM664ikYYImkm8Qc'
    },
    data: data
  };
  console.log("data1", data);
  let passed_1 = false;
  let passed = "Compile error!";
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data.run.output));
    let output = JSON.stringify(response.data.run.output);
    passed = `Incorrect\n Output:${output}\n Expected:${output_1}`;
    if (output_1 == output)
    {
      passed_1 = true;
      passed = "Success!";
    }
    console.log("DBAnswer", output_1);
    res.render('pages/codingExercise.hbs', {
      passed: passed,
      error: !passed_1
    })
  })
  .catch((error) => {
    console.log(error);
    res.render('pages/codingExercise.hbs', {
      passed: passed,
      error: true
    })
  });
}); 

app.get('/welcome', (req, res) => {
  res.json({status: 'success', message: 'Welcome!'});
});


module.exports = app.listen(3000);
console.log('Server is listening on port 3000');
