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

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/codingExercise', (req, res) => {
  res.render('pages/codingExercise.hbs'); //this will call the /anotherRoute route in the API
  // helpers.startCountdown();
});

/*app.post('/codingExercise', async(req, res) => {
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
      "language": "python",
      "version": "3.10.0",
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

    console.log("Input", data);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://emkc.org/api/v2/piston/execute',
      headers: { 
        'Content-Type': 'application/json', 
        'Cookie': 'engineerman.sid=s%3Akvnpn0FXmlPNrj5oQAzFdWL3_PfixMdO.6tPjcuIScWntIC6%2BYY2vnbqfu5UeM664ikYYImkm8Qc'
      },
      data : data
    };

    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data.run.output));
      let output = JSON.stringify(response.data.run.output);
      let message = "no";
      if (output_1 == output)
      {
        message = "yes";
      }
      console.log(output);
      res.render('pages/codingExercise.hbs', {
        response: message
      })
    })
    .catch((error) => {
      console.log(error);
    });

});*/

/* app.post('/codingExercise', async(req, res) => {
  let input = req.body.code;
  let input_1 = "";
  let input_2 = "";
  let input_3 = "";
  let output_1 = "";
  let output_2 = "";
  let output_3 = "";
  var getQuestion = `SELECT input_1, output_1, input_2, output_2, input_3, output_3 FROM coding_questions WHERE topic = '1300';`;
  try {
    let results = await db.one(getQuestion);
    input_1 = results.input_1;
    input_2 = results.input_2;
    input_3 = results.input_3;
    output_1 = results.output_1;
    output_2 = results.output_2;
    output_3 = results.output_3;
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
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data.run.output));
    let output = JSON.stringify(response.data.run.output);
    let message = "no";
    if (output_1 == output)
    {
      message = "yes";
    }
    console.log(output);
    res.render('pages/codingExercise.hbs', {
      response: message
    })
  })
  .catch((error) => {
    console.log(error);
  });
}); */

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


app.listen(3000);
console.log('Server is listening on port 3000');