import { Request, Response, NextFunction } from "express";
import { User } from "../user-models/user-models";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const {username, password, age, email} = req.body;
  try {
    const newUser = await User.create({
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
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      data: {
        user: "unable to creae new user",
      },
    });
  }
};
