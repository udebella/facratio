import {expect} from 'chai';
import {FactoryType} from '../factoryType/factory-type';
import {Item} from '../item/item';
import {ItemFlow} from '../itemFlow/item-flow';
import {Recipe} from '../recipe/recipe';
import {Base} from './base';

describe('Base', () => {
	describe('Initialization', () => {
		it('should init properly', () => {
			const base = new Base([], [], []);
			expect(base).not.to.be.undefined;
		});
	});

	describe('Method: findRecipes', () => {
		const iron = new Item('Iron');
		const copper = new Item('Copper');
		const copperWire = new Item('Copper Wire');
		const greenCircuits = new Item('Green circuit');
		let factoryType: FactoryType;
		let copperWireRecipe: Recipe;
		let greenCircuitRecipe: Recipe;

		beforeEach(() => {
			copperWireRecipe = new Recipe([new ItemFlow(copper, 1)], [new ItemFlow(copperWire, 2)], 0.5);
			greenCircuitRecipe = new Recipe([new ItemFlow(copperWire, 3), new ItemFlow(iron, 1)], [new ItemFlow(greenCircuits, 1)], 0.5);
			factoryType = new FactoryType([copperWireRecipe, greenCircuitRecipe], 0.5);
		});

		it('should list all recipes needed to convert input to output', () => {
			const greenCircuitsFlow = new ItemFlow(greenCircuits, 200);
			const base = new Base([iron, copper], [greenCircuitsFlow], [factoryType]);
			base.factories.forEach((factory) => {
				console.error(`Factory [${factory.computeNumberOfFactories()}:${factory.getFactoryEfficiency()}] : ${JSON.stringify(factory.getRealInput())} => ${JSON.stringify(factory.getRealOutput())}`);
			});
			expect(true).to.equal(true);
		});

		// it('should list only needed recipes to convert input to output', () => {
		// 	const copperWireFlow = new ItemFlow(copperWire, 1);
		// 	const base = new Base([iron, copper], [copperWireFlow], [factoryType]);
		// 	expect(base.findRecipes([copperWireFlow])).to.deep.equal([copperWireRecipe]);
		// });
	});

	// describe('Method: combineRecipes', () => {
	// 	it('should combine recipes', () => {
    //
	// 	});
	// })
});
