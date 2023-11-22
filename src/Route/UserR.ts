import { AddUsers,GetAllUsers,GetOneUser,Login } from "../controller/UserControler";
import express, { Router } from "express"
export default (Router:Router)=>{
    Router.post('/add/User', AddUsers)
    Router.post("/login",Login)
    Router.get("/getAllUsers",GetAllUsers)
    
}