import { Router } from 'express';
import { router as products } from './products';

export const router = Router();

router.use('/products', products);
