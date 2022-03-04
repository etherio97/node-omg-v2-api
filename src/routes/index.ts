import { Router } from 'express';
import { router as api } from './api';

export const router = Router();

router.use('/api', api);

router.use((req, res, next) => {
  res.status(404).json({
    status: 404,
    error: true,
    code: 'not-found',
    message: 'Route not found',
  });
});
