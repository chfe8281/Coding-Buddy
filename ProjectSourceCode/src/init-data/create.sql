-- DROP TABLE IF EXISTS users CASCADE;
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

-- DROP TABLE IF EXISTS decks CASCADE;
CREATE TABLE IF NOT EXISTS decks (
  deck_id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(50) NOT NULL,
  count INT NOT NULL,
  creator_id INT NOT NULL,
  FOREIGN KEY (creator_id) REFERENCES users (user_id) ON DELETE CASCADE
);

-- DROP TABLE IF EXISTS cards CASCADE;
CREATE TABLE IF NOT EXISTS cards (
  card_id SERIAL PRIMARY KEY NOT NULL,
  front VARCHAR(100) NOT NULL,
  back VARCHAR(250) NOT NULL,
  creator_id INT NOT NULL,
  FOREIGN KEY (creator_id) REFERENCES users (user_id) ON DELETE CASCADE
);

-- DROP TABLE IF EXISTS coding_questions CASCADE;
CREATE TABLE IF NOT EXISTS coding_questions (
  question_id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(50) NOT NULL,
  -- Increase as needed
  topic VARCHAR(20),
  input_1 VARCHAR(500),
  -- input_2 VARCHAR(40),
  -- input_3 VARCHAR(40),
  output_1 VARCHAR(50)
  -- output_2 VARCHAR(10),
  -- output_3 VARCHAR(10),
  -- Difficult scale 1-5
  -- difficulty INT CONSTRAINT limited_values CHECK (difficulty > 0 AND difficulty < 6),
  -- deck_id INT,
  -- FOREIGN KEY (deck_id) REFERENCES decks (deck_id) ON DELETE CASCADE
);

-- DROP TABLE IF EXISTS mc_questions CASCADE;
CREATE TABLE IF NOT EXISTS mc_questions (
  mcq_id SERIAL PRIMARY KEY NOT NULL,
  mcq_text VARCHAR(200),
  deck_id INT,
  FOREIGN KEY (deck_id) REFERENCES decks (deck_id) ON DELETE CASCADE
);

-- DROP TABLE IF EXISTS mc_incorrect CASCADE;
CREATE TABLE IF NOT EXISTS mc_incorrect (
  incorrect_id SERIAL PRIMARY KEY NOT NULL,
  text VARCHAR(200) NOT NULL,
  mcq_id INT NOT NULL,
  FOREIGN KEY (mcq_id) REFERENCES mc_questions (mcq_id) ON DELETE CASCADE
);

-- DROP TABLE IF EXISTS mc_answers CASCADE;
CREATE TABLE IF NOT EXISTS mc_answers (
  answer_id SERIAL PRIMARY KEY NOT NULL,
  text VARCHAR(200) NOT NULL,
  mcq_id INT NOT NULL,
  FOREIGN KEY (mcq_id) REFERENCES mc_questions (mcq_id) ON DELETE CASCADE
);

-- DROP TABLE IF EXISTS users_to_decks CASCADE;
CREATE TABLE IF NOT EXISTS users_to_decks (
  user_id INT NOT NULL,
  deck_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
  FOREIGN KEY (deck_id) REFERENCES decks (deck_id) ON DELETE CASCADE
);

-- DROP TABLE IF EXISTS decks_to_cards CASCADE;
CREATE TABLE IF NOT EXISTS decks_to_cards (
  deck_id INT NOT NULL,
  card_id INT NOT NULL,
  FOREIGN KEY (deck_id) REFERENCES decks (deck_id) ON DELETE CASCADE,
  FOREIGN KEY (card_id) REFERENCES cards (card_id) ON DELETE CASCADE
);

-- DROP TABLE IF EXISTS users_to_coding_questions CASCADE;
CREATE TABLE IF NOT EXISTS users_to_coding_questions (
  user_id INT NOT NULL,
  question_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
  FOREIGN KEY (question_id) REFERENCES coding_questions (question_id) ON DELETE CASCADE
);

-- DROP TABLE IF EXISTS users_to_mc_questions CASCADE;
CREATE TABLE IF NOT EXISTS users_to_mc_questions (
  user_id INT NOT NULL,
  mcq_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
  FOREIGN KEY (mcq_id) REFERENCES mc_questions (mcq_id) ON DELETE CASCADE
);


-- INSERT statements for default flashcards

-- Populate Coding Questions

-- Populate Multiple Choice Questions

