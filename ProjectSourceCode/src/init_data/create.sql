<<<<<<< HEAD
DROP TABLE IF EXISTS users CASCADE;
=======
-- DROP TABLE IF EXISTS users CASCADE;
>>>>>>> 670c9cf (fixed database generation issue)
CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(225) NOT NULL,
  email VARCHAR(50) NOT NULL,
  rank INT,
  last_login DATE,
  streak INT,
  name VARCHAR(100),
  points INT,
  avatar_url VARCHAR(200)
);

<<<<<<< HEAD
DROP TABLE IF EXISTS decks CASCADE;
=======
-- DROP TABLE IF EXISTS decks CASCADE;
>>>>>>> 670c9cf (fixed database generation issue)
CREATE TABLE IF NOT EXISTS decks (
  deck_id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(50) NOT NULL,
  count INT NOT NULL,
  creator_id INT NOT NULL,
  FOREIGN KEY (creator_id) REFERENCES users (user_id) ON DELETE CASCADE
);

<<<<<<< HEAD
DROP TABLE IF EXISTS cards CASCADE;
=======
-- DROP TABLE IF EXISTS cards CASCADE;
>>>>>>> 670c9cf (fixed database generation issue)
CREATE TABLE IF NOT EXISTS cards (
  card_id SERIAL PRIMARY KEY NOT NULL,
  front VARCHAR(100) NOT NULL,
  back VARCHAR(250) NOT NULL,
  creator_id INT NOT NULL,
  FOREIGN KEY (creator_id) REFERENCES users (user_id) ON DELETE CASCADE
);

<<<<<<< HEAD
DROP TABLE IF EXISTS coding_questions CASCADE;
=======
-- DROP TABLE IF EXISTS coding_questions CASCADE;
>>>>>>> 670c9cf (fixed database generation issue)
CREATE TABLE IF NOT EXISTS coding_questions (
  question_id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(50) NOT NULL,
  -- Increase as needed
<<<<<<< HEAD
  starter_code VARCHAR(5000),
  topic VARCHAR(20),
  input_1 VARCHAR(5000),
  input_2 VARCHAR(5000),
  input_3 VARCHAR(5000),
  output_1 VARCHAR(5000),
  output_2 VARCHAR(5000),
  output_3 VARCHAR(5000),
=======
  starter_code VARCHAR(500),
  topic VARCHAR(20),
  input_1 VARCHAR(40),
  input_2 VARCHAR(40),
  input_3 VARCHAR(40),
  output_1 VARCHAR(10),
  output_2 VARCHAR(10),
  output_3 VARCHAR(10),
>>>>>>> 670c9cf (fixed database generation issue)
  -- Difficult scale 1-5
  difficulty INT CONSTRAINT limited_values CHECK (difficulty > 0 AND difficulty < 6),
  deck_id INT,
  FOREIGN KEY (deck_id) REFERENCES decks (deck_id) ON DELETE CASCADE
);

<<<<<<< HEAD
DROP TABLE IF EXISTS mc_questions CASCADE;
=======
-- DROP TABLE IF EXISTS mc_questions CASCADE;
>>>>>>> 670c9cf (fixed database generation issue)
CREATE TABLE IF NOT EXISTS mc_questions (
  mcq_id SERIAL PRIMARY KEY NOT NULL,
  mcq_text VARCHAR(200),
  deck_id INT,
  FOREIGN KEY (deck_id) REFERENCES decks (deck_id) ON DELETE CASCADE
);

<<<<<<< HEAD
DROP TABLE IF EXISTS mc_incorrect CASCADE;
=======
-- DROP TABLE IF EXISTS mc_incorrect CASCADE;
>>>>>>> 670c9cf (fixed database generation issue)
CREATE TABLE IF NOT EXISTS mc_incorrect (
  incorrect_id SERIAL PRIMARY KEY NOT NULL,
  text VARCHAR(200) NOT NULL,
  mcq_id INT NOT NULL,
  FOREIGN KEY (mcq_id) REFERENCES mc_questions (mcq_id) ON DELETE CASCADE
);

