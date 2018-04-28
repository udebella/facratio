import {buildComparable, Comparable} from '../../helpers/comparable'
import {Item} from '../item/item'
import {ItemFlow} from '../itemFlow/item-flow'
import {TimeSpan} from '../timespan/timespan'

export interface ItemQuantity extends Comparable {
	divide: (factor: number) => ItemQuantity,
	getItem: () => Item,
	over: (timeSpan: TimeSpan) => ItemFlow,
}

export const buildItemQuantity = (item: Item, quantity: number): ItemQuantity => {
	const over = (timeSpan: TimeSpan): ItemFlow => {
		return new ItemFlow(buildItemQuantity(item, quantity), timeSpan)
	}

	const getItem = (): Item => {
		return item
	}

	const divide = (factor: number): ItemQuantity => {
		if (factor === 0) {
			throw new Error('Invalid division factor')
		}
		return buildItemQuantity(item, quantity / factor)
	}

	return {
		...buildComparable(`ItemQuantity_${item.getId()}_${quantity}`),
		divide,
		getItem,
		over,
	}
}
