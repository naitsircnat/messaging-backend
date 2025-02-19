CREATE DATABASE messaging;

USE messaging;

CREATE TABLE users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE, 
  password VARCHAR(100) NOT NULL, 
  status VARCHAR(100) NOT NULL DEFAULT 'Hello there!' 
);

CREATE TABLE messages(
  message_id INT PRIMARY KEY AUTO_INCREMENT,
  message VARCHAR(1000) NOT NULL,
  sender INT NOT NULL,
  receiver INT NOT NULL,
  sent_at DATETIME DEFAULT NOW(),
  FOREIGN KEY (sender) REFERENCES users(user_id),
  FOREIGN KEY (receiver) REFERENCES users(user_id)
);