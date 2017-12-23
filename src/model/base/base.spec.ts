// import {FactoryType} from '../factoryType/factory-type';
// import {Item} from '../item/item';
// import {ItemQuantity} from '../itemQuantity/item-quantity';
// import {Recipe} from '../recipe/recipe';
// import {TimeFrame, TimeSpan} from '../timespan/timespan';
//
// // TODO Work in progress : need to refactor
// describe.skip('Base', () => {
//
// 	describe('Method: findRecipes', () => {
// 		const iron = new Item('Iron');
// 		const oneIron =  new ItemQuantity(iron, 1);
// 		const copper = new Item('Copper');
// 		const twoCopper = new ItemQuantity(copper, 2);
// 		const copperWire = new Item('Copper Wire');
// 		const threeCopperWire = new ItemQuantity(copperWire, 3);
// 		const greenCircuits = new Item('Green circuit');
// 		const oneGreenCircuit = new ItemQuantity(greenCircuits, 1);
// 		const halfASecond = new TimeSpan(0.5, TimeFrame.SECONDS);
// 		let factoryType: FactoryType;
// 		let copperWireRecipe: Recipe;
// 		let greenCircuitRecipe: Recipe;
//
// 		beforeEach(() => {
// 			copperWireRecipe = new Recipe([oneIron], [twoCopper], halfASecond);
// 			greenCircuitRecipe = new Recipe(
// 				[threeCopperWire, oneIron],
// 				[oneGreenCircuit], halfASecond);
// 			factoryType = new FactoryType([copperWireRecipe, greenCircuitRecipe], 0.5);
// 		});
//
// 		// it('should list all recipes needed to convert input to output', () => {
// 		// 	const greenCircuitsFlow = new ItemFlow(greenCircuits, 200);
// 		// 	const base = new Base([iron, copper], [greenCircuitsFlow], [factoryType]);
// 		// 	base.factories.forEach((factory) => {
// 		// 		console.error(`Factory [${factory.computeNumberOfFactories()}:${factory.getFactoryEfficiency()}] :
// 		// ${JSON.stringify(factory.getRealInput())} => ${JSON.stringify(factory.getRealOutput())}`);
// 		// 	});
// 		// 	expect(true).to.equal(true);
// 		// });
//
// 		// it('should list only needed recipes to convert input to output', () => {
// 		// 	const copperWireFlow = new ItemFlow(copperWire, 1);
// 		// 	const base = new Base([iron, copper], [copperWireFlow], [factoryType]);
// 		// 	expect(base.findRecipes([copperWireFlow])).to.deep.equal([copperWireRecipe]);
// 		// });
// 	});
//
// 	// describe('Method: combineRecipes', () => {
// 	// 	it('should combine recipes', () => {
//     //
// 	// 	});
// 	// })
// });
