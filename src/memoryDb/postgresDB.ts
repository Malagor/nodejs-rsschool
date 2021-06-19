import { getConnection, createConnection } from 'typeorm';
import { config } from '../common/ormconfig';

const connectToDB = async () => {
  let connection;

  try {
    // console.log('Check current connection to DB...');
    connection = await getConnection();
  } catch (e) {
    process.stderr.write(`Result: No current connection!\n`);
  }

  try {
    if (connection) {
      if (!connection.isConnected) {
        await connection.connect();
      }
    } else {
      // console.log('Create new connection to DB...');
      await createConnection(config);
    }
  } catch (e) {
    process.stderr.write(e);
  }
  process.stdout.write('Successfully Connected\n');
};

export const tryDBConnection = async (cb: () => void): Promise<void> => {
  try {
    await connectToDB();
    cb();
  } catch (e) {
    process.stderr.write('Error DB connection', e);
  }
};
