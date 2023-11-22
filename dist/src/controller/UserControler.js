"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOneUser = exports.GetAllUsers = exports.Login = exports.AddUsers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const Users_1 = __importStar(require("../model/Users"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AddUsers = async (req, res) => {
    const { email, name, password } = req.body;
    const findEmail = await (0, Users_1.getUsersByEmail)(email);
    if (findEmail) {
        return res.status(409).json({ message: " email already exists" });
    }
    await new Users_1.default({
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
exports.AddUsers = AddUsers;
const Login = async (req, res) => {
    const { email, password } = req.body;
    const checkEmail = await Users_1.default.findOne({ email: email });
    if (!checkEmail) {
        return res.status(401).send("Invalid Email or Password");
    }
    let isValidPassword = await bcrypt_1.default.compare(password, checkEmail.password);
    if (!isValidPassword) {
        return res.status(401).send("Invalid Email or Password");
    }
    let token = jsonwebtoken_1.default.sign({ _id: checkEmail._id }, "token");
    return res.header("auth-Token", token).json({ checkEmail, token });
};
exports.Login = Login;
const GetAllUsers = async (_req, res) => {
    try {
        const usersLists = await (0, Users_1.getUsers)();
        res.send(usersLists);
    }
    catch (error) {
        throw error;
    }
};
exports.GetAllUsers = GetAllUsers;
const GetOneUser = async (req, res) => {
    const id = req.params.id;
    const userDetails = await (0, Users_1.getUserById)(id);
    if (!userDetails) {
        return res.status(404).json({ message: "user not found" });
    }
    res.json(userDetails);
};
exports.GetOneUser = GetOneUser;
