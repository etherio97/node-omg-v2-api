import { db } from '@core/db';
import { json, Router } from 'express';
import Fuse from 'fuse.js';

export const router = Router();

router.get('/search', async (req, res, next) => {
  try {
    let limit = Number(req.query.limit) || 10;
    let page = Number(req.query.page) || 1;
    let offset = (page - 1) * limit;
    let { q } = req.query;
    if (!q) {
      return res.status(400).json({
        status: 400,
        error: true,
        message: 'required query parameter: q',
      });
    }
    let {
      rows: [pagable],
    } = await db.query(
      'SELECT count(*) FROM products p WHERE lower(p.name) LIKE lower($1::text)',
      [`%${q}%`]
    );
    let { rows: result } = await db.query(
      `SELECT p.id, p.name, p.price, p.description, p.code, p.image, p.min_age, p.max_age, u.uid, u.name user_name, p.colors, c.id category_id, c.name category_name, p.updated_at, p.updated_at FROM products p INNER JOIN categories c ON p.category = c.id INNER JOIN users u ON u.uid = p.uid WHERE lower(p.name) LIKE lower($1::text) ORDER BY p.created_at desc OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY`,
      [`%${q}%`]
    );
    let fuse = new Fuse(result, {
      keys: ['name'],
    });
    res.json({
      status: 200,
      result: fuse
        .search({
          $or: [{ name: q as string }],
        })
        .map((s) => s.item),
      pagable: {
        size: result.length,
        page,
        limit,
        items: Number(pagable.count),
        pages: Math.ceil((Number(pagable.count) || 0) / limit),
      },
    });
  } catch (e) {
    res.status(500).json({
      status: 500,
      error: true,
      message: e.message,
    });
    console.log(e.toString());
  }
});

router.get('/', async (req, res, next) => {
  try {
    let limit = Number(req.query.limit) || 10;
    let page = Number(req.query.page) || 1;
    let offset = (page - 1) * limit;
    let {
      rows: [pagable],
    } = await db.query('SELECT count(*) FROM products');
    let { rows: result } = await db.query(
      `SELECT p.id, p.name, p.price, p.description, p.code, p.image, p.min_age, p.max_age, u.uid, u.name user_name, p.colors, c.id category_id, c.name category_name, p.updated_at, p.updated_at FROM products p INNER JOIN categories c ON p.category = c.id INNER JOIN users u ON u.uid = p.uid ORDER BY p.created_at desc OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY`
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

router.post('/', json(), async (req, res, next) => {
  try {
    let uid = 'u3W4Ufb9iyelrML8y10oesw7SNx2';
    let data = req.body;
    if (!data) {
      return res.status(400).json({
        status: 400,
        error: true,
        message: 'Bad request',
      });
    }
    let {
      rows: [result],
    } = await db.query(
      'INSERT INTO products(name, price, category, code, description, image, min_age, max_age, uid, colors) VALUES ($1::text, $2::integer, $3::uuid, $4::text, $5::text, $6::text, $7::integer, $8::integer, $9::text, $10::json) RETURNING *',
      [
        data.name,
        data.price,
        data.category,
        data.code,
        data.description,
        data.image,
        data.min_age,
        data.max_age,
        uid,
        JSON.stringify(data.colors || []),
      ]
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
    let { id } = req.params;
    let data = req.body;
    if (!data) {
      return res.status(400).json({
        status: 400,
        error: true,
        message: 'Bad request',
      });
    }
    let {
      rows: [result],
    } = await db.query(
      'UPDATE products SET name=$1::text, price=$2::integer, category=$3::uuid, code=$4::text, description=$5::text, image=$6::text, min_age=$7::integer, max_age=$8::integer, colors=$9::json, updated_at=now() WHERE id=$10::uuid RETURNING *',
      [
        data.name,
        data.price,
        data.category,
        data.code,
        data.description,
        data.image,
        data.min_age,
        data.max_age,
        JSON.stringify(data.colors || []),
        id,
      ]
    );
    if (!result) {
      return res.status(404).json({
        status: 404,
        error: true,
        message: 'product.id does not exist',
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
    let { id } = req.params;
    let {
      rows: [result],
    } = await db.query(
      'SELECT p.id, p.name, p.price, p.description, p.code, p.image, p.min_age, p.max_age, u.uid, u.name user_name, p.colors, c.id category_id, c.name category_name, p.updated_at, p.updated_at FROM products p INNER JOIN categories c ON p.category = c.id INNER JOIN users u ON u.uid = p.uid WHERE p.id=$1::uuid',
      [id]
    );
    if (!result) {
      return res.status(404).json({
        status: 404,
        error: true,
        message: 'product.id does not exist',
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
    let { id } = req.params;
    let {
      rows: [result],
    } = await db.query('DELETE FROM products WHERE id=$1::uuid RETURNING id', [
      id,
    ]);
    if (!result) {
      return res.status(404).json({
        status: 404,
        error: true,
        message: 'product.id does not exist',
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
