import '@core/admin';
import { app } from '@core/app';
import { connect } from '@core/db';

connect().then(() =>
  app.listen(5000, () => console.log('server is running on port:', 5000))
);
