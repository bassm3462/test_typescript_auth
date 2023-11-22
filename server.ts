import express ,{Request,Response, json} from "express"
import mongoose from "mongoose"
import cors from "cors"
import { error } from "console"
import helmet from 'helmet';
import morgan from 'morgan';
import {errorhandler}from "./src/Middleware/ErrorHandle";
import Route from "./src/Route/MainRoute"
const app=express()
app.use(cors())
app.use(json());
app.use(helmet({ contentSecurityPolicy: false, hsts: false }));
app.use(morgan('dev'));
app.use(express.json())
app.use(errorhandler)
app.use("/API/",Route())
app.get("/",(req:Request,res:Response)=>{
    res.status(200).send("<h1>Hello World</h1>")
})
app.all("*",()=>{
    throw new Error(`Can't find this route`)
})
mongoose.connect('mongodb://localhost:27017/test')
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error(`Connection failed: ${error}`);
  });
app.listen(4000,()=>{
    console.log("Server is running on port http://127.0.0.1:4000");
})