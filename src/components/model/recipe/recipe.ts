import {ItemFlow} from '../itemFlow/item-flow';

export class Recipe {
	private itemsNeeded: ItemFlow[];
	private secondsNeeded: number;
	private output: ItemFlow[];

	constructor(input: ItemFlow[], output: ItemFlow[], secondsNeeded: number) {
		this.itemsNeeded = input;
		this.output = output;
		this.secondsNeeded = secondsNeeded;
	}

	public getInput(): ItemFlow[] {
		return this.itemsNeeded.map((itemFlow) => this.executeRecipe(itemFlow));
	}

	public getOutput(): ItemFlow[] {
		return this.output.map((itemFlow) => this.executeRecipe(itemFlow));
	}

	private executeRecipe(itemFlow: ItemFlow) {
		return itemFlow.divideFlow(this.secondsNeeded);
	}
}
