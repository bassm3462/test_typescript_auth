import express ,{Request,Response, json} from "express"
import mongoose from "mongoose"

import cors from "cors"
import { error } from "console"
import helmet from 'helmet';
import morgan from 'morgan';
import {errorhandler}from "./src/Middleware/ErrorHandle";
import Route from "./src/Route/MainRoute"
import User from "./src/model/Users"
const app=express()
app.use(cors())
app.use(json());
app.use(helmet({ contentSecurityPolicy: false, hsts: false }));
app.use(morgan('dev'));
app.use(express.json())
app.use(errorhandler)
app.use(Route())
app.get("/",(req:Request,res:Response)=>{
    res.status(200).send("<h1>Hello World I ANM</h1>")
})
app.get("/getAllUsers",async(req:Request,res:Response)=>{
  res.status(200).send("<h1>Hello World I THIS IS USER</h1>")
// await User.find().then((response)=>{
//   console.log("users found");
// res.json(response)
// })
})


// mongoose.connect('mongodb://localhost:27017/test')
const mongooseOptions= {
  user: 'root',
  pass: 'example'
};
mongoose.connect('mongodb://mongo:27017/', mongooseOptions)
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error(`Connection failed: ${error}`);
  });
app.listen(4000,()=>{
    console.log("Server is running on port http://127.0.0.1:4000");
})