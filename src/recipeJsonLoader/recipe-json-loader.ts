import {buildItem} from '../model/item/item'
import {buildItemQuantity, ItemQuantity} from '../model/itemQuantity/item-quantity'
import {RecipeRename} from '../model/recipe/recipe'
import {buildTimeSpan, TimeFrame} from '../model/timespan/timespan'

interface JsonRecipe {
	input: JsonFlow[]
	output: JsonFlow[]
	craftingTime: number
}

interface JsonFlow {
	itemName: string
	quantity: number
}

export function readFromJson(jsonRecipes: JsonRecipe[]): RecipeRename[] {
	return jsonRecipes.map((recipe) => {
		const timeSpan = buildTimeSpan(recipe.craftingTime, TimeFrame.SECONDS)
		return new RecipeRename(fromFlow(recipe.input), fromFlow(recipe.output), timeSpan)
	})
}

function fromFlow(jsonFlows: JsonFlow[]): ItemQuantity[] {
	return jsonFlows.map((jsonFlow) => buildItemQuantity(buildItem(jsonFlow.itemName), jsonFlow.quantity))
}
