"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@/config");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const fs_1 = require("fs");
const serviceAccount = JSON.parse((0, fs_1.readFileSync)(config_1.SERVICE_ACCOUNT, 'utf-8'));
exports.default = firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount),
    databaseURL: config_1.FIREBASE_DATABASE_URL,
    storageBucket: config_1.FIREBASE_STORAGE_BUCKET,
});
