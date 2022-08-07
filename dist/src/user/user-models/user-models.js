"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const user_schema_1 = require("./user-schema");
const mongoose = require('mongoose');
exports.User = mongoose.model('User', user_schema_1.userSchema);
