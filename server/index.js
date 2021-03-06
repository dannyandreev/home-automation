require('dotenv/config');
const pg = require('pg');
const argon2 = require('argon2');
const express = require('express');
const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

const jsonMiddleware = express.json();

app.use(jsonMiddleware);

app.post('/api/auth/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "users" ("username", "hashedPassword")
        values ($1, $2)
        returning "userId", "username", "createdAt"
      `;
      const params = [username, hashedPassword];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    select "userId",
           "hashedPassword"
      from "users"
     where "username" = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, username };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.get('/api/data', (req, res, next) => {
  const sql = `
        select * from data
    `;

  db.query(sql)
    .then(result =>{
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/devices', (req, res, next) => {
  const sql = `
        select * from devices
    `;

  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

//  http post :3000/api/data UUID=fa0c33ce-68ab-44ab-9ac8-16de4f47cd0a sensorType=Temperature sensorValue=30 deviceTimeStamp=''
app.post('/api/data', (req, res, next) => {

  const { UUID, sensorType, sensorValue } = req.body;

  console.log(req.body)
  if (!UUID || !sensorType || !sensorValue) {
    throw new ClientError(400, 'UUID, sensorType, and sensorValue are required fields');
  }
  const sql = `
    insert into "data" ("UUID", "sensorType", "sensorValue")
    values ($1, $2, $3)
    returning *
  `;
  const params = [UUID, sensorType, sensorValue]

  db.query(sql, params)
    .then( result => {
      const [data] = result.rows;
      res.status(201).json(data);
    })
    .catch(err => next(err));
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
