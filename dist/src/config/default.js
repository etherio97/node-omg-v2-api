"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SERVICE_ACCOUNT = void 0;
const package_json_1 = require("../../package.json");
const path_1 = require("path");
exports.SERVICE_ACCOUNT = (0, path_1.join)(process.cwd(), package_json_1.config.project.serviceAccount);
