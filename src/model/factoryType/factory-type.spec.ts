import {expect} from 'chai';
import {Item} from '../item/item';
import {ItemFlow} from '../itemFlow/item-flow';
import {ItemQuantity} from '../itemQuantity/item-quantity';
import {Recipe} from '../recipe/recipe';
import {TimeFrame, TimeSpan} from '../timespan/timespan';
import {FactoryType} from './factory-type';

// TODO Work in progress : need to refactor
describe.skip('Factory', () => {
	const halfASecond = new TimeSpan(0.5, TimeFrame.SECONDS);
	const gears = new Item('Gears');
	const oneGear = new ItemQuantity(gears, 1);
	const copperWire = new Item('Copper wire');
	const oneCopperWire = new ItemQuantity(copperWire, 1);
	const gearsRecipe = new Recipe([], [oneGear], halfASecond);
	const copperWireRecipe = new Recipe([], [oneCopperWire], halfASecond);

	describe('Method: findRecipeForProducing', () => {
		it('should search into factoryType to find right recipe to use', () => {
			const factoryType = new FactoryType([copperWireRecipe, gearsRecipe], 1);
			expect(factoryType.findRecipeForProducing(gears)).to.equal(gearsRecipe);
		});
	});

	describe('Method: CanProduce', () => {
		it('should check if there is a recipe that can produce some items', () => {
			const factoryType = new FactoryType([copperWireRecipe, gearsRecipe], 1);
			expect(factoryType.canProduce(gears)).to.be.true;
		});

		it('should return false if no recipe can produce an item', () => {
			const factoryType = new FactoryType([], 1);
			expect(factoryType.canProduce(gears)).to.be.false;
		});
	});
});
