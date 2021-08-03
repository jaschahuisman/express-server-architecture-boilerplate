/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleNameMapper: {
		'^@src/(.*)$': '<rootDir>/src/$1',
		'^@common/(.*)$': '<rootDir>/src/common/$1',
		'^@types/(.*)$': '<rootDir>/src/types/$1',
	},
};
