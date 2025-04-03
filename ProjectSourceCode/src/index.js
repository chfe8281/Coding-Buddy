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
const e = require('express');

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

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


app.get('/', (req, res) => {
  res.render('pages/codingExercise.hbs'); //this will call the /anotherRoute route in the API
  // helpers.startCountdown();
});
//functions to fetch questions in the database and call the api route
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".type-buttons button");
    let selectedTopic = "";

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            selectedTopic = button.textContent;
            fetchQuestion(selectedTopic);
        });
    });

    function fetchQuestion(topic) {
        fetch(`/get-question?topic=${encodeURIComponent(topic)}`)
            .then(response => response.json())
            .then(data => {
                displayQuestion(data);
            })
            .catch(error => console.error("Error fetching question:", error));
    }

    function displayQuestion(question) {
        const questionContainer = document.getElementById("question-container");
        if (questionContainer) {
            questionContainer.innerHTML = `<h3>${question.name}</h3><p>${question.starter_code || question.mcq_text}</p>`;
        }
    }
});
//get route fetching a random coding question by topic
app.get("/get-question", async (req, res) => {
  const topic = req.query.topic;

  if (!topic) {
    return res.status(400).json({ error: "Topic is required." });
  }

  try {
    const query = `SELECT * FROM coding_questions WHERE topic = $1 ORDER BY RANDOM() LIMIT 1`;
    const question = await db.oneOrNone(query, [topic]); // 'oneOrNone' returns a single row or null

    if (question) {
      res.json(question); // Send the question data as JSON
    } else {
      res.status(404).json({ error: "No questions found for this topic." });
    }
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

app.listen(3000);
console.log('Server is listening on port 3000');
