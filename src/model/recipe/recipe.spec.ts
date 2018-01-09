import {expect} from 'chai';
import {createStubInstance} from 'sinon';
import {Item} from '../item/item';
import {ItemFlow} from '../itemFlow/item-flow';
import {ItemQuantity} from '../itemQuantity/item-quantity';
import {TimeSpan} from '../timespan/timespan';
import {Recipe} from './recipe';

describe('Class Recipe', () => {
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

	describe('Method: CanProduce', () => {
		let item: any;

		beforeEach(() => {
			item = createStubInstance(Item);
		});

		it('should return true when recipe is producing the item', () => {
			output.hasItem.returns(true);
			const recipe = new Recipe([], [output], timespan);

			const hasOutput = recipe.canProduce(item);

			expect(hasOutput).to.be.true;
		});

		it('should return false when recipe is not producing the item', () => {
			output.hasItem.returns(false);
			const recipe = new Recipe([], [output], timespan);

			const hasOutput = recipe.canProduce(item);

			expect(hasOutput).to.be.false;
		});

		it('should return false when the recipe is only consuming', () => {
			const recipe = new Recipe([], [], timespan);

			const hasOutput = recipe.canProduce(item);

			expect(hasOutput).to.be.false;
		});
	});
});
