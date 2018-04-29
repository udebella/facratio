import {buildComparable, Comparable} from '../../helpers/comparable'
import {Item} from '../item/item'
import {Recipe} from '../recipe/recipe'

export interface FactoryModel extends Comparable {
	canProduce(itemWanted: Item): boolean,
	listProducibleItems(): Item[]
}

export const buildFactoryModel = (recipes: Recipe[], craftingSpeed: number): FactoryModel => {
	const listProducibleItems = (): Item[] => {
		return recipes
			.map((recipe) => recipe.getProducedItems())
			.reduce((previousValue, currentValue) => [...previousValue, ...currentValue], [])
	}

	const canProduce = (itemWanted: Item): boolean => {
		return listProducibleItems().find((item) => item.equals(itemWanted)) !== undefined
	}

	const recipesIds = recipes.map((recipe) => recipe.getId())

	return {
		...buildComparable(`factoryModel_${recipesIds}_${craftingSpeed}`),
		canProduce,
		listProducibleItems,
	}
}
