import { Router } from 'express';
import { router as products } from './products';
import { router as categories } from './categories';

export const router = Router();

router.use('/products', products);

router.use('/categories', categories);
