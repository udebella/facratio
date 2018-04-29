import {buildComparable, Comparable} from '../../helpers/comparable'
import {Item} from '../item/item'
import {ItemFlow} from '../itemFlow/item-flow'
import {ItemQuantity} from '../itemQuantity/item-quantity'
import {TimeSpan} from '../timespan/timespan'

export interface Recipe extends Comparable {
	consumes(): ItemFlow[],
	getProducedItems(): Item[],
	produces(): ItemFlow[],
}

export function buildRecipe(input: ItemQuantity[], output: ItemQuantity[], recipeTime: TimeSpan): Recipe {
	const consumes = (): ItemFlow[] => {
		return input
			.map(executeRecipe)
	}

	const produces = (): ItemFlow[] => {
		return output
			.map(executeRecipe)
	}

	const getProducedItems = (): Item[] => {
		return output
			.map((quantity) => quantity.getItem())
	}

	const executeRecipe = (items: ItemQuantity) => {
		return items.over(recipeTime)
	}

	const inputIds = () => input.map((quantity) => quantity.getId())

	const outputIds = () => output.map((quantity) => quantity.getId())

	return {
		...buildComparable(`recipe_${inputIds()}_${outputIds()}_${recipeTime.getId()}`),
		consumes,
		getProducedItems,
		produces,
	}
}
