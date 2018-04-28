import {buildComparable, Comparable} from '../../helpers/comparable'

export type Item = Comparable

export const buildItem = (itemName: string): Item => {
	return {
		...buildComparable(itemName),
	}
}
