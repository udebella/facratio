import {Producer} from "../factoryModels/factory-models";
import {Item} from '../item/item';

export interface OutputingRecipe {
	hasOutput(item: Item): boolean;
}

const EMPTY_RECIPE: OutputingRecipe = {
	hasOutput: () => false
};

export class FactoryModel implements Producer {
	private recipes: OutputingRecipe[];
	private craftingSpeed: number;

	constructor(recipes: OutputingRecipe[], craftingSpeed: number) {
		this.recipes = recipes;
		this.craftingSpeed = craftingSpeed;
	}

	public canProduce(item: Item): boolean {
		return this.findRecipeForProducing(item) !== EMPTY_RECIPE;
	}

	private findRecipeForProducing(itemWanted: Item): OutputingRecipe {
		const foundRecipe = this.recipes
			.find((recipe) => recipe.hasOutput(itemWanted));
		return foundRecipe || EMPTY_RECIPE;
	}
}
