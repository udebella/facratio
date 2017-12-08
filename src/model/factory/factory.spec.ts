import {expect} from 'chai';
import {stub} from 'sinon';
import {FactoryType} from '../factoryType/factory-type';
import {Item} from '../item/item';
import {ItemFlow} from '../itemFlow/item-flow';
import {Recipe} from '../recipe/recipe';
import {Factory} from './factory';

describe('Factory', () => {
	const gear = new Item('Gear');
	let factoryType: FactoryType;
	let outputNeeded: ItemFlow;
	beforeEach(() => {
		factoryType = new FactoryType([], 1);
		outputNeeded = new ItemFlow(gear, 1);
	});

	describe('Initialization', () => {
		it('should init properly', () => {
			const factory = new Factory(factoryType, [outputNeeded]);
			expect(factory).not.to.be.undefined;
		});
	});

	describe('Method: getIdealInput', () => {
		let recipe: Recipe;
		beforeEach(() => {
			recipe = new Recipe([], [], 1);
			stub(factoryType, 'findRecipeForProducing').returns(recipe);
		});

		it('should take no input for an only producing recipe', () => {
			const factory = new Factory(factoryType, [outputNeeded]);
			expect(factory.getIdealInput()).to.deep.equal([]);
		});

		it('should take 60 item for a recipe needing 60 items with a crafting speed of 1', () => {
			stub(recipe, 'getInput').returns([new ItemFlow(null, 60)]);
			const factory = new Factory(factoryType, [outputNeeded]);
			expect(factory.getIdealInput()).to.deep.equal([new ItemFlow(null, 60)]);
		});

		it('should take 120 items for a recipe needing 60 items with a crafting speed of 2', () => {
			stub(recipe, 'getInput').returns([new ItemFlow(null, 60)]);
			stub(factoryType, 'getCraftingSpeed').returns(2);
			const factory = new Factory(factoryType, [outputNeeded]);
			expect(factory.getIdealInput()).to.deep.equal([new ItemFlow(null, 120)]);
		});
	});

	describe('Method: getIdealOutput', () => {
		let recipe: Recipe;
		beforeEach(() => {
			recipe = new Recipe([], [], 1);
			stub(factoryType, 'findRecipeForProducing').returns(recipe);
		});

		it('should produce no output for an only consuming recipe', () => {
			const factory = new Factory(factoryType, [outputNeeded]);
			expect(factory.getIdealOutput()).to.deep.equal([]);
		});

		it('should produce 60 item for a recipe producing 60 items with a crafting speed of 1', () => {
			stub(recipe, 'getOutput').returns([new ItemFlow(null, 60)]);
			const factory = new Factory(factoryType, [outputNeeded]);
			stub(factory, 'getFactoryEfficiency').returns(1);
			expect(factory.getIdealOutput()).to.deep.equal([new ItemFlow(null, 60)]);
		});

		it('should produce 120 items for a recipe producing 60 items with a crafting speed of 2', () => {
			stub(recipe, 'getOutput').returns([new ItemFlow(null, 60)]);
			stub(factoryType, 'getCraftingSpeed').returns(2);
			const factory = new Factory(factoryType, [outputNeeded]);
			stub(factory, 'getFactoryEfficiency').returns(1);
			expect(factory.getIdealOutput()).to.deep.equal([new ItemFlow(null, 120)]);
		});
	});

	describe('Method: getFactoryEfficiency', () => {
		const gears = new Item('Gears');
		let recipe: Recipe;
		beforeEach(() => {
			const gearsOutput = new ItemFlow(gears, 30);
			recipe = new Recipe([], [gearsOutput], 1);
			stub(factoryType, 'findRecipeForProducing').returns(recipe);
		});

		it('should return 1 for a factory which we consume all output', () => {
			const outputGearsFlow = new ItemFlow(gears, 30);
			const factory = new Factory(factoryType, [outputGearsFlow]);
			expect(factory.getFactoryEfficiency()).to.equal(1);
		});

		it('should return 0.5 for a factory which we consume half output', () => {
			const outputGearsFlow = new ItemFlow(gears, 15);
			const factory = new Factory(factoryType, [outputGearsFlow]);
			expect(factory.getFactoryEfficiency()).to.equal(0.5);
		});

		it('should take into account crafting speed of the factory', () => {
			stub(factoryType, 'getCraftingSpeed').returns(2);
			const outputGearsFlow = new ItemFlow(gears, 15);
			const factory = new Factory(factoryType, [outputGearsFlow]);
			expect(factory.getFactoryEfficiency()).to.equal(0.25);
		});

		it('should return 2 if we consume twice the output', () => {
			const outputGearsFlow = new ItemFlow(gears, 60);
			const factory = new Factory(factoryType, [outputGearsFlow]);
			expect(factory.getFactoryEfficiency()).to.equal(2);
		});
	});

	describe('Method: computeNumberOfFactories', () => {
		const gears = new Item('Gears');
		let recipe: Recipe;
		beforeEach(() => {
			const gearsOutput = new ItemFlow(gears, 30);
			recipe = new Recipe([], [gearsOutput], 1);
			stub(factoryType, 'findRecipeForProducing').returns(recipe);
		});

		it('should request one factory, if output meets requested output', () => {
			const outputGearsFlow = new ItemFlow(gears, 30);
			const factory = new Factory(factoryType, [outputGearsFlow]);
			expect(factory.computeNumberOfFactories()).to.equal(1);
		});

		it('should request two factories, if output meets half requested output', () => {
			const outputGearsFlow = new ItemFlow(gears, 60);
			const factory = new Factory(factoryType, [outputGearsFlow]);
			expect(factory.computeNumberOfFactories()).to.equal(2);
		});

		it('should request one factory even if we only need half output', () => {
			const outputGearsFlow = new ItemFlow(gears, 15);
			const factory = new Factory(factoryType, [outputGearsFlow]);
			expect(factory.computeNumberOfFactories()).to.equal(1);
		});
	});

	describe('Method: getRealOutput', () => {
		const gears = new Item('Gears');
		const anotherItem = new Item('anotherItem');
		let recipe: Recipe;
		beforeEach(() => {
			const gearsOutput = new ItemFlow(gears, 1);
			const anotherItemOutput = new ItemFlow(anotherItem, 5);
			recipe = new Recipe([], [gearsOutput, anotherItemOutput], 1);
			stub(factoryType, 'findRecipeForProducing').returns(recipe);
		});

		it('should return real output of the factory', () => {
			const outputGearsFlow = new ItemFlow(gears, 1);
			const outputAnotherItemFlow = new ItemFlow(anotherItem, 5);
			const factory = new Factory(factoryType, [outputNeeded]);
			stub(factory, 'getFactoryEfficiency').returns(1);
			expect(factory.getRealOutput()).to.deep.equal([outputGearsFlow, outputAnotherItemFlow]);
		});
	});

	describe('Method: getRealInput', () => {
		const iron = new Item('Iron');
		let recipe: Recipe;
		beforeEach(() => {
			const ironInput = new ItemFlow(iron, 5);
			recipe = new Recipe([ironInput], [], 1);
			stub(factoryType, 'findRecipeForProducing').returns(recipe);
		});

		it('should return real output of the factory', () => {
			const factory = new Factory(factoryType, [outputNeeded]);
			stub(factory, 'getFactoryEfficiency').returns(1);
			expect(factory.getRealInput()).to.deep.equal([new ItemFlow(iron, 5)]);
		});
	});
});
