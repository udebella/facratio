import {Item} from '../item/item'
import {Recipe} from '../recipe/recipe'

export interface FactoryModel {
	canProduce(itemWanted: Item): boolean,
	listProducibleItems(): Item[]
}

export const buildFactoryModel = (recipes: Recipe[], _craftingSpeed: number): FactoryModel => {
	const listProducibleItems = (): Item[] => {
		return recipes
			.map((recipe) => recipe.getProducedItems())
			.reduce((previousValue, currentValue) => [...previousValue, ...currentValue], [])
	}

	const canProduce = (itemWanted: Item): boolean => {
		return listProducibleItems().find((item) => item.equals(itemWanted)) !== undefined
	}

	return {
		canProduce,
		listProducibleItems,
	}
}
