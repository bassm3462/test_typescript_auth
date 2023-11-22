"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorhandler = void 0;
const errorhandler = (err, req, res, next) => {
    const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
    res.status(statusCode);
    return res.json({
        status: "fail",
        message: err?.message,
        stack: err?.stack,
        data: null,
    });
    next();
};
exports.errorhandler = errorhandler;
