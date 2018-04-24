import {expect} from 'chai';
import {Item} from '../item/item';
import {ItemQuantity} from '../itemQuantity/item-quantity';
import {buildTimeSpan, TimeFrame, TimeSpan} from '../timespan/timespan';
import {ItemFlow} from './item-flow';

describe('ItemFlow features', () => {
	const copper = new Item('Copper');
	const oneCopper = new ItemQuantity(copper, 1);
	const twoCopper = new ItemQuantity(copper, 2);
	const oneSecond = buildTimeSpan(1, TimeFrame.SECONDS);
	const twoSecond = buildTimeSpan(2, TimeFrame.SECONDS);

	it('should compare two itemflow with different TimeSpan', () => {
		const itemFlow = new ItemFlow(oneCopper, oneSecond);

		const expected = itemFlow.equals(new ItemFlow(twoCopper, twoSecond));
		expect(expected).to.be.true;
	});
});
