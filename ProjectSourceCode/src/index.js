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
    secret: process.env.SESSION_SECRET || 'fallback-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true if using HTTPS in production
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: 'strict'
    }
  })
);

app.use((req, res, next) => {
  res.locals.user = req.session.user; // Makes user available in all templates
  next();
});


app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing form data

// Flash message middleware
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

// allow access to public/images/default-event
app.use(express.static(path.join(__dirname, 'public'))); //add this if it doesn't work: app.use(express.static(path.join(__dirname, 'resources')));
// Serve images from the img folder (located one level above src)
app.use('/img', express.static(path.join(__dirname, '../img')));

// Serve resources (like CSS) from the resources folder inside src
app.use('/resources', express.static(path.join(__dirname, 'resources')));

// Starting the server and keeping the connection open to listen for more requests
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// *****************************************************
// <!-- API Routes -->
// *****************************************************

// Authentication Middleware?
const auth = (req, res, next) => {
  if (!req.session.user) {
      console.log('User not authenticated. Redirecting to login...');
      return res.redirect('/login');
  }
  next();
};

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

// Route: /home
// Method: GET
// renders the register page
app.get('/home', auth, async (req, res) => {

  console.log('Session data:', req.session);

  const userId = req.session.user.user_id;

  try {
    const totalMC = await db.one('SELECT count(*) AS count FROM mc_questions');
    const completedMC = await db.one(
      'SELECT count(*) AS count FROM users_to_mc_questions WHERE user_id = $1',
      [userId]
    );

    const totalCoding = await db.one('SELECT count(*) AS count FROM coding_questions');
    const completedCoding = await db.one(
      'SELECT count(*) AS count FROM users_to_coding_questions WHERE user_id = $1',
      [userId]
    );

    const totalMCCount = Number(totalMC.count);
    const completedMCCount = Number(completedMC.count);
    const totalCodingCount = Number(totalCoding.count);
    const completedCodingCount = Number(completedCoding.count);

    const mcPercentage = totalMCCount === 0 ? 0 : Math.round((completedMCCount / totalMCCount) * 100);
    const codingPercentage = totalCodingCount === 0 ? 0 : Math.round((completedCodingCount / totalCodingCount) * 100);

    res.render('pages/homePage', {
      mcPercentage,
      codingPercentage,
      user: req.session.user
    });
  } catch (error) {
    console.error('Error calculating completion percentages:', error);
    res.render('pages/homePage', {
      mcPercentage: 0,
      codingPercentage: 0,
      user: req.session.user
    });
  }
});

// Route: /login
// Method: GET
// renders the login page
app.get('/login', (req,res)=>{
    res.render('pages/login')
});

// Route: /register
// Method: POST
// Route for inserting hashed password and email into users table
app.post('/register', async (req, res) => {
  const { username, email, name, password } = req.body;
  if (!username || !password) {
    return res.status(400).render('pages/register', {
      message: 'Username and password are required.'
    });
  }
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
        if (req.accepts('html')) {
          console.log('User not found in the database.');
          return res.render('pages/login', { message: 'User not found. Please register first.' });
      }
        return res.status(400).json({ 
          message: 'User not found in the database.' 
        });
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
          res.redirect('/home');
      });

  } catch (error) {
      console.error('Login error:', error);
      res.status(500).send(`Internal Server Error: ${error.message}`);
  }
});

let current_user = "";

// *****************************************************
// <!-- Start Server -->
// *****************************************************

