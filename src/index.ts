import '@common/env';
import Server from '@common/server';
import Database from '@common/database';

// Start server
const port = parseInt(process.env.PORT || '3000');
const server = new Server();
server.listen(port);

// Start database
const database = new Database();
database.connect();
