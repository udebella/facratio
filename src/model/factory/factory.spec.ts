// import {expect} from 'chai';
// import {stub} from 'sinon';
// import {FactoryType} from '../factoryType/factory-type';
// import {Item} from '../item/item';
// import {ItemFlow} from '../itemFlow/item-flow';
// import {ItemQuantity} from '../itemQuantity/item-quantity';
// import {Recipe} from '../recipe/recipe';
// import {TimeFrame, TimeSpan} from '../timespan/timespan';
// import {Factory} from './factory';
//
// // TODO Work in progress : need to refactor
// describe.skip('Factory', () => {
// 	const gear = new Item('Gear');
// 	const oneGear = new ItemQuantity(gear, 1);
// 	const oneSecond = new TimeSpan(1, TimeFrame.SECONDS);
// 	const fiveSecond = new TimeSpan(5, TimeFrame.SECONDS);
// 	const thirtySeconds = new TimeSpan(30, TimeFrame.SECONDS);
// 	const fifteenSeconds = new TimeSpan(15, TimeFrame.SECONDS);
// 	const oneMinute = new TimeSpan(1, TimeFrame.MINUTS);
// 	const twoMinute = new TimeSpan(2, TimeFrame.MINUTS);
// 	const outputNeeded = new ItemFlow(oneGear, oneSecond);
// 	const factoryType = new FactoryType([], 1);
//
// 	describe('Initialization', () => {
// 		it('should init properly', () => {
// 			const factory = new Factory(factoryType, [outputNeeded]);
// 			expect(factory).not.to.be.undefined;
// 		});
// 	});
//
// 	describe('Method: getIdealInput', () => {
// 		let recipe: Recipe;
// 		beforeEach(() => {
// 			recipe = new Recipe([], [], oneSecond);
// 			stub(factoryType, 'findRecipeForProducing').returns(recipe);
// 		});
//
// 		it('should take no input for an only producing recipe', () => {
// 			const factory = new Factory(factoryType, [outputNeeded]);
// 			expect(factory.getIdealInput()).to.deep.equal([]);
// 		});
//
// 		it('should take 60 item for a recipe needing 60 items with a crafting speed of 1', () => {
// 			stub(recipe, 'getInput').returns([new ItemFlow(null, oneMinute)]);
// 			const factory = new Factory(factoryType, [outputNeeded]);
// 			expect(factory.getIdealInput()).to.deep.equal([new ItemFlow(null, oneMinute)]);
// 		});
//
// 		it('should take 120 items for a recipe needing 60 items with a crafting speed of 2', () => {
// 			stub(recipe, 'getInput').returns([new ItemFlow(null, oneMinute)]);
// 			stub(factoryType, 'getCraftingSpeed').returns(2);
// 			const factory = new Factory(factoryType, [outputNeeded]);
// 			expect(factory.getIdealInput()).to.deep.equal([new ItemFlow(null, twoMinute)]);
// 		});
// 	});
//
// 	describe('Method: getIdealOutput', () => {
// 		let recipe: Recipe;
// 		beforeEach(() => {
// 			recipe = new Recipe([], [], oneSecond);
// 			stub(factoryType, 'findRecipeForProducing').returns(recipe);
// 		});
//
// 		it('should produce no output for an only consuming recipe', () => {
// 			const factory = new Factory(factoryType, [outputNeeded]);
// 			expect(factory.getIdealOutput()).to.deep.equal([]);
// 		});
//
// 		it('should produce 60 item for a recipe producing 60 items with a crafting speed of 1', () => {
// 			stub(recipe, 'getOutput').returns([new ItemFlow(null, oneMinute)]);
// 			const factory = new Factory(factoryType, [outputNeeded]);
// 			stub(factory, 'getFactoryEfficiency').returns(1);
// 			expect(factory.getIdealOutput()).to.deep.equal([new ItemFlow(null, oneMinute)]);
// 		});
//
// 		it('should produce 120 items for a recipe producing 60 items with a crafting speed of 2', () => {
// 			stub(recipe, 'getOutput').returns([new ItemFlow(null, oneMinute)]);
// 			stub(factoryType, 'getCraftingSpeed').returns(2);
// 			const factory = new Factory(factoryType, [outputNeeded]);
// 			stub(factory, 'getFactoryEfficiency').returns(1);
// 			expect(factory.getIdealOutput()).to.deep.equal([new ItemFlow(null, twoMinute)]);
// 		});
// 	});
//
// 	describe('Method: getFactoryEfficiency', () => {
// 		let recipe: Recipe;
// 		beforeEach(() => {
// 			recipe = new Recipe([], [oneGear], oneSecond);
// 			stub(factoryType, 'findRecipeForProducing').returns(recipe);
// 		});
//
// 		it('should return 1 for a factory which we consume all output', () => {
// 			const outputGearsFlow = new ItemFlow(oneGear, thirtySeconds);
// 			const factory = new Factory(factoryType, [outputGearsFlow]);
// 			expect(factory.getFactoryEfficiency()).to.equal(1);
// 		});
//
// 		it('should return 0.5 for a factory which we consume half output', () => {
// 			const outputGearsFlow = new ItemFlow(oneGear, fifteenSeconds);
// 			const factory = new Factory(factoryType, [outputGearsFlow]);
// 			expect(factory.getFactoryEfficiency()).to.equal(0.5);
// 		});
//
// 		it('should take into account crafting speed of the factory', () => {
// 			stub(factoryType, 'getCraftingSpeed').returns(2);
// 			const outputGearsFlow = new ItemFlow(oneGear, fifteenSeconds);
// 			const factory = new Factory(factoryType, [outputGearsFlow]);
// 			expect(factory.getFactoryEfficiency()).to.equal(0.25);
// 		});
//
// 		it('should return 2 if we consume twice the output', () => {
// 			const outputGearsFlow = new ItemFlow(oneGear, oneMinute);
// 			const factory = new Factory(factoryType, [outputGearsFlow]);
// 			expect(factory.getFactoryEfficiency()).to.equal(2);
// 		});
// 	});
//
// 	describe('Method: computeNumberOfFactories', () => {
// 		let recipe: Recipe;
// 		beforeEach(() => {
// 			recipe = new Recipe([], [oneGear], oneSecond);
// 			stub(factoryType, 'findRecipeForProducing').returns(recipe);
// 		});
//
// 		it('should request one factory, if output meets requested output', () => {
// 			const outputGearsFlow = new ItemFlow(oneGear, thirtySeconds);
// 			const factory = new Factory(factoryType, [outputGearsFlow]);
// 			expect(factory.computeNumberOfFactories()).to.equal(1);
// 		});
//
// 		it('should request two factories, if output meets half requested output', () => {
// 			const outputGearsFlow = new ItemFlow(oneGear, oneMinute);
// 			const factory = new Factory(factoryType, [outputGearsFlow]);
// 			expect(factory.computeNumberOfFactories()).to.equal(2);
// 		});
//
// 		it('should request one factory even if we only need half output', () => {
// 			const outputGearsFlow = new ItemFlow(oneGear, fifteenSeconds);
// 			const factory = new Factory(factoryType, [outputGearsFlow]);
// 			expect(factory.computeNumberOfFactories()).to.equal(1);
// 		});
// 	});
//
// 	describe('Method: getRealOutput', () => {
// 		const anotherItem = new Item('anotherItem');
// 		const anotherItemQuantity = new ItemQuantity(anotherItem, 1);
// 		let recipe: Recipe;
// 		beforeEach(() => {
// 			recipe = new Recipe([], [oneGear, anotherItemQuantity], oneSecond);
// 			stub(factoryType, 'findRecipeForProducing').returns(recipe);
// 		});
//
// 		it('should return real output of the factory', () => {
// 			const outputGearsFlow = new ItemFlow(oneGear, oneSecond);
// 			const outputAnotherItemFlow = new ItemFlow(anotherItemQuantity, fiveSecond);
// 			const factory = new Factory(factoryType, [outputNeeded]);
// 			stub(factory, 'getFactoryEfficiency').returns(1);
// 			expect(factory.getRealOutput()).to.deep.equal([outputGearsFlow, outputAnotherItemFlow]);
// 		});
// 	});
//
// 	describe('Method: getRealInput', () => {
// 		const iron = new Item('Iron');
// 		const oneIron = new ItemQuantity(iron, 1);
// 		let recipe: Recipe;
// 		beforeEach(() => {
// 			recipe = new Recipe([oneIron], [], oneSecond);
// 			stub(factoryType, 'findRecipeForProducing').returns(recipe);
// 		});
//
// 		it('should return real output of the factory', () => {
// 			const factory = new Factory(factoryType, [outputNeeded]);
// 			stub(factory, 'getFactoryEfficiency').returns(1);
// 			expect(factory.getRealInput()).to.deep.equal([new ItemFlow(oneIron, fiveSecond)]);
// 		});
// 	});
// });
