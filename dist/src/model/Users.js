"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.getUsersByEmail = exports.getUserById = exports.deleteUser = exports.getUsers = exports.setUsers = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const SALT_WORK_FACTOR = 10;
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name"],
        maxlength: [30, "Name can't be more than 30 characters"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please provide your email"],
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password: {
        type: String,
        minlength: [6, "Password should have at least 6 characters"],
        required: [true, "Please enter a valid password"]
    },
}, { timestamps: true });
UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt_1.default.hash(user.password, SALT_WORK_FACTOR);
    }
    next();
});
// UserSchema.pre("save",async(next)=>{
//     // get the current user document
//     const user=this as unknown as IUserDocument;
//     // if password is not modified, continue
//     if(!user.isModified('password')) return next();
//             // hash the password with a salt work factor
//     try {
//         user.password=await bcrypt.hash(user.password,SALT_WORK_FACTOR);
//         // proceed to the next middleware
//         return next();
//     } catch (error) {
//                 // log the error and throw it
//         console.log(error);
//         throw error;
//     }
//         // proceed to the next middleware
// next()
// })
const Users = (0, mongoose_1.model)("Users", UserSchema);
const setUsers = async (values) => {
    await new Users(values).save().then((user) => user.toObject());
};
exports.setUsers = setUsers;
const getUsers = async () => Users.find();
exports.getUsers = getUsers;
const deleteUser = (id) => Users.deleteOne({ _id: id }).exec();
exports.deleteUser = deleteUser;
// export const updateUser = async (id:string , values: Record<string, any>) => {
//     let updatedValues={}
//     return Users.updateOne({_id:id},updatedValues).exec()
// }
const getUserById = async (id) => Users.findById({ _id: id });
exports.getUserById = getUserById;
const getUsersByEmail = async (email) => await Users.findOne({ email: email });
exports.getUsersByEmail = getUsersByEmail;
const loginUser = async (email, password) => {
    const user = await Users.findOne({ email: email });
    if (!user) {
        throw new Error("Invalid credentials");
    }
    else {
        const Authentication = await bcrypt_1.default.compare(password, user.password);
        if (!Authentication) {
            throw new Error('Invalid credentials');
        }
        else {
            //    const token=signToken(user._id)
            //    return {token:token,user:user}
        }
    }
};
exports.loginUser = loginUser;
exports.default = Users;
