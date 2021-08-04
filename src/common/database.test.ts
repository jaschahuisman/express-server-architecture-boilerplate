import Database from './database';

describe('Database', () => {
	it('should be defined', () => {
		expect(Database).toBeDefined();
	});

	it('should create an instance', () => {
		const database = new Database();
		expect(database).toBeDefined();
	});

	it('should have connect/disconnect methods', () => {
		const database = new Database();
		expect(database.connect).toBeDefined();
		expect(database.disconnect).toBeDefined();
	});

	it('should connect/disconnect with the database', async () => {
		const database = new Database();
		const connection = await database.connect();

		expect(connection).toBeDefined();
		expect(connection.readyState).toBe(1);

		await database.disconnect();
		expect(connection.readyState).toBe(0);
	});
});
