import {expect} from 'chai';
import {Item} from '../item/item';
import {ItemFlow} from '../itemFlow/item-flow';
import {ItemQuantity} from '../itemQuantity/item-quantity';
import {TimeFrame, TimeSpan} from '../timespan/timespan';
import {Recipe} from './recipe';

describe('Class Recipe', () => {
	const iron = new Item('Iron');
	const copper = new Item('Copper');
	const input = new ItemQuantity(iron, 1);
	const output = new ItemQuantity(copper, 1);
	const oneSecond = new TimeSpan(1, TimeFrame.SECONDS);
	const twoSecond = new TimeSpan(2, TimeFrame.SECONDS);

	describe('Method: getInput', () => {
		it('should require no item for a free recipe', () => {
			const recipe = new Recipe([], [], oneSecond);
			expect(recipe.getInput()).to.deep.equal([]);
		});

		it('should require 1 item/second for a recipe taking 1 item per second', () => {
			const recipe = new Recipe([input], [], oneSecond);
			expect(recipe.getInput()).to.deep.equal([new ItemFlow(input, oneSecond)]);
		});

		it('should require 0.5 item/second for a recipe taking one item every two second', () => {
			const recipe = new Recipe([input], [], twoSecond);
			expect(recipe.getInput()).to.deep.equal([new ItemFlow(input, twoSecond)]);
		});
	});

	describe('Method: getOutput', () => {
		it('should not output for a recipe witch is only consuming', () => {
			const recipe = new Recipe([], [], oneSecond);
			expect(recipe.getOutput()).to.deep.equal([]);
		});

		it('should produce 1 item/second for a recipe producing one item per second', () => {
			const recipe = new Recipe([], [output], oneSecond);
			expect(recipe.getOutput()).to.deep.equal([new ItemFlow(output, oneSecond)]);
		});

		it('should produce 0.5 item/second for a recipe producing one item every two seconds', () => {
			const recipe = new Recipe([], [output], twoSecond);
			expect(recipe.getOutput()).to.deep.equal([new ItemFlow(output, twoSecond)]);
		});
	});

	describe('Method: hasOutput', () => {
		it('should return true when recipe is producing the item', () => {
			const oneIron = new ItemQuantity(iron, 1);
			const recipe = new Recipe([], [oneIron], oneSecond);

			const hasOutput = recipe.hasOutput(iron);

			expect(hasOutput).to.be.true;
		});

		it('should return false when recipe is not producing the item', () => {
			const oneIron = new ItemQuantity(iron, 1);
			const recipe = new Recipe([], [oneIron], oneSecond);

			const hasOutput = recipe.hasOutput(copper);

			expect(hasOutput).to.be.false;
		});
	});
});
