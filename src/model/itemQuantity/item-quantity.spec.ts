import {expect} from 'chai';
import {Item} from '../item/item';
import {ItemFlow} from '../itemFlow/item-flow';
import {TimeFrame, TimeSpan} from '../timespan/timespan';
import {ItemQuantity} from './item-quantity';

describe('Class ItemQuantity', () => {
	const iron = new Item('Iron');

	describe('Initialization', () => {
		it('should init properly', () => {
			const itemQuantity = new ItemQuantity(iron, 1);
			expect(itemQuantity).not.to.be.undefined;
		});
	});

	describe('Method: over', () => {
		it('should produce an iron flow when a timespan is 1 second', () => {
			const itemQuantity = new ItemQuantity(iron, 1);

			const itemFlow = itemQuantity.over(new TimeSpan(1, TimeFrame.SECONDS));

			const expectedFlow = new ItemFlow(new ItemQuantity(iron, 1), new TimeSpan(1, TimeFrame.SECONDS));
			expect(itemFlow.equals(expectedFlow)).to.be.true;
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

	describe('Method: multiply', () => {
		it('should allow to multiply an itemQuantity', () => {
			const itemQuantity = new ItemQuantity(iron, 1);

			const itemQuantityMultiplied = itemQuantity.multiply(2);

			const expected = itemQuantityMultiplied.equals(new ItemQuantity(iron, 2));
			expect(expected).to.be.true;
		});
	});
});
