require("dotenv").config();

const password = process.env.DB_PASSWORD;

module.exports = {
  'development': {
    'username': 'root',
    'password': password,
    'database': 'react-nodebird',
    'host': '127.0.0.1',
    'dialect': 'mysql'
  },
  'test': {
    'username': 'root',
    'password': password,
    'database': 'database_test',
    'host': '127.0.0.1',
    'dialect': 'mysql'
  },
  'production': {
    'username': 'root',
    'password': password,
    'database': 'database_production',
    'host': '127.0.0.1',
    'dialect': 'mysql'
  }
};