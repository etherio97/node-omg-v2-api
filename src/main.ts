import { app } from '@core/app';
import { connect } from '@core/db';
import '@core/admin';

connect().then(() =>
  app.listen(5000, () => console.log('server is running on port:', 5000))
);
