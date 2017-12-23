import {Item} from '../item/item';
import {ItemFlow} from '../itemFlow/item-flow';
import {ItemQuantity} from '../itemQuantity/item-quantity';
import {TimeSpan} from '../timespan/timespan';

export interface OutputingRecipe {
	hasOutput(item: Item): boolean;
}

export class Recipe implements OutputingRecipe {
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
			.map((items) => this.executeRecipe(items));
	}

	public getOutput(): ItemFlow[] {
		return this.output
			.map((items) => this.executeRecipe(items));
	}

	public hasOutput(item: Item): boolean {
		return this.output.find((items) => items.hasItem(item)) !== undefined;
	}

	private executeRecipe(items: ItemQuantity) {
		return items.over(this.recipeTime);
	}
}
