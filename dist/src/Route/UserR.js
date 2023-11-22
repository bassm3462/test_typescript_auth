"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserControler_1 = require("../controller/UserControler");
exports.default = (Router) => {
    Router.post('/add/User', UserControler_1.AddUsers);
    Router.post("/login", UserControler_1.Login);
    Router.get("/getAllUsers", UserControler_1.GetAllUsers);
};
