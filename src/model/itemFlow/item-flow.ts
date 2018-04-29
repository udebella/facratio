import {buildComparable, Comparable} from '../../helpers/comparable'
import {ItemQuantity} from '../itemQuantity/item-quantity'
import {TimeSpan} from '../timespan/timespan'

export type ItemFlow = Comparable

export const buildItemFlow = (itemQuantity: ItemQuantity, timespan: TimeSpan): ItemFlow => {
	const quantityOverOneSecond = itemQuantity.divide(timespan.getSeconds())

	return {
		...buildComparable(`itemFlow_${quantityOverOneSecond.getId()}`),
	}
}
