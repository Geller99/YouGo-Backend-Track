"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const user_controller_1 = require("./../user-controller/user-controller");
const express = require('express');
exports.userRouter = express.Router();
exports.userRouter.post('/new', user_controller_1.createUser);
