import {expect} from 'chai';
import {Item} from './item';

describe('Class Item', () => {
	describe('Method: Equals', () => {
		it('different items should not be equals', () => {
			const iron = new Item('Iron');
			const copper = new Item('copper');

			expect(iron.equals(copper)).to.be.false;
			expect(iron.equals(new Item('Iron'))).to.be.true;
		});

		it('same items should be equals', () => {
			const iron = new Item('Iron');

			expect(iron.equals(new Item('Iron'))).to.be.true;
		});
	});
});
