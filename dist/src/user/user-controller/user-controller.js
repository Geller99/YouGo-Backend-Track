"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const user_models_1 = require("../user-models/user-models");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, age, email } = req.body;
    try {
        const newUser = yield user_models_1.User.create({
            username: username,
            password: password,
            age: age,
            email: email
        });
        res.status(201).json({
            status: "success",
            data: {
                user: newUser,
            },
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            status: "failed",
            data: {
                user: "unable to creae new user",
            },
        });
    }
});
exports.createUser = createUser;
