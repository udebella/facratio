import {expect} from 'chai';
import {ItemFlow} from '../itemFlow/item-flow';
import {Recipe} from './recipe';

describe('Recipe', () => {
	let input: ItemFlow;
	let output: ItemFlow;
	beforeEach(() => {
		input = new ItemFlow(null, 1);
		output = new ItemFlow(null, 1);
	});

	describe('Initialization', () => {
		it('should init properly', () => {
			const recipe = new Recipe([], [], 1);
			expect(recipe).not.to.be.undefined;
		});
	});

	describe('Method: getInputByMinut', () => {
		it('should require no item for a free recipe', () => {
			const recipe = new Recipe([], [], 1);
			expect(recipe.getInput()).to.deep.equal([]);
		});

		it('should require 60 items for a recipe taking 1 item per second', () => {
			const recipe = new Recipe([input], [], 1);
			expect(recipe.getInput()).to.deep.equal([new ItemFlow(null, 1)]);
		});

		it('should require 30 items for a recipe taking one item every two second', () => {
			const recipe = new Recipe([input], [], 2);
			expect(recipe.getInput()).to.deep.equal([new ItemFlow(null, 0.5)]);
		});
	});

	describe('Method: getOutputByMinut', () => {
		it('should not output for a recipe witch is only consuming', () => {
			const recipe = new Recipe([], [], 1);
			expect(recipe.getOutput()).to.deep.equal([]);
		});

		it('should produce 60 items for a recipe producing one item per second', () => {
			const recipe = new Recipe([], [output], 1);
			expect(recipe.getOutput()).to.deep.equal([new ItemFlow(null, 1)]);
		});

		it('should produce 30 items for a recipe producing one item every two second', () => {
			const recipe = new Recipe([], [output], 2);
			expect(recipe.getOutput()).to.deep.equal([new ItemFlow(null, 0.5)]);
		});
	});
});
