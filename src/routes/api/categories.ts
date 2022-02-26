import { db } from '@core/db';
import { json, Router } from 'express';

export const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const { rows: result } = await db.query(
      `SELECT c.id, c.name_en, c.name_mm, c.created_at FROM categories c ORDER BY c.created_at`
    );
    res.json({
      status: 200,
      result,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: true,
      message: err.message,
    });
    console.log(err.toString());
  }
});

router.post('/', json(), async (req, res, next) => {
  try {
    const data = req.body;
    if (!data) {
      return res.status(400).json({
        status: 400,
        error: true,
        message: 'Bad request',
      });
    }
    if (typeof data.name_en !== 'string') {
      return res.status(400).json({
        status: 400,
        error: true,
        message: 'category.name_en is required and must be string.',
      });
    }
    if (data.name_en && typeof data.name_en !== 'string') {
      return res.status(400).json({
        status: 400,
        error: true,
        message: 'category.name_mm must be string.',
      });
    }
    const {
      rows: [result],
    } = await db.query(
      'INSERT INTO categories(name_en, name_mm) VALUES ($1::text, $2::text) RETURNING id, name_en, name_mm',
      [data.name_en, data.name_mm]
    );
    res.status(201).json({
      status: 201,
      result,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: true,
      message: err.message,
    });
    console.log(err.toString());
  }
});

router.put('/:id', json(), async (req, res, next) => {
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
    if (typeof data.name_en !== 'string') {
      return res.status(400).json({
        status: 400,
        error: true,
        message: 'category.name_en is required and must be string.',
      });
    }
    if (data.name_en && typeof data.name_en !== 'string') {
      return res.status(400).json({
        status: 400,
        error: true,
        message: 'category.name_mm must be string.',
      });
    }
    const {
      rows: [result],
    } = await db.query(
      'UPDATE categories SET name_en=$1::text,name_mm=$2::text WHERE id=$3::uuid RETURNING id, name_en, name_mm',
      [data.name_en, data.name_mm, id]
    );
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
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: true,
      message: err.message,
    });
    console.log(err.toString());
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      rows: [result],
    } = await db.query(
      'SELECT c.id, c.name_en, c.name_mm, c.created_at FROM categories c WHERE id=$1::uuid',
      [id]
    );
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
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: true,
      message: err.message,
    });
    console.log(err.toString());
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      rows: [result],
    } = await db.query(
      'DELETE FROM categories WHERE id=$1::uuid RETURNING id',
      [id]
    );
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
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: true,
      message: err.message,
    });
    console.log(err.toString());
  }
});
