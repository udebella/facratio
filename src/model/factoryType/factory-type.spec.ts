import {expect} from 'chai';
import {Item} from '../item/item';
import {OutputingRecipe} from '../recipe/recipe';
import {FactoryType} from './factory-type';

describe('Class FactoryType', () => {
	const gear = new Item('Gear');
	const gearsRecipe: OutputingRecipe = {
		hasOutput: item => item === gear
	};
	const copperWireRecipe: OutputingRecipe = {
		hasOutput: () => false
	};

	describe('Method: CanProduce', () => {
		it('should check if there is a recipe that can produce some items', () => {
			const factoryType = new FactoryType([copperWireRecipe, gearsRecipe], 1);
			expect(factoryType.canProduce(gear)).to.be.true;
		});

		it('should return false if no recipe can produce an item', () => {
			const factoryType = new FactoryType([], 1);
			expect(factoryType.canProduce(gear)).to.be.false;
		});
	});
});
