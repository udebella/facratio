import {Item} from '../item/item';
import {OutputingRecipe} from '../recipe/recipe';

const EMPTY_RECIPE: OutputingRecipe = {
	hasOutput: () => false
};

export class RecipeBook {
	private recipes: OutputingRecipe[];

	constructor(recipes: OutputingRecipe[]) {
		this.recipes = recipes;
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
