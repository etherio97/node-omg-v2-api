import { config } from '../../package.json';
import { join } from 'path';

export const SERVICE_ACCOUNT = join(
  process.cwd(),
  config.project.serviceAccount
);
