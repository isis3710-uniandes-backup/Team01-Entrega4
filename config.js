const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  databaseUser: process.env.DATABASE_USERNAME,
  databasePassword: process.env.DATABASE_PASSWORD,
  databaseName : process.env.DATABASE_NAME,
  secretKey : process.env.SECRET_KEY
};
