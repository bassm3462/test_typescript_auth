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
const express_1 = __importStar(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const ErrorHandle_1 = require("./src/Middleware/ErrorHandle");
const MainRoute_1 = __importDefault(require("./src/Route/MainRoute"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, express_1.json)());
app.use((0, helmet_1.default)({ contentSecurityPolicy: false, hsts: false }));
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(ErrorHandle_1.errorhandler);
app.use("/API/", (0, MainRoute_1.default)());
app.get("/", (req, res) => {
    res.status(200).send("<h1>Hello World</h1>");
});
app.all("*", () => {
    throw new Error(`Can't find this route`);
});
mongoose_1.default.connect('mongodb://localhost:27017/test')
    .then(() => {
    console.log('Connected to the database');
})
    .catch((error) => {
    console.error(`Connection failed: ${error}`);
});
app.listen(4000, () => {
    console.log("Server is running on port http://127.0.0.1:4000");
});
