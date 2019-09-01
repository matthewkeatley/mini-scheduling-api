import mysql from 'mysql';
import path from 'path';

require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.json')[env];

const connection = mysql.createConnection(config.sql);

connection.connect((err) => {
  if (err) throw err
  console.log('You are now connected with mysql database...')
});

export default connection;