import {expect} from 'chai';
import {Item} from '../item/item';
import {ItemQuantity} from '../itemQuantity/item-quantity';
import {TimeFrame, TimeSpan} from '../timespan/timespan';
import {ItemFlow} from './item-flow';

describe('Class ItemFlow', () => {
	describe('Method: Equals', () => {
		const copper = new Item('Copper');
		const oneCopper = new ItemQuantity(copper, 1);
		const twoCopper = new ItemQuantity(copper, 2);
		const oneSecond = new TimeSpan(1, TimeFrame.SECONDS);
		const twoSecond = new TimeSpan(2, TimeFrame.SECONDS);

		it('should be the same when itemQuantities are the same', () => {
			const itemFlow = new ItemFlow(oneCopper, oneSecond);

			const expected = itemFlow.equals(new ItemFlow(oneCopper, oneSecond));
			expect(expected).to.be.true;
		});

		it('should not be the same when itemQuantities are not the same', () => {
			const itemFlow = new ItemFlow(oneCopper, oneSecond);

			const expected = itemFlow.equals(new ItemFlow(twoCopper, oneSecond));
			expect(expected).to.be.false;
		});

		it('should compare two itemflow with different TimeSpan', () => {
			const itemFlow = new ItemFlow(oneCopper, oneSecond);

			const expected = itemFlow.equals(new ItemFlow(twoCopper, twoSecond));
			expect(expected).to.be.true;
		});
	});
});
