import {Item} from '../item/item';
import {OutputingRecipe} from '../recipe/recipe';

const EMPTY_RECIPE: OutputingRecipe = {
	hasOutput: () => false
};

export class FactoryType {
	private craftingSpeed: number;
	private recipes: OutputingRecipe[];

	constructor(recipes: OutputingRecipe[], craftingSpeed: number) {
		this.recipes = recipes;
		this.craftingSpeed = craftingSpeed;
	}

	private findRecipeForProducing(itemWanted: Item): OutputingRecipe {
		const foundRecipe = this.recipes
			.find(recipe => recipe.hasOutput(itemWanted));
		return foundRecipe || EMPTY_RECIPE;
	}

	public canProduce(item: Item): boolean {
		return this.findRecipeForProducing(item) !== EMPTY_RECIPE;
	}
}
