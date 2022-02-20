import { db } from '@core/db';
import { Router } from 'express';

export const router = Router();

router.get('/', async (req, res, next) => {
  let limit = Number(req.query.limit) || 10;
  let page = Number(req.query.page) || 1;
  let offset = (page - 1) * limit;
  try {
    const {
      rows: [pagable],
    } = await db.query('SELECT count(*) FROM products');
    const { rows: result } = await db.query(
      `SELECT * FROM products ORDER BY created_at desc OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY`
    );

    res.json({
      status: 200,
      result,
      pagable: {
        size: result.length,
        page,
        limit,
        items: Number(pagable.count),
        pages: Math.ceil((Number(pagable.count) || 0) / limit),
      },
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
