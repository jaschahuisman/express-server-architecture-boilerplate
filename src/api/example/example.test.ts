import supertest from 'supertest';
import Database from '@common/database';
import Server from '@common/server';

const database = new Database();
const server = new Server();
const app = supertest(server.app);

const examplePayload_1 = {
	name: 'Example 1',
	description: 'Example description 1',
	owner: 'John Doe',
	created: new Date(),
	modified: new Date(),
	tags: ['Example tag 1', 'Example tag 2'],
	content: '<h1>Hello from example 1 document!</h1>',
};

const examplePayload_2 = {
	name: 'Example 2',
	description: 'Example description 2',
	owner: 'Andrea Smith',
	created: new Date(),
	modified: new Date(),
	tags: ['Example tag 1', 'Example tag 2'],
	content: '<h1>Hello from example 2 document!</h1>',
};

beforeAll(async () => {
	await database.connect();
});

afterAll(async () => {
	await database.clear();
	await database.disconnect();
});

describe('example routes', () => {
	it('should GET /example', async () => {
		await app
			.get('/example')
			.expect(200)
			.then((res) => expect(res.text).toBe('Hello from Example Router!'));
	});

	it('should POST /example/create', async () => {
		await app
			.post('/example/create')
			.send(examplePayload_1)
			.expect(200)
			.then((res) => {
				const dbObject = JSON.parse(res.text);
				expect(dbObject.name).toBe(examplePayload_1.name);
			});
	});

	it('should GET /example/getByName', async () => {
		await app.post('/example/create').send(examplePayload_2);

		await app
			.get('/example/getByName')
			.send({ name: examplePayload_1.name })
			.expect(200)
			.then((res) => {
				const dbObject = JSON.parse(res.text);
				expect(dbObject.name).toBe(examplePayload_1.name);
			});
	});

	it('should GET /example/checkOwner', async () => {
		await app
			.get('/example/checkOwner')
			.send({ name: examplePayload_1.name, owner: examplePayload_1.owner })
			.expect(200)
			.then((res) => {
				expect(res.text).toBe('true');
			});
	});
});