let result = "";
app.get('/coding', async (req, res) => {
  const topic = req.query.topic;

  if (!topic) {
    return res.render('pages/codingExercise.hbs', { 
      question_descript: "No topic selected." 
    });
  }

  const query = `SELECT question_id, description, starter_code 
                FROM coding_questions 
                WHERE topic = $1
                AND question_id NOT IN (SELECT question_id FROM users_to_coding_questions WHERE user_id=$2 AND completed=TRUE) 
                ORDER BY RANDOM() 
                LIMIT 1`;
  const backup_query = `SELECT question_id, description, starter_code 
                FROM coding_questions 
                WHERE topic = $1
                ORDER BY RANDOM() 
                LIMIT 1`;

  if (!req.session || !req.session.user) {
    return res.status(401).redirect('/login');
  }

  user_id = req.session.user.user_id;

  try {
    let result = "";
    let message = "";
    try {
      result = await db.one(query, [topic,user_id]);
    } catch(resultError)
    {
      console.log("No questions remaining, regenerating from old ones");
      result = await db.one(backup_query, [topic]);
      message = "Completed all questions from this course! Olds ones are being generated for practice.";
    }
    const savedCode = await db.oneOrNone(
      `SELECT code FROM user_code_saves 
       WHERE user_id = $1 AND question_id = $2`,
      [user_id, result.question_id]
    );
    console.log("Fetched question:", result);
    
    res.render('pages/codingExercise.hbs', {
      question_descript: result.description,
      question_id: result.question_id,
      message: message,
      error: false,
      starter_code: savedCode?.code || result.starter_code
    });
  
  } catch (err) {
    const result = await db.one(fallbackQuery, [topic]);
    const savedCode = await db.oneOrNone(
      `SELECT code FROM user_code_saves 
       WHERE user_id = $1 AND question_id = $2`,
      [user_id, result.question_id]
    );
    console.error("Error fetching question:", err);
    res.render('pages/codingExercise.hbs', {
      question_descript: result.description,
      question_id: result.question_id,
      starter_code: savedCode?.code || result.starter_code,
      passed: 'You have already completed this exercise, would you like to practice it again?'
    });
  }
});
app.post('/coding', auth, async(req, res) => {
  let user_input = req.body.code;
  let user_id = req.session.user.user_id;
  let question_id = req.body.question_id;
  
  // First, save the user's code to the database (with error handling)
  try {
    await db.none(
      `INSERT INTO user_code_saves (user_id, question_id, code)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, question_id)
       DO UPDATE SET code = $3`,
      [user_id, question_id, user_input]
    );
  } catch (saveErr) {
    console.error("Failed to save user code:", saveErr);
    // Continue execution even if save fails
  }

  // Rest of your existing code
  let main_input = "";
  let expected_output = "";
  // let question_id = req.body.question_id;
  let time_taken=req.body.time_taken;
  console.log("ID", question_id);
  var getQuestion = `SELECT question_id, input_1, output_1 FROM coding_questions WHERE question_id = '${question_id}';`;
  try {
    // Use parameterized query to prevent SQL injection
    const results = await db.one(
      'SELECT question_id, input_1, output_1 FROM coding_questions WHERE question_id = $1',
      [question_id]
    );
    question_id = results.question_id;
    main_input = results.input_1;
    expected_output = results.output_1;
  } catch (err) {
    return res.redirect('/coding');
  }

  const axios = require('axios');
  const data = JSON.stringify({
    "language": "cpp",
    "version": "10.2.0",
    "files": [{
      "name": "my_cool_code.js",
      "content": `${user_input}\n${main_input}`
    }],
    "stdin": "",
    "args": [""],
    "compile_timeout": 10000,
    "run_timeout": 3000,
    "compile_cpu_time": 10000,
    "run_cpu_time": 3000,
    "compile_memory_limit": -1,
    "run_memory_limit": -1
  });

  // Define config here where it's accessible to all handlers
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://emkc.org/api/v2/piston/execute',
    headers: {
      'Content-Type': 'application/json', 
      'Cookie': 'engineerman.sid=s%3Akvnpn0FXmlPNrj5oQAzFdWL3_PfixMdO.6tPjcuIScWntIC6%2BYY2vnbqfu5UeM664ikYYImkm8Qc'
    },
    data: data
  };

  let passed_1 = false;
  let passed = "Compile error!";
  // axios.request(config)
  try {
    const response = await axios.request(config);
    const output = JSON.stringify(response.data.run.output);
    console.log(output);
    passed = `Incorrect Output:${output}\n Expected:${expected_output} \n Time taken: ${time_taken} seconds`;
    const results = await db.one(
      'SELECT question_id, input_1, output_1, description FROM coding_questions WHERE question_id = $1',
      [question_id]
    );
    if (expected_output == output)
    {
      passed_1 = true;
      passed = `Success! \n Time taken: ${time_taken} seconds`;
      console.log("Userid", user_id);
      let insertUser = `INSERT INTO users_to_coding_questions(user_id, question_id, time_taken, completed) VALUES(${user_id}, ${question_id}, ${time_taken}, TRUE) RETURNING user_id;`;
      
        console.log("inside");
        let ret = await db.one(insertUser);
        console.log(ret)
        // res.redirect('/coding')
      
    }

    console.log("DBAnswer", expected_output);
    res.render('pages/codingExercise.hbs', {
      passed: passed,
      error: !passed_1,
      current_code: user_input,
      question_id: question_id,
      question_descript: results.description,
    });
  } catch (error) {
    console.log(error);
    res.render('pages/codingExercise.hbs', {
      passed: passed,
      error: true,
      current_code: user_input,
      question_id: question_id,
      question_descript: results.description,
    });
  }
});

