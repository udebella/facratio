import {ProducingRecipe} from '../factoryModel/factory-model';
import {Item} from '../item/item';
import {ItemFlow} from '../itemFlow/item-flow';
import {ItemQuantity} from '../itemQuantity/item-quantity';
import {TimeSpan} from '../timespan/timespan';

export class Recipe implements ProducingRecipe {
	private readonly itemsNeeded: ItemQuantity[];
	private readonly recipeTime: TimeSpan;
	private readonly output: ItemQuantity[];

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
	public getProducedItems(): Item[] {
		return this.output
			.map((quantity) => quantity.getItem());
	}

	private executeRecipe(items: ItemQuantity) {
		return items.over(this.recipeTime);
	}
}
