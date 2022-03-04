import { router } from '@/routes';
import cors from 'cors';
import e, { Application } from 'express';

export const app: Application = e();

app.use(cors());

app.use(router);
