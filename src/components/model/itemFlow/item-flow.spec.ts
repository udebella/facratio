import {assert, expect} from 'chai';
import {Item} from '../item/item';
import {ItemFlow} from './item-flow';

describe('ItemFlow', () => {
	let item;
	beforeEach(() => {
		item = new Item('Iron');
	});

	describe('Initialization', () => {
		it('should init properly', () => {
			const itemFlow = new ItemFlow(item, 1);
			expect(itemFlow).not.to.be.undefined;
		});
	});

	describe('Method: multiplyFlow', () => {
		it('should multiply quantity of the itemFlow', () => {
			const itemFlow = new ItemFlow(item, 1);
			expect(itemFlow.multiplyFlow(2)).to.deep.equal(new ItemFlow(item, 2));
		});

		it('should not mutate the object', () => {
			const itemFlow = new ItemFlow(item, 1);
			itemFlow.multiplyFlow(2);
			expect(itemFlow).to.deep.equal(new ItemFlow(item, 1));
		});
	});

	describe('Method: divideFlow', () => {
		it('should dividde quantity of the itemFlow', () => {
			const itemFlow = new ItemFlow(item, 1);
			expect(itemFlow.divideFlow(2)).to.deep.equal(new ItemFlow(item, 0.5));
		});

		it('should not mutate the object', () => {
			const itemFlow = new ItemFlow(item, 1);
			itemFlow.divideFlow(2);
			expect(itemFlow).to.deep.equal(new ItemFlow(item, 1));
		});
	});
});
