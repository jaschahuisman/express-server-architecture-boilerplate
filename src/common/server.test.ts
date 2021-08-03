import supertest from 'supertest';
import Server from './server';

describe('Server', () => {
	it('should be defined', () => {
		expect(Server).toBeDefined();
	});

	it('should create an instance', () => {
		const server = new Server();
		expect(server).toBeDefined();
	});

	it('should initialize', () => {
		const server = new Server();
		expect(server.app).toBeDefined();
	});

	it('should have a listen method', () => {
		const server = new Server();
		expect(server.listen).toBeDefined();
	});

	it('should get a 200 response on the /example route', async () => {
		const server = new Server();
		const app = supertest(server.app);

		await app
			.get('/example')
			.expect(200)
			.then((res) => {
				expect(res.text).toBe('Hello from Example Router!');
			});
	});
});
