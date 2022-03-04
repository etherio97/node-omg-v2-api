"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@core/admin");
const app_1 = require("@core/app");
const db_1 = require("@core/db");
(0, db_1.connect)().then(() => app_1.app.listen(process.env.PORT || 5000, () => console.log('server is running on port:', process.env.PORT || 5000)));
