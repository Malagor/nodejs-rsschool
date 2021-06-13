import { env } from './common/config';
import app from './app';
import db from './memoryDb/postgresDB';

db.sync()
  .then(() => {
    app.listen(env.PORT, () =>
      process.stdout.write(`App is running on http://localhost:${env.PORT}\n`)
    );
  })
  .catch((error) => {
    process.stderr.write(error);
    process.exit(1);
  });
