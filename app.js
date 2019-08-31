import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import router from './routes';
import mysql from 'mysql';

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];

const app = express();

// Parse incoming requests data
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

const connection = mysql.createConnection(config.sql);

connection.connect((err) => {
  if (err) throw err
  console.log('You are now connected with mysql database...')
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});