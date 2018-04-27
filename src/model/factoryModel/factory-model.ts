import {Producer} from '../factoryModels/factory-models'
import {Item} from '../item/item'

export interface ProducingRecipe {
	getProducedItems(): Item[]
}

export class FactoryModel implements Producer {
	private readonly recipes: ProducingRecipe[]
	private readonly craftingSpeed: number

	constructor(recipes: ProducingRecipe[], craftingSpeed: number) {
		this.recipes = recipes
		this.craftingSpeed = craftingSpeed
	}

	public listProducibleItems(): Item[] {
		return this.recipes
			.map((recipe) => recipe.getProducedItems())
			.reduce((previousValue, currentValue) => [...previousValue, ...currentValue], [])
	}

	public canProduce(itemWanted: Item): boolean {
		return this.listProducibleItems().find((item) => item.equals(itemWanted)) !== undefined
	}
}
