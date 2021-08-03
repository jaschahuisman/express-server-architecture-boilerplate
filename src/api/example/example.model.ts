import mongoose from 'mongoose';
import { ExampleDocument, IExampleModel } from '@src/types/example';

const exampleSchema = new mongoose.Schema<ExampleDocument>({
	name: { type: String, required: true },
	description: { type: String, required: true },
	created: { type: Date, default: Date.now },
	modified: { type: Date, default: Date.now },
	owner: { type: String, required: true },
	tags: { type: [String], default: [] },
	content: { type: String, default: '' },
});

exampleSchema.methods = {
	/**
	 * ### checkOwnership
	 * Example method that checks if the owner of a specified \
	 * example document is the same as the given owner parameter.
	 * @param {string} owner
	 * @returns {boolean}
	 */
	checkOwnership: function (owner: string): boolean {
		return this.owner === owner;
	},
};

exampleSchema.statics = {
	/**
	 * ### getByName
	 * Example static method that gets a single document by name.
	 * @param  {string} name
	 * @returns {Promise<ExampleDocument | undefined>}
	 */
	getByName: async function (name: string): Promise<ExampleDocument | undefined> {
		return await this.findOne({ name }).exec();
	},
};

/**
 * ## exampleModel
 * Mongoose model that implements the exampleSchema & IExampleModel interface.
 * @extends {ExampleDocument, IExampleModel}
 */
const exampleModel = mongoose.model<ExampleDocument, IExampleModel>(
	'Example',
	exampleSchema,
);

export default exampleModel;
