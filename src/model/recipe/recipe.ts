import {ProducingRecipe} from '../factoryModel/factory-model';
import {Item} from '../item/item';
import {ItemFlow} from '../itemFlow/item-flow';
import {ItemQuantity} from '../itemQuantity/item-quantity';
import {TimeSpan} from '../timespan/timespan';

export class Recipe implements ProducingRecipe {
	private itemsNeeded: ItemQuantity[];
	private recipeTime: TimeSpan;
	private output: ItemQuantity[];

	constructor(input: ItemQuantity[], output: ItemQuantity[], recipeTime: TimeSpan) {
		this.itemsNeeded = input;
		this.output = output;
		this.recipeTime = recipeTime;
	}

	public consumes(): ItemFlow[] {
		return this.itemsNeeded
			.map((items) => this.executeRecipe(items));
	}

	public produces(): ItemFlow[] {
		return this.output
			.map((items) => this.executeRecipe(items));
	}

	public canProduce(item: Item): boolean {
		return this.output.find((items) => items.hasItem(item)) !== undefined;
	}

	private executeRecipe(items: ItemQuantity) {
		return items.over(this.recipeTime);
	}
}
