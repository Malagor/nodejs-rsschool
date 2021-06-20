import { Connection, createConnection, getConnection } from 'typeorm';
import { config } from '../common/ormconfig';

// Variant 1

// export const connect = async (): Promise<void> => {
//   const connection = await createConnection(config);
//   await connection.runMigrations();
// };

// Variant 2

// export const connect = createConnection(config);

// Variant 3

export const connect = async (): Promise<Connection | undefined> => {
  let connection;
  try {
    process.stdout.write('Try get current Connection ....\n');
    connection = getConnection();
  } catch (e) {
    process.stderr.write('No current connection!\n');
  }

  try {
    if (connection) {
      if (!connection.isConnected) {
        process.stdout.write('Reconnect...\n');
        await connection.connect();
      }
    } else {
      process.stdout.write('Create new connection...\n');
      await createConnection(config);
    }

    process.stdout.write('Connection successfully!\n');
  } catch (e) {
    process.stderr.write(`Not connection to DB!\n${e}\n`);
  }
  return connection;
};
