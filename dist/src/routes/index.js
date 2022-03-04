"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const api_1 = require("./api");
exports.router = (0, express_1.Router)();
exports.router.use('/api', api_1.router);
exports.router.use((req, res, next) => {
    res.status(404).json({
        status: 404,
        error: true,
        code: 'not-found',
        message: 'Route not found',
    });
});
