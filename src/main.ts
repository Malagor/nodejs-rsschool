// import { createConnection } from 'typeorm';
// import { env } from './common/config';
// import app from './app';
// import config from './common/ormconfig';
// import { initDB } from './helpers/initDB';
//
// createConnection(config)
//   .then(initDB)
//   .then(() => {
//     app.listen(env.PORT, () =>
//       process.stdout.write(`App is running on http://localhost:${env.PORT}\n`)
//     );
//   })
//   .catch((error: Error) => {
//     process.stderr.write(`${error.name}`);
//     process.exit(1);
//   });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './common/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(env.PORT || 3000);
}
bootstrap();
