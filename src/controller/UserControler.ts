import express, { Request, Response, response } from "express";
import bcrypt from "bcrypt";
import Users, {
  getUsers,
  setUsers,
  getUserById,
  getUsersByEmail,
} from "../model/Users";
import jwt from "jsonwebtoken";

export const AddUsers = async (req: Request, res: Response) => {
  const { email, name, password } = req.body;
  const findEmail = await getUsersByEmail(email);
  if (findEmail) {
    return res.status(409).json({ message: " email already exists" });
  }
  await new Users({
    name,
    password,
    email,
  })
    .save()
    .then((response) => {
      res.status(200).json({ message: "add users successfully ", response });
    })
    .catch((error) => {
      res.status(400).json({ message: "An error occurred" });
      console.log("error", error);
    });
};
export const Login = async(req: Request, res: Response) => {
  console.log(req.body);
  
  const { email, password } = req.body;
  const checkEmail = await Users.findOne({ email: email });
  if (!checkEmail) {
    return res.status(401).send("Invalid Email or Password");
  }
  let isValidPassword = await bcrypt.compare(password, checkEmail.password);
  if (!isValidPassword) {
    return res.status(401).send("Invalid Email or Password");
  }
  let token = jwt.sign({ _id: checkEmail._id }, "token"!);
  return res.header("auth-Token", token).json({checkEmail,token});
};
export const GetAllUsers = async (_req: Request, res: Response) => {
  try {
    const usersLists = await getUsers();
    res.send(usersLists);
  } catch (error) {
    throw error;
  }
};
export const GetOneUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const userDetails = await getUserById(id);
  if (!userDetails) {
    return res.status(404).json({ message: "user not found" });
  }
  res.json(userDetails);
};
