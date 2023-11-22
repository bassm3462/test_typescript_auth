import { Router } from "express";
import UserR from "./UserR"
const route=Router();
export default ():Router =>{
UserR(route)
return route
}
