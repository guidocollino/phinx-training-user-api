import express, { Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';
import authRouter from '@routes/auth.route';
import usersRouter from '@routes/users.route';
import { connect } from '@db/connection';

connect();

import { createJwtToken, validateJwtToken } from '@utils/jwt';

const authJwtTokem = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  validateJwtToken(token) ? next() : res.sendStatus(403);
};

const apiPath = '/api/v1';
const app = express();

// parse application/json
app.use(bodyParser.json())

app.use(`${apiPath}/auth`, authRouter);
app.use(`${apiPath}/users`, [authJwtTokem, usersRouter]);

export default app;
