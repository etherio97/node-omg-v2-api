"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sql = exports.connect = exports.db = void 0;
const config_1 = require("@/config");
const pg_1 = require("pg");
const connect = () => new pg_1.Pool({
    connectionString: config_1.PG_DATABASE_URL,
})
    .connect()
    .then((value) => (exports.db = value));
exports.connect = connect;
const sql = (args) => {
    console.log(args);
    return args;
};
exports.sql = sql;