// Route: /logout
// Method: GET
// Destroys the session and logs the user out
app.get('/logout', (req, res) => {
  // Destroy the session
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.render('pages/logout', {
        message: 'An error occurred during logout.',
        error: true,
      });
    }

    // Render the logout page with a success message
    res.render('pages/logout', {
      message: 'Logged out successfully.',
      success: true,
    });
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
    const cqp = await calculateCompletionPercentage(userData.username);
    const actualStreak = await updateLoginStreak(userData.user_id)
    const visualStreak = await calculateVisualProgress(actualStreak);

    res.render('pages/profile', {
      name: userData.name,
      email: userData.email,
      username: userData.username,
      avatar: userData.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name || 'U')}&background=random`,
      points: userData.points || 0,
      leaderboardPosition: await calculateLeaderboardPosition(userData.user_id),
      totalUsers: await getTotalUsers(),
      streak: actualStreak || 0,
      visualStreak: visualStreak,
      codingQuestionsPercent: cqp
      // Message is automatically available via res.locals
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).send('Error loading profile');
  }
});

async function getTotalUsers() {
  try {
    const countResult = await db.one('SELECT COUNT(*)::int FROM users');
    const userCount = countResult.count;

    return userCount;
  } catch (error) {
    console.error('Error calculating leaderboard position:', error);
    return 0; // Default 0 if errors occur
  }
}

async function calculateLeaderboardPosition(userId) {
  try {

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
    
    return betterCount + 1;
    
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

async function calculateCompletionPercentage(username) {
  try {
    // Get total number of coding questions
    const totalQuestions = await db.one(
      'SELECT COUNT(*) as count FROM coding_questions'
    );
    console.log(totalQuestions);
    
    // Get user id
    const user = await db.one(`SELECT user_id FROM users WHERE username = $1`, [username]);
    const userID = user.user_id; // Extract ID

    // Get number of questions completed by user
    const completedQuestions = await db.one(
      'SELECT COUNT(*) as count FROM users_to_coding_questions WHERE user_id = $1',
      [userID] // Now passing just the integer
    );
    
    // Calculate percentage
    if (totalQuestions.count === 0) {
      return 0; // Avoid division by zero if no questions exist
    }
    
    const percentage = (completedQuestions.count / totalQuestions.count) * 100;
    return Math.round(percentage * 100) / 100; // Round to 2 decimal places
    
  } catch (error) {
    console.error('Error calculating completion percentage:', error);
    return 0; // Return 0 if there's an error
  }
}

async function updateLoginStreak(userId) {
  try {
    // Get user's current streak and last login date
    const user = await db.one('SELECT last_login, streak FROM users WHERE user_id = $1', [userId]);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to midnight
    
    let newStreak = 1; // Default to 1
    
    if (user.last_login) {
      const lastLogin = new Date(user.last_login);
      lastLogin.setHours(0, 0, 0, 0);
      
      // Calculate difference in days
      const dayDiff = (today - lastLogin) / (1000 * 60 * 60 * 24);
      
      if (dayDiff === 1) {
        newStreak = user.streak + 1;
      } else if (dayDiff > 1) {
        newStreak = 1;
      } else {
        newStreak = user.streak;
      }
    }
    
    // Update user record
    await db.none(
      'UPDATE users SET streak = $1, last_login = $2 WHERE user_id = $3',
      [newStreak, today, userId]
    );
    
    return newStreak;
    
  } catch (error) {
    console.error('Error updating login streak:', error);
    throw error;
  }
}

async function calculateVisualProgress(actualStreak) {
  const multiplier = 7;
  const maxVisual = 100;
  
  return Math.min(actualStreak * multiplier, maxVisual);
}

// *****************************************************
// <!-- Multiple Choice Question API Routes -->
// *****************************************************


app.get('/mcq', (req, res) => {
    res.render('./pages/mcq'); 
});

// *****************************************************
// <!-- End of Multiple Choice Question API Routes -->
// *****************************************************

// *****************************************************
// <!-- Flashcards API Routes -->
// *****************************************************
app.get('/flashcards', async (req,res) => {
  try {

    // Get user decks
    let results = await db.task (async results => {
      deck_info = await db.any(`SELECT decks.deck_id, decks.name FROM users
        INNER JOIN users_to_decks
          ON users.user_id = users_to_decks.user_id
        INNER JOIN decks
          ON users_to_decks.deck_id = decks.deck_id
        WHERE users.user_id = $1;`, [req.session.user.user_id]);

      // Get corresponding cards
      let decks = [];
      for(let i = 0; i < deck_info.length; i++) {
        // console.log(deck_info[i].name);
        cards = await db.any(`SELECT cards.front, cards.back FROM decks
          INNER JOIN decks_to_cards
            ON decks_to_cards.deck_id = decks.deck_id
          INNER JOIN cards
            ON cards.card_id = decks_to_cards.card_id
          WHERE decks.deck_id = $1;`, [deck_info[i].deck_id]);
        // console.log(cards);
          decks[i] = {
            name: deck_info[i].name,
            id: deck_info[i].deck_id,
            cards
          }
        // console.log(decks[i]);
      }
      return decks;
    });
    res.render('pages/flashcards', {decks: results});
  } catch (err) {
    res.render('pages/flashcards',{
      decks: [],
      error: err
    });
  }
});

// *****************************************************
// <!-- End Flashcards API Routes -->
// *****************************************************

module.exports = app.listen(3000);
console.log('Server is listening on port 3000');
