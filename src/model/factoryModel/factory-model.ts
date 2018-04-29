import {Item} from '../item/item'

export interface ProducingRecipe {
	getProducedItems(): Item[]
}
export interface FactoryModel {
	canProduce(itemWanted: Item): boolean,
	listProducibleItems(): Item[]
}

export const buildFactoryModel = (recipes: ProducingRecipe[], _craftingSpeed: number): FactoryModel => {
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
