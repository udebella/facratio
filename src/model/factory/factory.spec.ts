import {expect} from 'chai';
import {Factory} from './factory';

describe('Class Factory', () => {

	describe('Method: computeMaximumOutput', () => {
		it('should produce no output when the recipebook does not contain a recipe for the item', () => {
			const factory = new Factory();
			expect(factory.computeMaximumOutput()).to.deep.equal([]);
		});
	});
});
