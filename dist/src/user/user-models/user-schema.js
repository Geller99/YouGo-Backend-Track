"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose = require('mongoose');
/**
 * @dev sets up schema for User
 */
exports.userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username must be provided'],
        unique: true
    },
    password: {
        type: String,
        required: [, 'password must be provided']
    },
    age: Number,
    email: {
        type: String,
        required: [true, 'email must be provided'],
        unique: true
    },
});
