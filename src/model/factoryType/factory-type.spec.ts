import {expect} from 'chai';
import {Item} from '../item/item';
import {ItemFlow} from '../itemFlow/item-flow';
import {Recipe} from '../recipe/recipe';
import {FactoryType} from './factory-type';

describe('Factory', () => {
	describe('Initialization', () => {
		it('should init properly', () => {
			const factoryType = new FactoryType([], 1);
			expect(factoryType).not.to.be.undefined;
		});
	});

	describe('Method: findRecipeForProducing', () => {
		it('should search into factoryType to find right recipe to use', () => {
			const gears = new Item('Gears');
			const copperWire = new Item('Copper wire');
			const gearsRecipe = new Recipe([], [new ItemFlow(gears, 1)], 0.5);
			const copperWireRecipe = new Recipe([], [new ItemFlow(copperWire, 1)], 0.5);
			const factoryType = new FactoryType([copperWireRecipe, gearsRecipe], 1);
			expect(factoryType.findRecipeForProducing(gears)).to.equal(gearsRecipe);
		});
	});

	describe('Method: CanProduce', () => {
		it('should check if there is a recipe that can produce some items', () => {
			const gears = new Item('Gears');
			const copperWire = new Item('Copper wire');
			const gearsRecipe = new Recipe([], [new ItemFlow(gears, 1)], 0.5);
			const copperWireRecipe = new Recipe([], [new ItemFlow(copperWire, 1)], 0.5);
			const factoryType = new FactoryType([copperWireRecipe, gearsRecipe], 1);
			expect(factoryType.canProduce(gears)).to.be.true;
		});

		it('should return false if no recipe can produce an item', () => {
			const gears = new Item('Gears');
			const factoryType = new FactoryType([], 1);
			expect(factoryType.canProduce(gears)).to.be.false;
		});
	});
});
