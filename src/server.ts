import { env } from './common/config';
import app from './app';

app.listen(env.PORT, () =>
  process.stdout.write(`App is running on http://localhost:${env.PORT}\n`)
);
