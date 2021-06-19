import { env } from './common/config';
import app from './app';
import { connect } from './memoryDb/postgresDB';

connect()
  .then(() => {
    app.listen(env.PORT, () =>
      process.stdout.write(`App is running on http://localhost:${env.PORT}\n`)
    );
  })
  .catch((error: Error) => {
    process.stderr.write(`${error.name}`);
    process.exit(1);
  });
