import {Item} from '../item/item';
import {Recipe} from '../recipe/recipe';

export class FactoryType {
	private craftingSpeed: number;
	private recipes: Recipe[];

	constructor(recipes: Recipe[], craftingSpeed: number) {
		this.recipes = recipes;
		this.craftingSpeed = craftingSpeed;
	}

	public getCraftingSpeed(): number {
		return this.craftingSpeed;
	}

	public getRecipes(): Recipe[] {
		return this.recipes;
	}

	public findRecipeForProducing(itemWanted: Item): Recipe {
		return this.recipes
			.find((recipe) => {
				const item = recipe.getOutput()
					.map((outputFlow) => outputFlow.getItem())
					.find((outputItem) => outputItem === itemWanted);
				return item !== undefined;
			});
	}

	public canProduce(item: Item): boolean {
		return this.findRecipeForProducing(item) !== undefined;
	}
}
