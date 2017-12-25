import {expect} from 'chai';
import {Item} from '../item/item';
import {OutputingRecipe} from '../recipe/recipe';
import {RecipeBook} from './recipe-book';

describe('Class RecipeBook', () => {
	const gear = new Item('Gear');

	describe('Method: CanProduce', () => {
		const gearsRecipe: OutputingRecipe = {
			hasOutput: (item) => item === gear
		};
		const copperWireRecipe: OutputingRecipe = {
			hasOutput: () => false
		};

		it('should check if there is a recipe that can produce some items', () => {
			const factoryType = new RecipeBook([copperWireRecipe, gearsRecipe]);
			expect(factoryType.canProduce(gear)).to.be.true;
		});

		it('should return false if no recipe can produce an item', () => {
			const factoryType = new RecipeBook([]);
			expect(factoryType.canProduce(gear)).to.be.false;
		});
	});
});
