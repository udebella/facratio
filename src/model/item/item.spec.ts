import {expect} from 'chai';
import {buildItem} from './item';

describe('Item', () => {
	describe('Method: Equals', () => {
		it('different items should not be equals', () => {
			const iron = buildItem('iron');
			const copper = buildItem('copper');

			expect(iron.equals(copper)).to.be.false;
		});

		it('same items should be equals', () => {
			const iron = buildItem('iron');

			expect(iron.equals(buildItem('iron'))).to.be.true;
		});
	});

	describe('Method: getItem', () => {
		it('different items should not be equals', () => {
			const copper = buildItem('copper');

			expect(copper.getName()).to.equals('copper');
		});
	});
});
