import mongoose from 'mongoose';

/**
 * ## IDatabase
 * Interface dedicated to the {@link Database } class.
 * @interface IDatabase
 */
export interface IDatabase {
	options: mongoose.ConnectOptions;
	getConnectionString(): string;
	connect: () => Promise<mongoose.Connection>;
	disconnect: () => Promise<void>;
	clear: () => Promise<void>;
}

/**
 * ## Database
 * Database class that is responsible for the creation of the main database \
 * in this application. By initializing a new instance of this class, database \
 * is created and must be started with the {@link Database.connect connect  } method.
 * @class Database
 */
export default class Database implements IDatabase {
	/**
	 * ### Mongoose connection options
	 * @type {mongoose.ConnectOptions}
	 */
	public options: mongoose.ConnectOptions = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	};

	/**
	 * ### getConnectionString
	 * Get the connection string for the database corresponding to the current environment.
	 *
	 * Available environments:
	 * - `development`
	 * - `test`
	 * - `production`
	 *
	 * Specifiy the environment with the `NODE_ENV` environment variable.
	 *
	 * @returns {string}
	 */
	public getConnectionString(): string {
		switch (process.env.NODE_ENV) {
			case 'development':
				return 'mongodb://localhost/dbname-dev';
			case 'production':
				return (
					(process.env.MONGODB_URI as string) ||
					'mongodb://localhost:27017/dbname-prod'
				);
			default:
				return 'mongodb://localhost/dbname-test';
		}
	}
	/**
	 * ### connect
	 * Connect to the database with the calculated connectionstring, \
	 * and retrieve a mongoose connection object.
	 *
	 * ```typescript
	 * // Start database
	 * const database = new Database();
	 * database.connect();
	 * ```
	 *
	 * @returns {Promise<mongoose.Connection>}
	 */
	public async connect(): Promise<mongoose.Connection> {
		const connectionString = this.getConnectionString();

		await mongoose
			.connect(connectionString, this.options)
			.then(() => {
				console.info(`*** Connected to database: ${connectionString}`);
			})
			.catch((err) => {
				console.error(
					`*** Failed to connect to database: ${connectionString}`,
					err,
				);
			});

		const db = mongoose.connection;
		db.on('error', (err) => console.log('*** Database error: ', err));

		return db;
	}

	/**
	 * ### disconnect
	 * Disconnect from the database.
	 * @returns {Promise<void>}
	 */
	public async disconnect(): Promise<void> {
		await mongoose
			.disconnect()
			.then(() => console.info('*** Disconnected from database'));
	}

	/**
	 * ### clear
	 * Clear the database.
	 * @returns {Promise<void>}
	 */
	public async clear(): Promise<void> {
		await mongoose.connection.dropDatabase();
	}
}
