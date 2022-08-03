import { userSchema } from "./user-schema";
const mongoose = require('mongoose');

export const User = mongoose.model('User', userSchema);