<<<<<<< HEAD
DROP TABLE IF EXISTS mc_answers CASCADE;
=======
-- DROP TABLE IF EXISTS mc_answers CASCADE;
>>>>>>> 670c9cf (fixed database generation issue)
CREATE TABLE IF NOT EXISTS mc_answers (
  answer_id SERIAL PRIMARY KEY NOT NULL,
  text VARCHAR(200) NOT NULL,
  mcq_id INT NOT NULL,
  FOREIGN KEY (mcq_id) REFERENCES mc_questions (mcq_id) ON DELETE CASCADE
);

<<<<<<< HEAD
DROP TABLE IF EXISTS users_to_decks CASCADE;
=======
-- DROP TABLE IF EXISTS users_to_decks CASCADE;
>>>>>>> 670c9cf (fixed database generation issue)
CREATE TABLE IF NOT EXISTS users_to_decks (
  user_id INT NOT NULL,
  deck_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
  FOREIGN KEY (deck_id) REFERENCES decks (deck_id) ON DELETE CASCADE
);

<<<<<<< HEAD
DROP TABLE IF EXISTS decks_to_cards CASCADE;
=======
-- DROP TABLE IF EXISTS decks_to_cards CASCADE;
>>>>>>> 670c9cf (fixed database generation issue)
CREATE TABLE IF NOT EXISTS decks_to_cards (
  deck_id INT NOT NULL,
  card_id INT NOT NULL,
  FOREIGN KEY (deck_id) REFERENCES decks (deck_id) ON DELETE CASCADE,
  FOREIGN KEY (card_id) REFERENCES cards (card_id) ON DELETE CASCADE
);

<<<<<<< HEAD
DROP TABLE IF EXISTS users_to_coding_questions CASCADE;
=======
-- DROP TABLE IF EXISTS users_to_coding_questions CASCADE;
>>>>>>> 670c9cf (fixed database generation issue)
CREATE TABLE IF NOT EXISTS users_to_coding_questions (
  user_id INT NOT NULL,
  question_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
  FOREIGN KEY (question_id) REFERENCES coding_questions (question_id) ON DELETE CASCADE
);

<<<<<<< HEAD
DROP TABLE IF EXISTS users_to_mc_questions CASCADE;
=======
-- DROP TABLE IF EXISTS users_to_mc_questions CASCADE;
>>>>>>> 670c9cf (fixed database generation issue)
CREATE TABLE IF NOT EXISTS users_to_mc_questions (
  user_id INT NOT NULL,
  mcq_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
  FOREIGN KEY (mcq_id) REFERENCES mc_questions (mcq_id) ON DELETE CASCADE
);


<<<<<<< HEAD
-- Create an admin user to assign default decks to
INSERT INTO users (username, password, email)
  VALUES ('admin', 'password987', 'admin42@colorado.edu');

-- Default flashcard decks
INSERT INTO decks (name, count, creator_id)
  VALUES ('CSCI 1300', 0, 1);

-- Default flashcards
INSERT INTO cards (front, back, creator_id)
  VALUES ('Unit testing?', 'A type of testing that checks individual segments of code works in isolation', 1);

-- Connect cards to decks
INSERT INTO decks_to_cards (deck_id, card_id)
  VALUES (1, 1);

-- Populate Coding Questions

-- Populate Multiple Choice Questions

-- Check tables (comment out)
-- SELECT * FROM users;
-- SELECT * FROM decks;
-- SELECT * FROM cards;
-- SELECT * FROM coding_questions;
-- SELECT * FROM mc_questions;
-- SELECT * FROM mc_incorrect;
-- SELECT * FROM mc_answers;
-- SELECT * FROM users_to_decks;
-- SELECT * FROM decks_to_cards;
-- SELECT * FROM users_to_coding_questions;
-- SELECT * FROM users_to_mc_questions;
=======
-- INSERT statements for default flashcards

-- Populate Coding Questions

-- Populate Multiple Choice Questions
>>>>>>> 670c9cf (fixed database generation issue)
