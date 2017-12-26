// import {Factory} from '../factory/factory';
// import {FactoryModel} from '../factoryType/factory-type';
// import {Item} from '../item/item';
// import {ItemFlow} from '../itemFlow/item-flow';
//
// export class Base {
// 	private input: Item[];
// 	private output: ItemFlow[];
// 	private factories: Factory[];
// 	private authorizedTypes: FactoryModel[];
//
// 	constructor(input: Item[], output: ItemFlow[], authorizedTypes: FactoryModel[]) {
// 		this.input = input;
// 		this.output = output;
// 		this.authorizedTypes = authorizedTypes;
// 		this.factories = [];
// 		this.setUp(output);
// 	}
//
// 	private setUp(outputFlow: ItemFlow[]): void {
// 		const itemsNeeded = outputFlow
// 			.filter((itemFlow) => this.input.indexOf(itemFlow.getItem()) === -1);
//
// 		if (itemsNeeded.length === 0) {
// 			return;
// 		}
//
// 		const newOutput = itemsNeeded.reduce((previous, current) => {
// 			const factoryType = this.authorizedTypes.find((type) => type.canProduce(current.getItem()));
// 			const newFactory = new Factory(factoryType, [current]);
// 			this.factories.push(newFactory);
// 			return [
// 				...previous,
// 				...newFactory.getRealInput()
// 			];
// 		}, []);
// 		return this.setUp(newOutput);
// 	}
//
// 	// public findRecipes(outputFlow: ItemFlow[], recipes: Recipe[] = []): Recipe[] {
// 	// 	const itemsNeeded = outputFlow
// 	// 		.filter((itemFlow) => this.input.indexOf(itemFlow.getItem()) === -1);
// 	//
// 	// 	if (itemsNeeded.length !== 0) {
// 	// 		const newRecipes = this.authorizedTypes.reduce((previous: Recipe[], current: FactoryModel) => {
// 	// 			return [
// 	// 				...previous,
// 	// 				...this.findRecipesForFactoryType(current, itemsNeeded)
// 	// 			];
// 	// 		}, []);
// 	//
// 	// 		const newItemNeeded = newRecipes.reduce((previous, current) => {
// 	// 			return [
// 	// 				...previous,
// 	// 				...current.getInput()
// 	// 			];
// 	// 		}, []);
// 	// 		return this.findRecipes(newItemNeeded, [...recipes, ...newRecipes]);
// 	// 	}
// 	// 	return recipes;
// 	// }
// 	//
// 	// private findRecipesForFactoryType(factoryType: FactoryModel, outputFlow: ItemFlow[]): Recipe[] {
// 	// 	return factoryType.getRecipes().filter((recipe) => {
// 	// 		return recipe.getOutput()
// 	// 			.map((output) => output.getItem())
// 	// 			.find((item) => outputFlow.map((output) => output.getItem()).indexOf(item) !== -1);
// 	// 	});
// 	// }
// }
