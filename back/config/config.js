require("dotenv").config();

export const FRONT_URL = '13.125.73.95';
const password = process.env.DB_PASSWORD;

module.exports = {
  'development': {
    'username': 'root',
    'password': password,
    'database': 'react-sns-clone',
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
