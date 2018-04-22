import {expect} from 'chai';
import {createStubInstance} from 'sinon';
import {Item} from '../item/item';
import {ItemFlow} from '../itemFlow/item-flow';
import {ItemQuantity} from '../itemQuantity/item-quantity';
import {TimeFrame, TimeSpan} from '../timespan/timespan';
import {Recipe} from './recipe';

describe('Class Recipe', () => {
	describe('Unit testing', () => {
		let timespan: TimeSpan;
		let input: any;
		let output: any;

		beforeEach(() => {
			timespan = createStubInstance(TimeSpan);
			input = createStubInstance(ItemQuantity);
			output = createStubInstance(ItemQuantity);
		});

		describe('Method: consumes', () => {
			it('should require no item for a free recipe', () => {
				const recipe = new Recipe([], [], timespan);
				expect(recipe.consumes()).to.deep.equal([]);
			});

			it('should consume ab itemflow corresponding to the recipe', () => {
				input.over.returns(new ItemFlow(input, timespan));
				const recipe = new Recipe([input], [], timespan);

				expect(recipe.consumes()).to.deep.equal([new ItemFlow(input, timespan)]);
			});
		});

		describe('Method: produces', () => {
			it('should not output for a recipe witch is only consuming', () => {
				const recipe = new Recipe([], [], timespan);
				expect(recipe.produces()).to.deep.equal([]);
			});

			it('should produce an itemflow corresponding to the recipe', () => {
				output.over.returns(new ItemFlow(output, timespan));
				const recipe = new Recipe([], [output], timespan);

				expect(recipe.produces()).to.deep.equal([new ItemFlow(output, timespan)]);
			});
		});

		describe('Method: getProducedItems', () => {
			it('should return an empty list when the recipe only consumes', () => {
				const recipe = new Recipe([], [], timespan);

				expect(recipe.getProducedItems()).to.deep.equal([]);
			});

			it('should return the list of items produced', () => {
				output.getItem.returns(new Item('gear'));
				const recipe = new Recipe([], [output], timespan);

				expect(recipe.getProducedItems()).to.deep.equal([new Item('gear')]);
			});
		});
	});

	describe('Component tests', () => {
		let recipe: Recipe;

		beforeEach(() => {
			const iron = new Item('iron');
			const gear = new Item('gear');
			const output = new ItemQuantity(gear, 1);
			const input = new ItemQuantity(iron, 2);
			const craftingTime = new TimeSpan(0.5, TimeFrame.SECONDS);
			recipe = new Recipe([input], [output], craftingTime);
		});

		it('should calculate right consumption', () => {
			const iron = new Item('iron');
			const consputionPerSecond = new ItemQuantity(iron, 4);
			const oneSecond = new TimeSpan(1, TimeFrame.SECONDS);

			expect(recipe.consumes()).to.deep.equals([new ItemFlow(consputionPerSecond, oneSecond)]);
		});

		it('should calculate right production', () => {
			const gear = new Item('gear');
			const productionPerSecond = new ItemQuantity(gear, 2);
			const oneSecond = new TimeSpan(1, TimeFrame.SECONDS);

			expect(recipe.produces()).to.deep.equals([new ItemFlow(productionPerSecond, oneSecond)]);
		});

		it('should be able to verify that the recipe produces gears', () => {
			const gear = new Item('gear');

			expect(recipe.getProducedItems()).to.deep.equals([gear]);
		});
	});
});
