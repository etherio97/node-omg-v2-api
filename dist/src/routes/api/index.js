"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const products_1 = require("./products");
const categories_1 = require("./categories");
exports.router = (0, express_1.Router)();
exports.router.use('/products', products_1.router);
exports.router.use('/categories', categories_1.router);
