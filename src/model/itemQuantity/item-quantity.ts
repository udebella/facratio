import {Item} from '../item/item'
import {ItemFlow} from '../itemFlow/item-flow'
import {TimeSpan} from '../timespan/timespan'

export const buildItemQuantity = (item: Item, quantity: number): ItemQuantity => {
	const over = (timeSpan: TimeSpan): ItemFlow => {
		return new ItemFlow(buildItemQuantity(item, quantity), timeSpan)
	}

	const getItem = (): Item => {
		return item
	}

	const getQuantity = (): number => {
		return quantity
	}

	const equals = (other: ItemQuantity): boolean => {
		return item.equals(other.getItem())
			&& quantity === other.getQuantity()
	}
	const divide = (factor: number): ItemQuantity => {
		if (factor === 0) {
			throw new Error('Invalid division factor')
		}
		return buildItemQuantity(item, quantity / factor)
	}

	return {
		divide,
		equals,
		getItem,
		getQuantity,
		over,
	}
}

export interface ItemQuantity {
	divide: (factor: number) => ItemQuantity,
	equals: (other: ItemQuantity) => boolean,
	getItem: () => Item,
	getQuantity: () => number
	over: (timeSpan: TimeSpan) => ItemFlow,
}
