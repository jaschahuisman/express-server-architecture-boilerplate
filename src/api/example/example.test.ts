import supertest from 'supertest';
import Database from '@common/database';
import Server from '@common/server';
import Example from './example.model';

/** Configuration */
const database = new Database();
const server = new Server();
const app = supertest(server.app);

function generateExamplePayload(number: number) {
	return {
		name: `Example ${number}`,
		description: `Example ${number} description`,
		owner: `Example ${number} owner`,
		created: new Date(),
		modified: new Date(),
		tags: [`Example ${number} tag`],
		content: `<h1>Hello from example ${number} document!</h1>`,
	};
}

beforeAll(async () => {
	await database.connect();
});

afterAll(async () => {
	await database.clear();
	await database.disconnect();
});

/** Mongoose */
describe('Example: Mongoose Model', () => {
	const examplePayload = generateExamplePayload(1);

	it('should create an ExampleDocument instance', () => {
		const example = new Example(examplePayload);
		expect(example).toBeInstanceOf(Example);
	});

	it('should have a working checkOwnership method', () => {
		const example = new Example(examplePayload);
		expect(example.checkOwnership(examplePayload.owner)).toBe(true);
	});

	it('should have working a static getByName method', async () => {
		await new Example(examplePayload).save();
		const example = await Example.getByName(examplePayload.name);
		expect(example).toBeDefined();
		expect(example).toBeInstanceOf(Example);
	});
});

/** Express */
describe('Example: Express routes', () => {
	it('should GET /example', async () => {
		await app
			.get('/example')
			.expect(200)
			.then((res) => expect(res.text).toBe('Hello from Example Router!'));
	});

	it('should POST /example/create', async () => {
		const examplePayload = generateExamplePayload(2);
		await app
			.post('/example/create')
			.send(examplePayload)
			.expect(200)
			.then((res) => {
				const dbObject = JSON.parse(res.text);
				expect(dbObject.name).toBe(examplePayload.name);
			});
	});

	it('should GET /example/getByName', async () => {
		const examplePayload = generateExamplePayload(3);
		await app.post('/example/create').send(examplePayload);

		await app
			.get('/example/getByName')
			.send({ name: examplePayload.name })
			.expect(200)
			.then((res) => {
				const dbObject = JSON.parse(res.text);
				expect(dbObject.name).toBe(examplePayload.name);
			});
	});

	it('should GET /example/checkOwner', async () => {
		const examplePayload = generateExamplePayload(3);
		await app
			.get('/example/checkOwner')
			.send({ name: examplePayload.name, owner: examplePayload.owner })
			.expect(200)
			.then((res) => {
				expect(res.text).toBe('true');
			});
	});
});
