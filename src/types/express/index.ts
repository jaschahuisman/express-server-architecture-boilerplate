/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-empty-interface */
export default '';

declare global {
	namespace Express {
		export interface Request {
			// Define custom request properties & methods
		}
	}
}

declare module 'express-serve-static-core' {
	interface Request {
		// Define custom request properties & methods (again)
	}
}
