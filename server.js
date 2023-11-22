"use strict";
exports.__esModule = true;
var express_1 = require("express");
var mongoose_1 = require("mongoose");
// import bodyParser from 'body-parser'
// import cors from 'cors';
var cors_1 = require("cors");
var helmet_1 = require("helmet");
var morgan_1 = require("morgan");
// import { json } from 'body-parser';
// import cookieSession from 'cookie-session';
// import session from 'express-session';
var app = (0, express_1["default"])();
app.use((0, cors_1["default"])());
app.use((0, express_1.json)());
app.use((0, helmet_1["default"])({ contentSecurityPolicy: false, hsts: false }));
app.use((0, morgan_1["default"])('dev'));
app.use(express_1["default"].json());
app.get("/", function (req, res) {
    res.status(200).send("<h1>Hello World</h1>");
});
mongoose_1["default"].connect('mongodb://localhost:27017/test')
    .then(function () {
    console.log('Connected to the database');
})["catch"](function (error) {
    console.error("Connection failed: ".concat(error));
});
app.listen(4000, function () {
    console.log("Server is running on port http://127.0.0.1:4000");
});
