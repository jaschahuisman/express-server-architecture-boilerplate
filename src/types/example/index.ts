import mongoose from 'mongoose';

/**
 * ### IExampleProperties
 * Example of a mongoose document properties interface \
 * extention (implemented in the example model).
 */
export interface IExampleProperties {
	name: string;
	description: string;
	created: Date;
	modified: Date;
	owner: string;
	tags: string[];
	content: string;
}

/**
 * ### IExampleMethods
 * Example of a mongoose document methods interface \
 * extention (implemented in the example model).
 */
export interface IExampleMethods {
	/**
	 * ### checkOwnership
	 * Example method that checks if the owner of a specified \
	 * example document is the same as the given owner parameter.
	 * @param {string} owner
	 * @returns {boolean}
	 */
	checkOwnership(owner: string): boolean;
}

/**
 * ### ExampleDocument
 * Example mongoose document interface.
 * @properties {@link IExampleProperties}
 * @methods {@link IExampleMethods}
 */
export type ExampleDocument = IExampleProperties & IExampleMethods;

/**
 * ### ExampleModel
 * Example mongoose (global) model interface containing static methods.
 */
export interface IExampleModel extends mongoose.Model<ExampleDocument> {
	/**
	 * ### getByName
	 * Example static method that gets a single document by name.
	 * @param  {string} name
	 * @returns {Promise<ExampleDocument | undefined>}
	 */
	getByName(name: string): Promise<ExampleDocument | undefined>;
}
