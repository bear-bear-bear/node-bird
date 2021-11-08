require("dotenv").config();

const password = process.env.DB_PASSWORD;

module.exports = {
  'development': {
    'username': 'root',
    'password': password,
    'database': 'react-sns-clone',
    'host': '127.0.0.1',
    'dialect': 'mysql'
  },
  'production': {
    'username': 'root',
    'password': password,
    'database': 'react-sns-clone',
    'host': '127.0.0.1',
    'dialect': 'mysql'
  }
};
