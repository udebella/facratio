import {expect} from 'chai';
import {Item} from '../item/item';
import {ItemFlow} from '../itemFlow/item-flow';
import {ItemQuantity} from './item-quantity';

describe('Class ItemQuantity', () => {
	const iron = new Item('Iron');

	describe('Method: over', () => {
		it('should produce an iron flow when a timespan is 1 second', () => {
			const itemQuantity = new ItemQuantity(iron, 1);
			const timeSpan = {
				getSeconds: () => 1
			};

			const itemFlow = itemQuantity.over(timeSpan);

			const expectedFlow = new ItemFlow(new ItemQuantity(iron, 1), timeSpan);
			expect(itemFlow.equals(expectedFlow)).to.be.true;
		});
	});

	describe('Method: getItem', () => {
		it('should give access to the item object', () => {
			const itemQuantity = new ItemQuantity(iron, 1);
			expect(itemQuantity.getItem()).to.be.equals(iron);
		});
	});

	describe('Method: equals', () => {
		it('should recognize comparable quantities', () => {
			const itemQuantity = new ItemQuantity(iron, 2);

			const expected = new ItemQuantity(iron, 2);
			expect(itemQuantity.equals(expected)).to.be.true;
		});

		it('should not be equal if we compare quantities of different items', () => {
			const itemQuantity = new ItemQuantity(iron, 2);

			const expected = new ItemQuantity(new Item('Copper'), 2);
			expect(itemQuantity.equals(expected)).to.be.false;
		});

		it('should not be equal if we compare different quantities the same iron', () => {
			const itemQuantity = new ItemQuantity(iron, 2);

			const expected = new ItemQuantity(new Item('Iron'), 1);
			expect(itemQuantity.equals(expected)).to.be.false;
		});
	});

	describe('Method: divide', () => {
		it('should allow to divide an itemQuantity by two', () => {
			const itemQuantity = new ItemQuantity(iron, 2);

			const itemQuantityDivided = itemQuantity.divide(2);

			const expected = itemQuantityDivided.equals(new ItemQuantity(iron, 1));
			expect(expected).to.be.true;
		});

		it('should not allow a division by 0', () => {
			const itemQuantity = new ItemQuantity(iron, 2);

			expect(() => itemQuantity.divide(0)).to.throw('Invalid division factor');
		});
	});
});
