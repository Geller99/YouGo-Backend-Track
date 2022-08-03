import { createUser } from './../user-controller/user-controller';

const express = require('express');
export const userRouter = express.Router();



userRouter.post('/new', createUser);
