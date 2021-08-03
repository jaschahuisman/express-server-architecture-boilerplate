import express from 'express';
import Example from './example.model';

/**
 * ### createExampleDocument
 * Create a new example document from the request body's JSON data.
 * @param  {express.Request} req
 * @param  {express.Response} res
 * @param  {express.NextFunction} next
 * @returns {void}
 */
export function createExampleDocument(
	req: express.Request,
	res: express.Response,
	next: express.NextFunction,
): void {
	const exampleFromBody = req.body;
	const example = new Example(exampleFromBody);

	example.save((err) => {
		if (err) return next(err);
		res.json(example);
	});
}

/**
 * ### getByName
 * Get a example document by its name.
 * @param  {express.Request} req
 * @param  {express.Response} res
 * @param  {express.NextFunction} next
 * @returns {Promise<void>}
 */
export async function getByName(
	req: express.Request,
	res: express.Response,
	next: express.NextFunction,
): Promise<void> {
	const query = req.body.name;
	const example = await Example.getByName(query);

	if (!example) return next(new Error('Example document not found'));
	res.json(example);
}

/**
 * ### checkOwnership
 * Check a example document's ownership by its name & owner.
 * @param  {express.Request} req
 * @param  {express.Response} res
 * @param  {express.NextFunction} next
 * @returns {Promise<void>}
 */
export async function checkOwnership(
	req: express.Request,
	res: express.Response,
	next: express.NextFunction,
): Promise<void> {
	const query = req.body.name;
	const owner = req.body.owner;
	const example = await Example.getByName(query);

	if (!example) return next(new Error('Example not found'));

	const isOwner = example.checkOwnership(owner);
	res.json(isOwner);
}
