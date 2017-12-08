import {expect} from 'chai';
import {Item} from './item';

describe('Item', () => {
	describe('Initialization', () => {
		it('should init properly', () => {
			const item = new Item('Iron');
			expect(item).not.to.be.undefined;
		});
	});
});
