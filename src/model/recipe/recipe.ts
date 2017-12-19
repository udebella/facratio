import {ItemFlow} from '../itemFlow/item-flow';
import {ItemQuantity} from '../itemQuantity/item-quantity';
import {TimeSpan} from '../timespan/timespan';

export class Recipe {
	private itemsNeeded: ItemQuantity[];
	private recipeTime: TimeSpan;
	private output: ItemQuantity[];

	constructor(input: ItemQuantity[], output: ItemQuantity[], recipeTime: TimeSpan) {
		this.itemsNeeded = input;
		this.output = output;
		this.recipeTime = recipeTime;
	}

	public getInput(): ItemFlow[] {
		return this.itemsNeeded
			.map((itemFlow: ItemQuantity) => this.executeRecipe(itemFlow));
	}

	public getOutput(): ItemFlow[] {
		return this.output
			.map((itemFlow: ItemQuantity) => this.executeRecipe(itemFlow));
	}

	private executeRecipe(itemQuantity: ItemQuantity) {
		return itemQuantity.over(this.recipeTime);
	}
}
