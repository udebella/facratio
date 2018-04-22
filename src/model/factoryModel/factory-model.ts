import {Producer} from '../factoryModels/factory-models';
import {Item} from '../item/item';

export interface ProducingRecipe {
	canProduce(item: Item): boolean;
	getProducedItems(): Item[];
}

export class FactoryModel implements Producer {
	private recipes: ProducingRecipe[];
	private craftingSpeed: number;

	constructor(recipes: ProducingRecipe[], craftingSpeed: number) {
		this.recipes = recipes;
		this.craftingSpeed = craftingSpeed;
	}

	public listProducibleItems(): Item[] {
		return this.recipes
			.map((recipe) => recipe.getProducedItems())
			.reduce((previousValue, currentValue) => [...previousValue, ...currentValue], []);
	}

	public canProduce(item: Item): boolean {
		return this.findRecipeForProducing(item) !== undefined;
	}

	private findRecipeForProducing(itemWanted: Item): ProducingRecipe | undefined {
		return this.recipes
			.find((recipe) => recipe.canProduce(itemWanted));
	}
}
