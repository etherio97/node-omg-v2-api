"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PG_DATABASE_URL = void 0;
exports.PG_DATABASE_URL = process.env.PG_DATABASE_URL;
if (!exports.PG_DATABASE_URL) {
    console.warn('[WARN] env: %s does not exists', 'PG_DATABASE_URL');
}
