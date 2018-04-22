import {Producer} from '../factoryModels/factory-models';
import {Item} from '../item/item';

export interface ProducingRecipe {
	canProduce(item: Item): boolean;
	getProducedItems(): Item[];
}

const EMPTY_RECIPE: ProducingRecipe = {
	canProduce: () => false,
	getProducedItems: () => []
};

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
			[0];
	}

	public canProduce(item: Item): boolean {
		return this.findRecipeForProducing(item) !== EMPTY_RECIPE;
	}

	private findRecipeForProducing(itemWanted: Item): ProducingRecipe {
		const foundRecipe = this.recipes
			.find((recipe) => recipe.canProduce(itemWanted));
		return foundRecipe || EMPTY_RECIPE;
	}
}
