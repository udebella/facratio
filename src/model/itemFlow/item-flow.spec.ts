import {expect} from 'chai';
import {FlowableQuantity, ItemFlow} from './item-flow';

describe('Class ItemFlow', () => {
	describe('Method: Equals', () => {
		const oneSecond = {
			getSeconds : () => 1,
		};

		it('should be the same when quantities are the same', () => {
			const flowableQuantity: FlowableQuantity = {
				divide() {return this; },
				equals() {return true; },
			};
			const itemFlow = new ItemFlow(flowableQuantity, oneSecond);
			const expected = itemFlow.equals(new ItemFlow(flowableQuantity, oneSecond));

			expect(expected).to.be.true;
		});

		it('should not be the same when quantities are not the same', () => {
			const flowableQuantity: FlowableQuantity = {
				divide() {return this; },
				equals() {return false; },
			};
			const itemFlow = new ItemFlow(flowableQuantity, oneSecond);

			const expected = itemFlow.equals(new ItemFlow(flowableQuantity, oneSecond));
			expect(expected).to.be.false;
		});
	});
});
