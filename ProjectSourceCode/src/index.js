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
const session = require('express-session'); // To set the session object
const bcrypt = require('bcryptjs'); // To hash passwords

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

// allow access to public/images/default-event
app.use(express.static(path.join(__dirname, 'public')));

// *****************************************************
// <!-- API Routes -->
// *****************************************************

// Route: /profile
// Method: GET
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

// *****************************************************
// <!-- Start Server -->
// *****************************************************

// Starting the server and keeping the connection open to listen for more requests
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});