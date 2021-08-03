import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import os from 'os';
import http from 'http';
import routes from '@src/routes';

const root: string = path.normalize(__dirname + '/../..');

/**
 * ## IExpressServer
 * Interface dedicated to the {@link ExpressServer } class.
 * @interface IExpressServer
 */
export interface IExpressServer {
	app: express.Application;
}

/**
 * ## ExpressServer
 * Server class that is responsible for the creation of the express server used \
 * in this application. By initializing a new instance of this class, the express server \
 * is created and must be started with the {@link ExpressServer.listen listen  } method.
 * @class ExpressServer
 */
export default class ExpressServer implements IExpressServer {
	/**
	 * ### app
	 * Default express application dedicated to the server.
	 * @returns {express.Application} app
	 */
	public app: express.Application;
	/**
	 * ### constructor
	 * Initializes the http server in the desired order.
	 * 1. Initialize the default middleware
	 * 2. Serve static files
	 * 3. Serve custom routes
	 * 4. Initialize error handler middleware
	 */
	public constructor() {
		this.app = express();
		this.initialize();
		this.serveStatic();
		this.serveRoutes();
		this.initializeErrorHandlers();
	}

	/**
	 * ### initialize
	 * Initializes the default middleware configuration for the server.
	 * @returns {void}
	 */
	private initialize(): void {
		this.app.use(cors({ origin: '*' }));
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(bodyParser.urlencoded({ extended: true }));
	}

	/**
	 * ### serveStatic
	 * Serves static files from the root/static directory.
	 * @returns {void}
	 */
	private serveStatic(): void {
		this.app.use('/static', express.static(`${root}/static`));
	}

	/**
	 * ### serveRoutes
	 * Serves custom routes from the routes directory.
	 * @returns {void}
	 */
	private serveRoutes(): void {
		routes(this.app);
	}

	/**
	 * ### initializeErrorHandlers
	 * Initializes the default error handlers for the server.
	 * @returns {void}
	 */
	private initializeErrorHandlers(): void {
		this.app.use((req, res) => res.status(404).send('Not found'));
	}

	/**
	 * ### listen
	 * Run a http server with the express app and listen on the specified port.
	 *
	 * ```typescript
	 * // Start server
	 * const port = 3000;
	 * const server = new Server();
	 * server.listen(port);
	 * ```
	 *
	 * @param  {number} port
	 * @returns {express.Application} express
	 */
	public listen(port: number): express.Application {
		/**
		 * ### welcome
		 * Generates a welcome message for the server log.
		 * @param  {number} p
		 * @returns void
		 */
		const welcome = (p: number) => (): void => {
			const environment = process.env.NODE_ENV || 'development';
			const device = os.hostname();
			const message = `*** Server running in: ${environment} @: ${device} on port: ${p}`;
			console.log(message);
		};

		http.createServer(this.app).listen(port, welcome(port));

		return this.app;
	}
}
