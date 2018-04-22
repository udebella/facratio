import {expect} from 'chai';
import {Item} from '../item/item';
import {FactoryModel, ProducingRecipe} from './factory-model';

describe('Class FactoryModel', () => {
	const gear = new Item('Gear');

	describe('Method: CanProduce', () => {
		const gearsRecipe: ProducingRecipe = {
			getProducedItems: () => [gear]
		};
		const copperWireRecipe: ProducingRecipe = {
			getProducedItems: () => []
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

	describe('Method: ListProducibleItems', () => {
		it('should list all items the factory can produce', () => {
			const gearsRecipe: ProducingRecipe = {
				getProducedItems: () => [gear]
			};
			const factoryType = new FactoryModel([gearsRecipe], 1);
			expect(factoryType.listProducibleItems()).to.deep.equals([gear]);
		});

		it('should produce no items for a factory model without recipes', () => {
			const factoryType = new FactoryModel([], 1);
			expect(factoryType.listProducibleItems()).to.deep.equals([]);
		});
	});
});
