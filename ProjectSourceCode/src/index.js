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
app.use(bodyParser.json()); // specify the usage of JSON for parsing request body.

// initialize session variables
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
  })
);

// Flash message middleware
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing form data

// allow access to public/images/default-event
app.use(express.static(path.join(__dirname, 'public')));

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
  const { username, email, name, password } = req.body;

  try {
      console.log('Received registration request:', { username, email });
      const userExists = await db.any('SELECT * FROM users WHERE username = $1 OR email = $2', [username, email]);
      console.log('User exists check result:', userExists);

      if (userExists.length > 0) {
        console.log('Username or Email already taken.');
        if (req.accepts('html')) {
            return res.status(400).render('pages/register', { 
                message: 'Username or Email already taken. Try a different one.' 
            });
        }
        return res.status(400).json({ 
            message: 'Username or Email already taken. Try a different one.' 
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('Hashed password:', hashedPassword);

      await db.none(
          'INSERT INTO users (username, email, name, password) VALUES ($1, $2, $3, $4)',
          [username, email, name, hashedPassword]
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
          res.redirect('/profile'); //temp redirect to profile for now
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
// *****************************************************
// <!-- Start Server -->
// *****************************************************

// Starting the server and keeping the connection open to listen for more requests
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/codingExercise', (req, res) => {
  res.render('pages/codingExercise.hbs'); //this will call the /anotherRoute route in the API
  // helpers.startCountdown();
});

app.post('/codingExercise', async(req, res) => {
  let input = req.body.code;
  let input_1 = "";
  let output_1 = "";
  var getQuestion = `SELECT input_1, output_1 FROM coding_questions WHERE topic = '1300';`;
  try {
    let results = await db.one(getQuestion);
    input_1 = results.input_1;
    output_1 = results.output_1;
    console.log("INPUT1", input_1);
    console.log(results);
      
  } catch (err) {
    res.redirect('/codingExercise')
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
  let passed_1 = "no";
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data.run.output));
    let output = JSON.stringify(response.data.run.output);
    if (output_1 == output)
    {
      passed_1 = "yes";
    }
    console.log("DBAnswer", output_1);
    res.render('pages/codingExercise.hbs', {
      response: passed_1
    })
  })
  .catch((error) => {
    console.log(error);
  });
}); 

app.get('/welcome', (req, res) => {
  res.json({status: 'success', message: 'Welcome!'});
});

app.get('/profile', auth, async (req, res) => {
  try {
    const user = req.session.user;
    if (!user) return res.redirect('/login');

    const userData = await db.one('SELECT * FROM users WHERE user_id = $1', [user.user_id]);
    
    res.render('pages/profile', {
      name: userData.name,
      email: userData.email,
      username: userData.username,
      avatar: userData.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name || 'U')}&background=random`,
      points: userData.points || 0,
      leaderboardPosition: await calculateLeaderboardPosition(userData.user_id),
      streak: userData.streak || 0
      // Message is automatically available via res.locals
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).send('Error loading profile');
  }
});

async function calculateLeaderboardPosition(userId) {
  try {
    // 1. Get total count of users with points > 0
    const countResult = await db.one('SELECT COUNT(*)::int FROM users WHERE points > 0');
    const userCount = countResult.count;
    
    // If no users have points, return 100 (top position) instead of 0
    if (userCount === 0) {
      return 100;
    }

    // 2. Get current user's points (default to 0 if null)
    const userResult = await db.one(
      'SELECT COALESCE(points, 0) AS points FROM users WHERE user_id = $1', 
      [userId]
    );
    const userPoints = userResult.points;

    // 3. Count users with higher scores
    const betterUsers = await db.one(
      'SELECT COUNT(*)::int FROM users WHERE points > $1',
      [userPoints]
    );
    const betterCount = betterUsers.count;

    // 4. Calculate position (0 = best, 100 = worst)
    const positionPercentile = Math.round((betterCount / userCount) * 100);
    
    // Return inverted percentile (100 - position) so higher is better
    return 100 - positionPercentile;
    
  } catch (error) {
    console.error('Error calculating leaderboard position:', error);
    return 50; // Default middle position if errors occur
  }
}

// Route: /profile/edit (GET) - Show edit form
app.get('/profile/edit', auth, async (req, res) => {
  try {
    const user = req.session.user;
    if (!user) {
      return res.redirect('/login');
    }

    const userData = await db.one('SELECT * FROM users WHERE user_id = $1', [user.user_id]);

    res.render('pages/edit-profile', {
      name: userData.name,
      username: userData.username,
      email: userData.email,
      avatar: userData.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name || 'U')}&background=random`
    });
  } catch (error) {
    console.error('Edit profile error:', error);
    res.status(500).send('Error loading edit profile');
  }
});

// Route: /profile/edit (POST) - Handle form submission
app.post('/profile/edit', auth, async (req, res) => {
  try {
    const { name, username, email } = req.body;
    const userId = req.session.user.user_id;

    // Check if username or email already exists (excluding current user)
    const exists = await db.any(
      `SELECT * FROM users 
       WHERE (username = $1 OR email = $2) 
       AND user_id != $3`,
      [username, email, userId]
    );

    if (exists.length > 0) {
      const userData = await db.one('SELECT * FROM users WHERE user_id = $1', [userId]);
      return res.render('pages/edit-profile', {
        name: userData.name,
        username: userData.username,
        email: userData.email,
        avatar: userData.avatar_url,
        message: 'Username or email already taken'
      });
    }

    // Update user in database
    await db.none(
      `UPDATE users 
       SET name = $1, username = $2, email = $3 
       WHERE user_id = $4`,
      [name, username, email, userId]
    );

    // Update session with new data
    req.session.user = {
      ...req.session.user,
      name,
      username,
      email
    };
    req.session.save();

    // Set flash message and redirect
    req.session.message = {
      type: 'success',
      text: 'Profile Updated Successfully'
    };

    return res.redirect('/profile');
    res.redirect('/profile');
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).send('Error updating profile');
  }
});

// Route: /profile/change-password (GET)
app.get('/profile/change-password', auth, async (req, res) => {
  try {
    res.render('pages/change-password');
  } catch (error) {
    console.error('Password change error:', error);
    res.status(500).send('Error loading password change page');
  }
});

app.post('/profile/change-password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const userId = req.session.user.user_id;

    // Validation
    if (newPassword !== confirmPassword) {
      return res.render('pages/change-password', {
        message: { type: 'danger', text: 'New passwords do not match' }
      });
    }

    if (newPassword.length < 8) {
      return res.render('pages/change-password', {
        message: { type: 'danger', text: 'Password must be at least 8 characters' }
      });
    }

    // Verify current password
    const user = await db.one('SELECT * FROM users WHERE user_id = $1', [userId]);
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    
    if (!isMatch) {
      return res.render('pages/change-password', {
        message: { type: 'danger', text: 'Current password is incorrect' }
      });
    }

    // Update password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.none(
      'UPDATE users SET password = $1 WHERE user_id = $2',
      [hashedPassword, userId]
    );

    // Set flash message and redirect
    req.session.message = {
      type: 'success',
      text: 'Password Changed Successfully'
    };
    return res.redirect('/profile');
    
  } catch (error) {
    console.error('Password change error:', error);
    req.session.message = {
      type: 'danger',
      text: 'Error changing password'
    };
    return res.redirect('/profile/change-password');
  }
});

module.exports = app.listen(3000);
console.log('Server is listening on port 3000');