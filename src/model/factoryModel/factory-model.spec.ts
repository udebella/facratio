import {expect} from 'chai';
import {Item} from '../item/item';
import {FactoryModel, OutputingRecipe} from './factory-model';

describe('Class FactoryModel', () => {
	const gear = new Item('Gear');

	describe('Method: CanProduce', () => {
		const gearsRecipe: OutputingRecipe = {
			hasOutput: (item) => item === gear
		};
		const copperWireRecipe: OutputingRecipe = {
			hasOutput: () => false
		};

		it('should check if there is a recipe that can produce some items', () => {
			const factoryType = new FactoryModel([copperWireRecipe, gearsRecipe], 1);
			expect(factoryType.canProduce(gear)).to.be.true;
		});

		it('should return false if no recipe can produce an item', () => {
			const factoryType = new FactoryModel([], 1);
			expect(factoryType.canProduce(gear)).to.be.false;
		});
	});
});
