import {Producer} from '../factoryModels/factory-models';
import {Item} from '../item/item';

export interface ProducingRecipe {
	canProduce(item: Item): boolean;
}

const EMPTY_RECIPE: ProducingRecipe = {
	canProduce: () => false
};

export class FactoryModel implements Producer {
	private recipes: ProducingRecipe[];
	private craftingSpeed: number;

	constructor(recipes: ProducingRecipe[], craftingSpeed: number) {
		this.recipes = recipes;
		this.craftingSpeed = craftingSpeed;
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
