import express from 'express';
import exampleRouter from './api/example/example.router';

/**
 * ## Routes
 * Configure the custom routes for the api application by \
 * using the imported routers on their provided path.
 *
 * ```typescript
 * // Example usage
 * export default function routes(app: express.Application) {
 * 	app.use('/api', apiRouter);
 * 	app.use('/user', userRouter);
 * 	app.use('/products', productRouter);
 * }
 * ```
 * @param  {express.Application} app
 */
export default function routes(app: express.Application) {
	app.use('/example', exampleRouter);
}
