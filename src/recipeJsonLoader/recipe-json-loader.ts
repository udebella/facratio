import {Item} from '../model/item/item';
import {ItemQuantity} from '../model/itemQuantity/item-quantity';
import {Recipe} from '../model/recipe/recipe';
import {TimeFrame, TimeSpan} from '../model/timespan/timespan';

interface JsonRecipe {
	input: JsonFlow[];
	output: JsonFlow[];
	craftingTime: number;
}

interface JsonFlow {
	itemName: string;
	quantity: number;
}

export function readFromJson(jsonRecipes: JsonRecipe[]): Recipe[] {
	return jsonRecipes.map((recipe) => {
		const timeSpan = new TimeSpan(recipe.craftingTime, TimeFrame.SECONDS);
		return new Recipe(fromFlow(recipe.input), fromFlow(recipe.output), timeSpan);
	});
}

function fromFlow(jsonFlows: JsonFlow[]): ItemQuantity[] {
	return jsonFlows.map((jsonFlow) => new ItemQuantity(new Item(jsonFlow.itemName), jsonFlow.quantity));
}
