"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const db_1 = require("@core/db");
const express_1 = require("express");
exports.router = (0, express_1.Router)();
exports.router.get('/', async (req, res, next) => {
    try {
        const { rows: result } = await db_1.db.query(`SELECT c.id, c.name, c.created_at FROM categories c ORDER BY c.created_at`);
        res.json({
            status: 200,
            result,
        });
    }
    catch (err) {
        res.status(500).json({
            status: 500,
            error: true,
            message: err.message,
        });
        console.log(err.toString());
    }
});
exports.router.post('/', (0, express_1.json)(), async (req, res, next) => {
    try {
        const data = req.body;
        if (!data) {
            return res.status(400).json({
                status: 400,
                error: true,
                message: 'Bad request',
            });
        }
        if (typeof data.name !== 'string') {
            return res.status(400).json({
                status: 400,
                error: true,
                message: 'category.name is required and must be string.',
            });
        }
        const { rows: [result], } = await db_1.db.query('INSERT INTO categories(name) VALUES ($1::text) RETURNING id, name', [data.name]);
        res.status(201).json({
            status: 201,
            result,
        });
    }
    catch (err) {
        res.status(500).json({
            status: 500,
            error: true,
            message: err.message,
        });
        console.log(err.toString());
    }
});
exports.router.put('/:id', (0, express_1.json)(), async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        if (!data) {
            return res.status(400).json({
                status: 400,
                error: true,
                message: 'Bad request',
            });
        }
        if (data.name && typeof data.name !== 'string') {
            return res.status(400).json({
                status: 400,
                error: true,
                message: 'category.name must be string.',
            });
        }
        const { rows: [result], } = await db_1.db.query('UPDATE categories SET name=$1::text WHERE id=$2::uuid RETURNING id, name', [data.name, id]);
        if (!result) {
            return res.status(404).json({
                status: 404,
                error: true,
                message: 'category.id does not exist',
            });
        }
        res.status(202).json({
            status: 202,
            result,
        });
    }
    catch (err) {
        res.status(500).json({
            status: 500,
            error: true,
            message: err.message,
        });
        console.log(err.toString());
    }
});
exports.router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { rows: [result], } = await db_1.db.query('SELECT c.id, c.name, c.created_at FROM categories c WHERE id=$1::uuid', [id]);
        if (!result) {
            return res.status(404).json({
                status: 404,
                error: true,
                message: 'category.id does not exist',
            });
        }
        res.status(200).json({
            status: 200,
            result,
        });
    }
    catch (err) {
        res.status(500).json({
            status: 500,
            error: true,
            message: err.message,
        });
        console.log(err.toString());
    }
});
exports.router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { rows: [result], } = await db_1.db.query('DELETE FROM categories WHERE id=$1::uuid RETURNING id', [id]);
        if (!result) {
            return res.status(404).json({
                status: 404,
                error: true,
                message: 'category.id does not exist',
            });
        }
        res.status(202).json({
            status: 202,
            result,
        });
    }
    catch (err) {
        res.status(500).json({
            status: 500,
            error: true,
            message: err.message,
        });
        console.log(err.toString());
    }
});
